module SlamData where

  import Control.Monad.Eff (Eff())

  import DOM (DOM())

  import React (renderToElementById, UI())

  import SlamData.App (app)
  import SlamData.Types (Settings())

  slamData :: forall eff. Settings -> Eff (dom :: DOM | eff) UI
  slamData settings = renderToElementById "content" $ app {settings: settings}
