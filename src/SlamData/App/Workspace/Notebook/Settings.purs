module SlamData.App.Workspace.Notebook.Settings (settings) where

  import React (coerceThis, createClass, eventHandler, spec)
  import React.Types (Component(), ComponentClass(), ReactThis())

  import SlamData.App.Workspace.Notebook.Settings.SlamData
    ( slamDataJavaSettings
    , slamDataServerSettings
    )
  import SlamData.App.Workspace.Notebook.Settings.SlamEngine
    ( slamEngineMountingsSettings
    , slamEngineServerSettings
    )
  import SlamData.Components (actionButton, saveIcon)
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
    , render = \this -> pure $ D.div {id: "settings"}
      [ D.div {className: "toolbar button-bar"}
        [externalActions $ coerceThis this]
      , D.div {className: "vertical"}
        [tabs $ coerceThis this, contents $ coerceThis this]
      ]
    }

  externalActions :: forall fields eff state
                  .  ReactThis fields (SettingsProps eff) SettingsState
                  -> Component
  externalActions this@{state = {active = SlamDataTab}} =
    D.ul {className: "button-group"}
      [actionButton this [SaveSDConfig this.state.sdConfig] "Save" saveIcon]
  externalActions this@{state = {active = SlamEngineTab}} =
    D.ul {className: "button-group"}
      [actionButton this [SaveSEConfig this.state.seConfig] "Save" saveIcon]

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
        ]
      ]
  reifyContent SlamDataTab this =
    D.div {className: "content" ++ activate SlamDataTab this.state.active}
      [ D.h6 {} [D.rawText "SlamEngine server to connect to"]
      , D.form {}
        [ slamDataServerSettings this
        , slamDataJavaSettings this
        ]
      ]
