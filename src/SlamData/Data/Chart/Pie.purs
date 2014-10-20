module Data.Chart.Pie 
  ( PieChartAxes(..)
  , PieChartAxesRec(..)
  , PieChartOptions(..)
  , PieChartOptionsRec(..)
  , PieChart(..)
  ) where 

  import Control.Monad.Eff

  import Test.StrongCheck
  import Test.StrongCheck.Perturb
  import Test.StrongCheck.Gen

  import Control.Lens
  import Data.Tuple(fst)
  import Data.Monoid

  import Data.Argonaut
  import Data.Argonaut.Encode(EncodeJson)
  import Data.Argonaut.Decode(DecodeJson)
  import Data.Argonaut.Core(Json())
  import Data.Argonaut.JCursor(JCursor(), cursorGet)
  import Data.Either
  import Data.Tuple
  import Data.Tuple.Nested
  import Data.Maybe
  import Data.Enum
  import Data.Function

  import qualified Data.Array as A
  import qualified Data.Map as M
  import qualified Data.StrMap as SM

  import DOM (DOM())

  import SlamData.Data.Analyze
  import SlamData.Data.Chart
  import SlamData.Data.Analyze

  data LabelType = LabelTypeKey | LabelTypeValue | LabelTypePercent

  instance eqLabelType :: Eq LabelType where
    (==) LabelTypeKey LabelTypeKey = true 
    (==) LabelTypeValue LabelTypeValue = true 
    (==) LabelTypePercent LabelTypePercent = true 
    (==) _ _ = false

    (/=) a b = not (a == b)

  instance ordLabelType :: Ord LabelType where
    compare l1 l2 = fromEnum l1 `compare` fromEnum l2

  instance enumLabelType :: Enum LabelType where
    cardinality = Cardinality 3

    firstEnum = LabelTypeKey

    lastEnum = LabelTypePercent

    pred LabelTypeKey = Nothing
    pred LabelTypeValue = Just LabelTypeKey
    pred LabelTypePercent = Just LabelTypeValue

    succ LabelTypeKey = Just LabelTypeValue 
    succ LabelTypeValue = Just LabelTypePercent
    succ LabelTypePercent = Nothing

  data PieChartAxes = PieChartAxes PieChartAxesRec

  type PieChartAxesRec = {
    value         :: JCursor,
    label         :: JCursor,
    valueChoices  :: [JCursor],
    labelChoices  :: [JCursor] }

  data PieChartOptions = PieChartOptions PieChartOptionsRec

  data ZeroToOne = ZeroToOne Number

  type PieChartOptionsRec = {
    labelThreshold  :: ZeroToOne,
    labelType       :: LabelType,
    showLabels      :: Boolean,
    donut           :: Boolean,
    donutRatio      :: ZeroToOne }

  data PieChart = PieChart {
    axes    :: PieChartAxes,
    options :: PieChartOptions }

  isNumeric :: DimSemantic -> Boolean
  isNumeric Integral   = true
  isNumeric Fractional = true
  isNumeric _          = false

  isLabel :: DimSemantic -> Boolean
  isLabel Integral   = false
  isLabel Fractional = false
  isLabel NA         = false
  isLabel _          = true

  unZeroToOne :: ZeroToOne -> Number
  unZeroToOne (ZeroToOne v) = v

  nonEmpty :: forall a b. (Monoid b) => (a -> [a] -> b) -> [a] -> b
  nonEmpty _ []       = mempty
  nonEmpty f (x : xs) = f x xs

  -- TODO: Move to Data.Array
  nonEmpty' :: forall a b. (a -> [a] -> b) -> [a] -> Maybe b
  nonEmpty' _ []       = Nothing
  nonEmpty' f (x : xs) = Just $ f x xs

  entuplePieChartOptions :: PieChartOptions -> Tuple ZeroToOne (Tuple LabelType (Tuple Boolean (Tuple Boolean ZeroToOne)))
  entuplePieChartOptions (PieChartOptions p) = Tuple p.labelThreshold (Tuple p.labelType (Tuple p.showLabels (Tuple p.donut p.donutRatio)))

  detuplePieChartOptions :: Tuple ZeroToOne (Tuple LabelType (Tuple Boolean (Tuple Boolean ZeroToOne))) -> PieChartOptions
  detuplePieChartOptions (Tuple labelThreshold (Tuple labelType (Tuple showLabels (Tuple donut donutRatio)))) =
    PieChartOptions { 
      labelThreshold  : labelThreshold, 
      labelType       : labelType, 
      showLabels      : showLabels, 
      donut           : donut, 
      donutRatio      : donutRatio }

  instance encodeJsonZeroToOne :: EncodeJson ZeroToOne where
    encodeJson (ZeroToOne v) = encodeJson v 

  instance decodeJsonZeroToOne :: DecodeJson ZeroToOne where
    decodeJson j = ZeroToOne <$> decodeJson j

  instance perturbZeroToOne :: Perturb ZeroToOne where
    perturber = xmap ZeroToOne unZeroToOne (bounded 0 1)

  instance arbZeroToOne :: Arbitrary ZeroToOne where
    arbitrary = ZeroToOne <$> arbitrary

  instance encodeJsonLabelType :: EncodeJson LabelType where
    encodeJson LabelTypeKey     = encodeJson "key"
    encodeJson LabelTypeValue   = encodeJson "value"
    encodeJson LabelTypePercent = encodeJson "percent"

  instance decodeJsonLabelType :: DecodeJson LabelType where
    decodeJson j = do
      s <-  decodeJson j
      r <- (if s == "key" then Right LabelTypeKey
            else if s == "value" then Right LabelTypeValue 
            else if s == "percent" then Right LabelTypePercent
            else Left $ "Expected key, value, or percent but found: " ++ show s)
      return r

  instance perturbLabelType :: Perturb LabelType where
    perturber = xmap runArbEnum ArbEnum perturber 

  instance encodeJsonPieChartOptions :: EncodeJson PieChartOptions where
    encodeJson (PieChartOptions p) = 
      ("labelThreshold" := p.labelThreshold)  ~> 
      ("labelType"      := p.labelType)       ~>
      ("showLabels"     := p.showLabels)      ~>
      ("donut"          := p.donut)           ~>
      ("donutRatio"     := p.donutRatio)      ~> jsonEmptyObject

  instance decodeJsonPieChartOptions :: DecodeJson PieChartOptions where
    decodeJson j = toObject j ?>>= "Object" >>= \obj -> do
      labelThreshold  <- obj .? "labelThreshold"
      labelType       <- obj .? "labelType"
      showLabels      <- obj .? "showLabels"
      donut           <- obj .? "donut"
      donutRatio      <- obj .? "donutRatio"
      return $ PieChartOptions {
        labelThreshold  : labelThreshold,
        labelType       : labelType,
        showLabels      : showLabels,
        donut           : donut,
        donutRatio      : donutRatio }

  instance encodeJsonPieChartAxes :: EncodeJson PieChartAxes where 
    encodeJson (PieChartAxes v) = 
      ("value"        := v.value)         ~> 
      ("label"        := v.label)         ~> 
      ("valueChoices" := v.valueChoices)  ~>
      ("labelChoices" := v.labelChoices)  ~> jsonEmptyObject

  instance decodeJsonPieChartAxes :: DecodeJson PieChartAxes where
    decodeJson j = toObject j ?>>= "Object" >>= \obj -> do
      value         <- obj .? "value"
      label         <- obj .? "label"
      valueChoices  <- obj .? "valueChoices"
      labelChoices  <- obj .? "labelChoices"
      return $ PieChartAxes {
        value         : value,
        label         : label,
        labelChoices  : labelChoices,
        valueChoices  : valueChoices }

  instance encodeJsonPieChart :: EncodeJson PieChart where 
    encodeJson (PieChart v) = 
      ("axes"    := v.axes)    ~> 
      ("options" := v.options) ~> jsonEmptyObject

  instance decodeJsonPieChart :: DecodeJson PieChart where
    decodeJson j = toObject j ?>>= "Object" >>= \obj -> do
      axes    <- obj .? "axes"
      options <- obj .? "options"
      return $ PieChart {
        axes    : axes,
        options : options }

  instance perturbPieChartOptions :: Perturb PieChartOptions where
    perturber = xmap detuplePieChartOptions entuplePieChartOptions perturber5 
      where perturber5 = perturber </\> perturber </\> perturber </\> perturber </\> perturber

  pieChartAxesTuplePerturber :: PieChartAxesRec -> Perturber (Tuple JCursor JCursor)
  pieChartAxesTuplePerturber v = 
    fromMaybe nonPerturber do label <- nonEmpty' enumerated v.labelChoices
                              value <- nonEmpty' enumerated v.valueChoices
                              return $ label </\> value

  entuplePieChartAxes :: PieChartAxes -> Tuple JCursor JCursor
  entuplePieChartAxes (PieChartAxes v) = Tuple v.label v.value

  detuplePieChartAxes :: PieChartAxesRec -> Tuple JCursor JCursor -> PieChartAxes
  detuplePieChartAxes v t = 
    PieChartAxes { label : fst t, value : snd t, labelChoices : v.labelChoices, valueChoices : v.valueChoices }

  pieChartAxesPerturber :: Perturber PieChartAxes
  pieChartAxesPerturber = Perturber {
    perturb : \n v -> (create v).perturb n v,
    dist    : \a b -> (create a).dist a b,
    dims    : \a   -> (create a).dims a }
    where create :: PieChartAxes -> PerturberRec PieChartAxes
          create (PieChartAxes v) = unPerturber $ xmap (detuplePieChartAxes v) entuplePieChartAxes (pieChartAxesTuplePerturber v)  

  instance perturbPieChartAxes :: Perturb PieChartAxes where
    perturber = pieChartAxesPerturber

  entuplePieChart :: PieChart -> Tuple PieChartAxes PieChartOptions
  entuplePieChart (PieChart v) = Tuple v.axes v.options

  detuplePieChart :: Tuple PieChartAxes PieChartOptions -> PieChart
  detuplePieChart (Tuple a o) = PieChart { axes : a , options : o }

  instance perturbPieChart :: Perturb PieChart where
    perturber = xmap detuplePieChart entuplePieChart (perturber </\> perturber)

  instance chartPieChart :: Chart PieChart where
    choices (AnalysisSum m) =     
      let semantic = flip (^.) (_2 <<< _dimSum <<< _semantic)
          sums     = M.toList m
          valueChoices = fst <$> (A.filter (isNumeric <<< semantic) sums)
          labelChoices = fst <$> (A.filter (isLabel   <<< semantic) sums)
      in do value           <- nonEmpty elements valueChoices
            label           <- nonEmpty elements labelChoices
            labelThreshold  <- arbitrary
            labelType       <- runArbEnum <$> arbitrary
            showLabels      <- arbitrary
            donut           <- arbitrary
            donutRatio      <- arbitrary
            return $ PieChart {
              axes    : PieChartAxes { 
                value : value, label : label, valueChoices : valueChoices, labelChoices : labelChoices },
              options : PieChartOptions {
                labelThreshold  : labelThreshold,
                labelType       : labelType,
                showLabels      : showLabels,
                donut           : donut,
                donutRatio      : donutRatio } }

    render j (PieChart { axes = PieChartAxes axes, options = options }) (NodeId nodeId) = 
      runFn5 renderPieChart nodeId j (extract axes.value) (extract axes.label) (encodeJson options) where

      extract :: JCursor -> Json -> Json
      extract c = fromMaybe jsonNull <$> cursorGet c

  foreign import renderPieChart 
  """
  function renderPieChart(nodeId, data, value, label, options) {
    return nv.addGraph(function() {
      var chart = nv.models.pieChart()
          .x(label)
          .y(value)
          .showLabels(options.showLabels)
          .labelThreshold(options.labelThreshold)
          .labelType(options.labelType)
          .donut(options.donut)
          .donutRatio(options.donutRatio);

        d3.select(nodeId)
          .datum(data)
          .transition().duration(350)
          .call(chart);

      return chart;
    });
  }
  """ :: forall fx. Fn5 String [Json] (Json -> Json) (Json -> Json) Json (Eff (dom :: DOM | fx) Unit)