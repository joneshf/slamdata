module SlamData where

  import Control.Monad.Eff (Eff())
  import Control.Monad.Cont.Trans (ContT(..))

  import Data.Maybe (Maybe())

  import DOM (DOM())

  import React (renderToElementById, UI())

  import SlamData.App (app)
  import SlamData.Types (FilePath(), FSWrite(), SaveSettings(), Settings())

  slamData :: forall eff
           .  Settings
           -> ContT Unit (Eff (fsWrite :: FSWrite, dom :: DOM | eff)) Settings
  slamData settings = ContT \save -> do
    renderToElementById "content" $ app {settings: settings, saveSettings: save}
    pure unit
