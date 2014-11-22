module SlamData.Data.Chart.LandscapeJ
  ( LandscapeJ(..)
  ) where 

  import Data.Argonaut.Encode(EncodeJson)
  import Data.Argonaut.Decode(DecodeJson)
  import Data.Argonaut.Core(Json())
  import Data.Argonaut

  import Control.Comonad.Cofree (head)

  import Test.StrongCheck.Gen (GenState(..))
  import Test.StrongCheck.Perturb (Perturb)
  import Test.StrongCheck.Landscape

  newtype DriverStateJ a = DriverStateJ (DriverState a)
  newtype LandscapeJ a   = LandscapeJ (Landscape a)
  newtype GenStateJ      = GenStateJ GenState

  defaultDecay :: Decay
  defaultDecay = decayHalf

  instance encodeJsonDriverStateJ :: (EncodeJson a) => EncodeJson (DriverStateJ a) where
    encodeJson (DriverStateJ (DriverState v)) =
      ("value"    := v.value)           ~> 
      ("variance" := v.variance)        ~> 
      ("state"    := GenStateJ v.state) ~> jsonEmptyObject

  instance decodeJsonDriverStateJ :: (DecodeJson a) => DecodeJson (DriverStateJ a) where
    decodeJson j = toObject j ?>>= "Object" >>= \obj -> do
      value     <- obj .? "value"
      variance  <- obj .? "variance"
      state     <- unGenStateJ <$> obj .? "state"
      return $ DriverStateJ $ DriverState { value: value, variance: variance, state: state }

  instance encodeJsonGenStateJ :: EncodeJson GenStateJ where 
    encodeJson (GenStateJ (GenState v)) = 
      ("size" := v.size)  ~> 
      ("seed" := v.seed)  ~> jsonEmptyObject

  instance decodeJsonGenStateJ :: DecodeJson GenStateJ where
    decodeJson j = toObject j ?>>= "Object" >>= \obj -> do
      size  <- obj .? "size"
      seed  <- obj .? "seed"
      return $ GenStateJ $ GenState { size : size, seed : seed }

  instance encodeJsonLandscapeJ :: (EncodeJson a) => EncodeJson (LandscapeJ a) where
    encodeJson (LandscapeJ (Landscape v)) = encodeJson $ DriverStateJ (head v)

  instance decodeJsonLandscapeJ :: (Perturb a, DecodeJson a) => DecodeJson (LandscapeJ a) where
    decodeJson j = f <$> decodeJson j
      where f (DriverStateJ (DriverState v)) = LandscapeJ $ nearby' v.state defaultDecay v.value v.variance

  unGenStateJ :: GenStateJ -> GenState
  unGenStateJ (GenStateJ v) = v

  unDriverStateJ :: forall a. DriverStateJ a -> DriverState a
  unDriverStateJ (DriverStateJ v) = v

  unLandscapeJ :: forall a. LandscapeJ a -> Landscape a
  unLandscapeJ (LandscapeJ v) = v