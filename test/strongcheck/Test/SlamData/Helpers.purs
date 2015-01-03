module Test.SlamData.Helpers where

  import Data.Either (Either(..))
  import Data.Maybe (Maybe(..))
  import Data.Tuple (Tuple(..))

  import Debug.Trace (trace)

  import SlamData.Helpers
    ( activate
    , contains
    , endsWith
    , formatNotebookName
    , parseQuery
    , parseQueryString
    )

  import Test.StrongCheck
    ( Arbitrary
    , CoArbitrary
    , AlphaNumString(..)
    , QC()
    , Result()
    , (<?>)
    , arbitrary
    , coarbitrary
    , quickCheck
    )
  import Test.StrongCheck.Gen (shuffle, suchThat)

  import Text.Parsing.Parser (ParseError(..), runParser)

  import qualified Data.StrMap as SM

  quickCheck_SlamData_Helpers :: QC Unit
  quickCheck_SlamData_Helpers = do
    trace "Testing `endsWith`"
    quickCheck prop_endsWithAppend
    quickCheck prop_endsWithId
    trace "Testing `contains`"
    quickCheck prop_containsAppend
    quickCheck prop_containsId
    trace "Testing `activate`"
    quickCheck prop_activate
    trace "Testing `formatNotebookName`"
    quickCheck prop_formatNotebookName
    trace "Testing `parseQuery`"
    quickCheck prop_parseQuery
    trace "Testing `parseQueryString`"
    quickCheck prop_parseQueryString
    trace "Testing `parseQueryStringLonger`"
    quickCheck prop_parseQueryStringLonger

  prop_endsWithAppend :: String -> String -> Boolean
  prop_endsWithAppend s s' = (s ++ s') `endsWith` s'

  prop_endsWithId :: String -> Boolean
  prop_endsWithId s = s `endsWith` s

  prop_containsAppend :: String -> String -> String -> Boolean
  prop_containsAppend s s' s'' = (s ++ s' ++ s'') `contains` s'

  prop_containsId :: String -> Boolean
  prop_containsId s = s `contains` s

  prop_activate :: String -> String -> Boolean
  prop_activate x y = if x == y
    then activate x y `contains` "active"
    else not (activate x y `contains` "active" )

  prop_formatNotebookName :: AlphaNumString -> Boolean
  prop_formatNotebookName (AlphaNumString str) =
    str == formatNotebookName (str ++ ".nb")

  prop_parseQuery :: String -> String -> Result
  prop_parseQuery key val =
    let query = key ++ "=" ++ val
    in case runParser query parseQuery of
      Left  (ParseError e) -> false <?> e.message
      Right (Tuple k v) -> k == key && v == val <?> query

  prop_parseQueryString :: String -> String -> Result
  prop_parseQueryString key val =
    let query = "?" ++ key ++ "=" ++ val
    in case runParser query parseQueryString of
      Left  (ParseError e) -> false <?> e.message
      Right q -> SM.lookup key q == Just val <?> query

  prop_parseQueryStringLonger :: UniqueStrings -> String -> String -> Result
  prop_parseQueryStringLonger (UniqueStrings (Tuple k1 k2)) v1 v2 =
    let query = "?" ++ k1 ++ "=" ++ v1 ++ "&" ++ k2 ++ "=" ++ v2
    in case runParser query parseQueryString of
      Left  (ParseError e) -> false <?> e.message
      Right q -> SM.lookup k1 q == Just v1 && SM.lookup k2 q == Just v2 <?> query

  newtype UniqueStrings = UniqueStrings (Tuple String String)

  instance arbitraryUniqueStrings :: Arbitrary UniqueStrings where
    arbitrary = do
      s <- arbitrary
      s' <- shuffle arbitrary `suchThat` ((/=) s)
      pure $ UniqueStrings $ Tuple s s'

  instance coArbitraryUniqueStrings :: CoArbitrary UniqueStrings where
    coarbitrary (UniqueStrings ss) = coarbitrary ss
