module SlamData.App (app, AppProps(), AppState()) where

  import Control.Monad.Eff (Eff())
  import Control.Reactive.Timer (Timer())

  import DOM (DOM())

  import React (coerceThis, createClass, spec)
  import React.Types(ComponentClass(), React(), ReactThis())

  import SlamData.App.Menu (menu)
  import SlamData.App.Workspace (workspace)
  import SlamData.Types
    ( FileType()
    , SlamDataState()
    , SlamDataRequest()
    , Settings()
    )

  import qualified React.DOM as D

  type AppProps eff =
    { files :: [FileType]
    , request :: SlamDataRequest eff
    , settings :: Settings
    }
  type AppState = {showSettings :: Boolean}

  app :: forall eff. ComponentClass (AppProps eff) AppState
  app = createClass spec
    { displayName = "App"
    , componentWillUnmount = \_ -> Debug.Trace.trace "Unmounting app"
    , getInitialState = \_ -> pure {showSettings: false}
    , render = \this -> pure $ D.div {}
      [ menu (showSettings $ coerceThis this)
      , workspace
        { files: this.props.files
        , request: this.props.request
        , settings: this.props.settings
        }
        []
      ]
    }

  showSettings :: forall eff fields props state
               .  ReactThis fields props {showSettings :: Boolean}
               -> Boolean
               -> Eff eff Unit
  showSettings this bool = pure $ this.setState {showSettings: bool}
