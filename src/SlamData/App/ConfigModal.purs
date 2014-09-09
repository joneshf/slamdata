module SlamData.App.ConfigModal (configModal) where

  import React (coerceThis, createClass, spec)
  import React.Types (Component(), ComponentClass(), ReactThis())

  import SlamData.Components (actionButton, saveIcon)
  import SlamData.App.Workspace.Notebook.Settings.SlamData
    ( slamDataJavaSettings
    , slamDataServerSettings
    )
  import SlamData.App.Workspace.Notebook.Settings.SlamEngine
    (slamEngineMountingsSettings)
  import SlamData.Types
    ( SlamDataEventTy(..)
    , SlamDataRequest()
    , SlamDataState()
    )
  import SlamData.Types.Workspace.Notebook.Settings
    ( SettingsProps()
    , SettingsState()
    , SettingsTab(..)
    )

  import qualified React.DOM as D

  configModal :: forall eff. ComponentClass (SettingsProps eff) SettingsState
  configModal = createClass spec
    { displayName = "ConfigModal"
    , getInitialState = \this -> pure
      { active: SlamEngineTab
      , sdConfig: this.props.state.settings.sdConfig
      , seConfig: this.props.state.settings.seConfig
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
    , slamDataJavaSettings this
    ]

  saveButton :: forall fields eff
             .  ReactThis fields (SettingsProps eff) SettingsState
             -> Component
  saveButton this = D.ul {className: "button-group"}
    [actionButton this [SaveSDConfig this.state.sdConfig, SaveSEConfig this.state.seConfig, HideConfig] "Save" saveIcon]

  visible :: Boolean -> String
  visible true  = " visible"
  visible false = ""
