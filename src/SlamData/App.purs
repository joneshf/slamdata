module SlamData.App (app) where

  import Control.Monad.Eff

  import React

  import SlamData.App.Menu
  import SlamData.App.Workspace
  import SlamData.Types (SlamDataConfig())

  import qualified React.DOM as D

  app :: {sdConfig :: SlamDataConfig} -> UI
  app = mkUI spec {getInitialState = pure {settings: false}} $ do
    state <- readState
    props <- getProps
    pure $ D.div'
      [ menu {showSettings: deferred $ showSettings true}
      , workspace { sdConfig: props.sdConfig
                  , settings: state.settings
                  , hideSettings: deferred $ showSettings false
                  }
      ]

  type AppState = {settings :: Boolean}

  showSettings :: forall eff props state result
               .  Boolean
               -> Eff (r :: ReadStateEff AppState, w :: WriteStateEff AppState | eff) AppState
  showSettings bool = do
    state <- readState
    writeState state{settings = bool}
