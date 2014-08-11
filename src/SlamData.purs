module SlamData where

  import Control.Monad.Eff (Eff())
  import Control.Monad.Cont.Trans (ContT(..))

  import Data.Maybe (Maybe())

  import DOM (DOM())

  import React (renderComponentById)
  import React.Types (React())

  import SlamData.App (app)
  import SlamData.Types (SlamDataState(), SaveSettings(), Settings(), SlamDataEvent())

  slamData :: forall eff
           .  Settings
           -> ContT Unit (Eff (dom :: DOM, react :: React | eff)) SlamDataEvent
  slamData settings = ContT \handler -> do
    let component = app {files: [], handler: handler, settings: settings} []
    renderComponentById component "content"
    pure unit
