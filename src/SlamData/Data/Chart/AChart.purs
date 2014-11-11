module SlamData.Data.Chart.AChart where 
  import Data.Argonaut.Encode(EncodeJson)
  import Data.Argonaut.Decode(DecodeJson)
  import Data.Argonaut.Core(Json())

  import Data.Argonaut
  import Test.StrongCheck.Perturb

  import SlamData.Data.Chart

  import SlamData.Data.Chart.Pie 

  -- | A sum type for any chart at all. Used to close the type class for the driver.
  data AChart = Pie PieChart -- | Line LineChart ...

  instance encodeJsonAChart :: EncodeJson AChart where
    encodeJson (Pie v) = ("pieChart" := v) ~> jsonEmptyObject

  instance decodeJsonAChart :: DecodeJson AChart where
    decodeJson j = toObject j ?>>= "Object" >>= \obj -> Pie <$> obj .? "pieChart"

  instance perturbAChart :: Perturb AChart where
    perturber = xmap to from perturber where
      from (Pie v) = v
      to v = Pie v

  instance chartAChart :: Chart AChart where
    chartChoices a = Pie <$> chartChoices a

    renderChart j (Pie v) = renderChart j v