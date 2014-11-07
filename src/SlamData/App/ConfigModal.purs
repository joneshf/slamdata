module SlamData.App.ConfigModal (configModal) where

  import Control.Lens ((^.), (.~), (..), LensP())

  import React (coerceThis, createClass, spec)
  import React.Types (Component(), ComponentClass(), ReactThis())

  import SlamData.App.Workspace.Notebook.Settings.SlamData
    ( slamDataServerSettings
    )
  import SlamData.App.Workspace.Notebook.Settings.SlamEngine
    ( slamEngineMountingsSettings
    )
  import SlamData.Components (actionButton, saveSettingsAction)
  import SlamData.Lens
    ( _port
    , _sdConfig
    , _sdConfigRec
    , _sdConfigServer
    , _seConfig
    , _seConfigRec
    , _seConfigServer
    , _server
    )
  import SlamData.Types
    ( SDConfig()
    , SEConfig()
    , SlamDataEventTy(..)
    , SlamDataRequest()
    , SlamDataState()
    )
  import SlamData.Types.React.WorkSpace.Notebook.Settings
    ( SettingsProps()
    , SettingsState()
    )
  import SlamData.Types.Workspace.Notebook.Settings (SettingsTab(..))

  import qualified React.DOM as D

  configModal :: forall eff. ComponentClass (SettingsProps eff) SettingsState
  configModal = createClass spec
    { displayName = "ConfigModal"
    , getInitialState = \this -> pure
      { active: SlamEngineTab
      , sdConfig: this.props.state.settings.sdConfig
      , seConfig: this.props.state.settings.seConfig
      , sdDirty: true
      , seDirty: true
      }
    , render = \this -> pure $ D.div
      { className: visible this.props.state.showConfig
      , id: "config-modal"
      }
      [ backdrop
      , overlay $ coerceThis this
      ]
    }

  title :: Component
  title = D.h4 {} [D.rawText "Configuration"]

  backdrop :: Component
  backdrop = D.div {id: "config-modal-backdrop"} []

  overlay :: forall fields eff
          .  ReactThis fields (SettingsProps eff) SettingsState
          -> Component
  overlay this = D.div {id: "config-modal-overlay"}
    [ title
    , saveButton this
    , slamDataServerSettings this
    , slamEngineMountingsSettings this
    ]

  saveButton :: forall fields eff
             .  ReactThis fields (SettingsProps eff) SettingsState
             -> Component
  saveButton this = D.ul {className: "button-group"}
    [saveSettingsAction
      this
      [ SaveSDConfig this.state.sdConfig
      -- Since we're using the components verbatim,
      -- we have to use the port from the sdConfig.
      , SaveSEConfig (this.state # _seServerPort .~ this.state^._sdServerPort).seConfig
      , HideConfig
      ]
      _dirty
    ]

  visible :: Boolean -> String
  visible true  = " visible"
  visible false = ""

  _sdServerPort :: forall r. LensP {sdConfig :: SDConfig | r} Number
  _sdServerPort = _sdConfig.._sdConfigRec.._server.._sdConfigServer.._port

  _seServerPort :: forall r. LensP {seConfig :: SEConfig | r} Number
  _seServerPort = _seConfig.._seConfigRec.._server.._seConfigServer.._port

  -- This probably breaks some lens law...

  _dirty :: forall r. LensP {sdDirty :: Boolean, seDirty :: Boolean | r} Boolean
  _dirty f o@{sdDirty = sd, seDirty = se} =
    (\b -> o{sdDirty = b, seDirty = b}) <$> f (sd || se)
