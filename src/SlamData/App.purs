module SlamData.App (app, AppProps(), AppState()) where

  import Control.Monad.Eff (Eff())
  import Control.Reactive.Timer (Timer())

  import DOM (DOM())

  import React (coerceThis, createClass, spec)
  import React.Types(ComponentClass(), React(), ReactThis())

  import SlamData.App.Menu (menu)
  import SlamData.App.Workspace (workspace)
  import SlamData.Types (SlamDataState(), SlamDataRequest())
  import SlamData.Types.Workspace.FileSystem (FileType())

  import qualified React.DOM as D

  type AppProps eff =
    { request :: SlamDataRequest eff
    , state   :: SlamDataState
    }
  type AppState = {showSettings :: Boolean}

  app :: forall eff. ComponentClass (AppProps eff) AppState
  app = createClass spec
    { displayName = "App"
    , getInitialState = \_ -> pure {showSettings: false}
    , render = \this -> pure $ D.div {}
      [ menu this.props.request
      , workspace
        { request: this.props.request
        , state: this.props.state
        }
        []
      ]
    }
