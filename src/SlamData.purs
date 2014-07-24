module SlamData where

  import Control.Monad.Eff (Eff())

  import DOM (DOM())

  import React (renderToElementById, UI())

  import SlamData.App (app)
  import SlamData.Types (SlamDataConfig())

  slamData :: forall eff. SlamDataConfig -> Eff (dom :: DOM | eff) UI
  slamData config = renderToElementById "content" $ app {sdConfig: config}
