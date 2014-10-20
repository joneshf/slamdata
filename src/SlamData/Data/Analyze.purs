module SlamData.Data.Analyze
  ( DimSemantic(..)
  , DimSum(..)
  , DimSumRec(..)
  , AnalysisSum(..)
  , _dimSum 
  , _total
  , _uniques
  , _semantic
  , analyzeAll
  ) where

  import Data.Argonaut
  import qualified Control.Arrow as Arrow
  import Data.Argonaut.Core(Json())
  import Data.Argonaut.JCursor
  import Data.Maybe
  import Control.Lens
  import Data.String.Regex
  import Data.Foldable
  import Data.Traversable
  import Data.Enum
  import qualified Data.Date as Date
  import Data.Monoid
  import Data.Monoid.Sum
  import Data.Tuple
  import Math
  import qualified Data.Array as A
  import qualified Data.Map as M
  import qualified Data.Set as S
  import qualified Data.StrMap as StrMap

  type Histogram a = M.Map a Sum

  hempty :: forall a. Histogram a
  hempty = M.empty 

  hinc :: forall a. (Ord a) => a -> Histogram a -> Histogram a
  hinc a = M.alter f a where
    f Nothing  = Just $ Sum 0
    f (Just (Sum n)) = Just $ Sum (n + 1)

  htop :: forall a. (Ord a) => Number -> Histogram a -> [a]
  htop n = ((<$>) fst) <<< A.take n <<< A.sortBy f <<< M.toList where
    f (Tuple _ (Sum a)) (Tuple _ (Sum b)) = b `compare` a

  data DimType = Continuous | Categorical

  data DimSemantic =
    Integral    |
    Fractional  |
    Date        |
    DateTime    |
    Time        | 
    Interval    |
    Text        |
    Bool        |
    Percent     |
    Currency    |
    NA

  newtype DimStats = DimStats DimStatsRec 

  type DimStatsRec = { hist :: Histogram DimSemantic, uniques :: S.Set Json, total :: Number }

  newtype DimSum = DimSum DimSumRec

  type DimSumRec = { semantic :: DimSemantic, uniques :: Number, total :: Number }

  newtype Analysis = Analysis (M.Map JCursor DimStats)

  newtype AnalysisSum = AnalysisSum (M.Map JCursor DimSum)

  -- TODO: move out of here and into Data.Map
  instance semigroupMap :: (Ord a, Semigroup b) => Semigroup (M.Map a b) where
    (<>) a b = foldl f a (M.toList b) where
      f m (Tuple k v') =  let g Nothing  = Just v'
                              g (Just v) = Just $ v <> v'
                          in M.alter g k m

  instance monoidMap :: (Ord a, Semigroup b) => Monoid (M.Map a b) where 
    mempty = M.empty

  -- TODO: move into Data.Set
  instance semigroupSet :: (Ord a) => Semigroup (S.Set a) where
    (<>) = S.union

  instance monoidSet :: (Ord a) => Monoid (S.Set a) where
    mempty = S.empty

  size :: forall a. (Ord a) => S.Set a -> Number
  size = A.length <<< S.toList


  transformMap :: forall a b. (Ord a) => (Tuple a b -> Tuple a b) -> M.Map a b -> M.Map a b
  transformMap f = M.fromList <<< ((<$>) f) <<< M.toList

  transformKeys :: forall a b. (Ord a) => (a -> a) -> M.Map a b -> M.Map a b
  transformKeys f = transformMap $ Arrow.first f

  transformValues :: forall a b. (Ord a) => (b -> b) -> M.Map a b -> M.Map a b
  transformValues f = transformMap $ Arrow.second f  

  -- TODO: move into Data.Array
  zipWithIndex :: forall a c. (a -> Number -> c) -> [a] -> [c]
  zipWithIndex f a = A.zipWith f a (A.range 0 (A.length a - 1))

  
  nestField :: String -> Analysis -> Analysis
  nestField i = (_analysis) `over` (transformKeys (JField i))

  nestIndex :: Number -> Analysis -> Analysis
  nestIndex i = (_analysis) `over` (transformKeys (JIndex i))

  analyzeNum :: Number -> DimSemantic
  analyzeNum n | floor n == n = Integral
  analyzeNum _                = Fractional

  noFlags :: RegexFlags
  noFlags  = { global     : false
             , ignoreCase : false
             , multiline  : false
             , sticky     : false
             , unicode    : false }

  percentRegex :: String -> Boolean
  percentRegex = test $ regex "^\\d+[%]$" noFlags

  currencyRegex :: String -> Boolean
  currencyRegex = test $ regex "^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$" noFlags -- so bad!

  analyzeStr :: String -> DimSemantic
  analyzeStr s = case Date.fromString s of
    Nothing   ->  if percentRegex s then Percent 
                  else if currencyRegex s then Currency
                  else Text
    (Just _)  ->  DateTime

  analyzePrim :: JsonPrim -> DimSemantic
  analyzePrim p = runJsonPrim p (const NA) (const Bool) analyzeNum analyzeStr

  record :: JsonPrim -> Analysis -> Analysis
  record p = (_analysis) `over` (M.alter g JCursorTop) where
    update s0 = Just $  let s1 = over (_dimStats <<< _hist)    (hinc (analyzePrim p)) s0
                            s2 = over (_dimStats <<< _uniques) (S.insert (primToJson p)) s1
                            s3 = over (_dimStats <<< _total)   ((+) 1) s2
                        in  s3
    g Nothing  = update mempty
    g (Just h) = update h

  analyze1 :: Json -> Analysis -> Analysis
  analyze1 = foldJson (const primNull >>> record)
                      (primBool >>> record)
                      (primNum  >>> record)
                      (primStr  >>> record)
                      (\a -> fold $ zipWithIndex (\j i -> nestIndex i <$> analyze1 j) a)
                      (\o -> fold $ (\(Tuple i j) -> nestField i <$> analyze1 j) <$> StrMap.toList o)

  summarize1 :: Number -> DimStats -> DimSum
  summarize1 n (DimStats { hist = h, uniques = u, total = t }) = 
    DimSum { semantic: fromMaybe NA $ A.head $ htop 1 h, uniques: (size u) / n, total: t }

  -- | Analyzes a sample of JSON.
  analyzeAll :: [Json] -> AnalysisSum
  analyzeAll j = sum $ foldl (flip analyze1) mempty j where
    len = A.length j
    sum (Analysis m) = (M.toList >>> ((<$>) (Arrow.second $ summarize1 len)) >>> M.fromList >>> AnalysisSum) m

  -- flattenJson :: Analysis -> Tuple (M.Map JCursor Number) [[Json]] 


  -- Lenses
  _dimStats :: LensP DimStats DimStatsRec
  _dimStats f (DimStats rec) = DimStats <$> f rec

  _hist :: forall a r. LensP { hist :: a | r } a
  _hist f rec = (\v -> rec { hist = v }) <$> f rec.hist

  _total :: forall a r. LensP { total :: a | r } a
  _total f rec = (\v -> rec { total = v }) <$> f rec.total

  _uniques :: forall a r. LensP { uniques :: a | r } a
  _uniques f rec = (\v -> rec { uniques = v }) <$> f rec.uniques
  
  _dimSum :: LensP DimSum DimSumRec
  _dimSum f (DimSum rec) = DimSum <$> f rec

  _semantic :: forall a r. LensP { semantic :: a | r } a
  _semantic f rec = (\v -> rec { semantic = v }) <$> f rec.semantic

  _analysis :: LensP Analysis (M.Map JCursor DimStats)
  _analysis f (Analysis rec) = Analysis <$> f rec

  _analysisSum :: LensP AnalysisSum (M.Map JCursor DimSum)
  _analysisSum f (AnalysisSum rec) = AnalysisSum <$> f rec

  -- Instances
  instance semigroupDimStats :: Semigroup DimStats where 
    (<>) (DimStats r1) (DimStats r2) = DimStats { 
      hist:     r1.hist    <> r2.hist, 
      uniques:  r1.uniques <> r2.uniques, 
      total:    r1.total   +  r2.total }

  instance monoidDimStats :: Monoid DimStats where
    mempty = DimStats { hist: mempty, uniques: mempty, total: 0 }

  instance semigroupAnalysis :: Semigroup Analysis where
    (<>) (Analysis a) (Analysis b) = Analysis (a <> b)

  instance monoidAnalysis :: Monoid Analysis where
    mempty = Analysis mempty

  instance eqDimSemantic :: Eq DimSemantic where
    (==) a b = dimSemanticOrdinal a == dimSemanticOrdinal b

    (/=) a b = not (a == b)

  instance ordDimSemantic :: Ord DimSemantic where
    compare a b = (dimSemanticOrdinal a) `compare` (dimSemanticOrdinal b)

  dimSemanticOrdinal :: DimSemantic -> Number
  dimSemanticOrdinal Integral   = 0
  dimSemanticOrdinal Fractional = 1
  dimSemanticOrdinal Date       = 2
  dimSemanticOrdinal DateTime   = 3
  dimSemanticOrdinal Time       = 4
  dimSemanticOrdinal Interval   = 5
  dimSemanticOrdinal Text       = 6
  dimSemanticOrdinal Bool       = 7
  dimSemanticOrdinal Percent    = 8
  dimSemanticOrdinal Currency   = 9
  dimSemanticOrdinal NA         = 10