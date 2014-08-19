module SlamData.App.Workspace.Notebook.Settings (settings) where

  import React (coerceThis, createClass, eventHandler, spec)
  import React.Types (Component(), ComponentClass(), ReactThis())

  import SlamData.App.Workspace.Notebook.Settings.SlamData
    (slamDataServerSettings)
  import SlamData.App.Workspace.Notebook.Settings.SlamEngine
    ( slamEngineJavaSettings
    , slamEngineMountingsSettings
    , slamEngineServerSettings
    )
  import SlamData.Helpers (activate)
  import SlamData.Types (SlamDataEventTy(..))
  import SlamData.Types.Workspace.Notebook.Settings
    ( SettingsProps()
    , SettingsState()
    , SettingsTab(..)
    )

  import qualified React.DOM as D

  settings :: forall eff. ComponentClass (SettingsProps eff) SettingsState
  settings = createClass spec
    { displayName = "Settings"
    , getInitialState = \this -> pure
      { active: SlamEngineTab
      , sdConfig: this.props.state.settings.sdConfig
      , seConfig: this.props.state.settings.seConfig
      }
    , render = \this -> pure $ D.div {className: "vertical"}
      [tabs $ coerceThis this, contents $ coerceThis this]
    }

  tabs :: forall fields eff state
       .  ReactThis fields (SettingsProps eff) SettingsState
       -> Component
  tabs this = D.div {className: "small-1 columns", id: "settings-category"}
    [D.dl {className: "tabs vertical"}
      [slamEngineTab this, slamDataTab this]
    ]

  slamEngineTab :: forall fields eff state
                .  ReactThis fields (SettingsProps eff) SettingsState
                -> Component
  slamEngineTab = reifyTab SlamEngineTab

  slamDataTab :: forall fields eff state
              .  ReactThis fields (SettingsProps eff) SettingsState
              -> Component
  slamDataTab = reifyTab SlamDataTab

  reifyTab :: forall fields eff state
           .  SettingsTab
           -> ReactThis fields (SettingsProps eff) SettingsState
           -> Component
  reifyTab name this =
    D.dd {className: "tab" ++ activate name this.state.active}
      [D.a { id: "settings-" ++ show name
           , onClick: \_ -> this.setState this.state{active = name}
           }
        [D.rawText $ show name]
      ]

  contents :: forall fields eff state
           .  ReactThis fields (SettingsProps eff) SettingsState
           -> Component
  contents this = D.div {className: "small-11 columns", id: "settings-content"}
    [D.div {className: "tabs-content vertical"}
      [slamEngineContent this, slamDataContent this]
    ]

  slamEngineContent :: forall fields eff state
                    .  ReactThis fields (SettingsProps eff) SettingsState
                    -> Component
  slamEngineContent = reifyContent SlamEngineTab

  slamDataContent :: forall fields eff state
                  .  ReactThis fields (SettingsProps eff) SettingsState
                  -> Component
  slamDataContent = reifyContent SlamDataTab

  reifyContent :: forall fields eff state
               .  SettingsTab
               -> ReactThis fields (SettingsProps eff) SettingsState
               -> Component
  reifyContent SlamEngineTab this =
    D.div {className: "content" ++ activate SlamEngineTab this.state.active}
      [ D.h6 {} [D.rawText "Settings for the local instance of SlamEngine"]
      , D.form {}
        [ slamEngineServerSettings this
        , slamEngineMountingsSettings this
        , slamEngineJavaSettings this
        , saveConfig this SlamEngineTab
        ]
      ]
  reifyContent SlamDataTab this =
    D.div {className: "content" ++ activate SlamDataTab this.state.active}
      [ D.h6 {} [D.rawText "SlamEngine server to connect to"]
      , D.form {}
        [ slamDataServerSettings this
        , saveConfig this SlamDataTab
        ]
      ]

  saveConfig :: forall fields eff state
             .  ReactThis fields (SettingsProps eff) SettingsState
             -> SettingsTab
             -> Component
  saveConfig this tab =
    D.a { className: "tiny button"
        , onClick: eventHandler this \this _ -> case tab of
          SlamEngineTab -> this.props.request $ SaveSEConfig this.state.seConfig
          SlamDataTab   -> this.props.request $ SaveSDConfig this.state.sdConfig
        }
      [D.rawText "Save"]
