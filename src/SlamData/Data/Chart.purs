module SlamData.Data.Chart
  ( Chart
  , NodeId(..)
  , choices
  , render
  ) where 
  
  import Control.Monad.Eff

  import Test.StrongCheck.Gen
  import Test.StrongCheck.Perturb

  import Control.Lens
  import Data.Tuple(fst)

  import Data.Argonaut.Encode(EncodeJson)
  import Data.Argonaut.Decode(DecodeJson)
  import Data.Argonaut.Core(Json())

  import DOM (DOM())

  import SlamData.Data.Analyze(AnalysisSum())

  newtype NodeId = NodeId String

  -- | The class for things which are chart options. Chart options can:
  -- |   * Be generated from an analysis of the data set.
  -- |   * Be serialized to and from JSON.
  -- |   * Be rendered given a data set and a target node in the DOM.
  class (EncodeJson a, DecodeJson a, Perturb a) <= Chart a where 
    choices :: AnalysisSum -> Gen a
    
    render :: forall fx. [Json] -> a -> NodeId -> Eff (dom :: DOM | fx) Unit