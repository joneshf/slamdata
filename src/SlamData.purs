module SlamData where

  import Control.Monad.Eff (Eff())
  import Control.Monad.Cont.Trans (ContT(..))

  import Data.Maybe (Maybe())

  import DOM (DOM())

  import Node.FS (FS())

  import React (renderToElementById, UI())

  import SlamData.App (app)
  import SlamData.Types (SaveSettings(), Settings())

  slamData :: forall eff
           .  Settings
           -> ContT Unit (Eff (fs :: FS, dom :: DOM | eff)) Settings
  slamData settings = ContT \save -> do
    renderToElementById "content" $ app {settings: settings, saveSettings: save}
    pure unit
