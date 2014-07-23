module SlamData where

  import Control.Monad.Eff (Eff())

  import DOM (DOM())

  import React (renderToElementById, UI())

  import SlamData.App (app)
  import SlamData.Types (SlamDataConfig())

  slamData :: forall eff. SlamDataConfig -> Eff (dom :: DOM | eff) UI
  slamData {server = {location = loc, port = port}} =
    renderToElementById "content" $ app {serverURI: loc ++ ":" ++ port}
