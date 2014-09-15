module SlamData.App.Workspace.Notebook.Settings.SlamData
  ( slamDataJavaSettings
  , slamDataServerSettings
  ) where

  import Control.Lens ((.~), (^.), (..), LensP())

  import Global (readInt)

  import React (eventHandler)
  import React.Types (Component(), ReactThis())

  import SlamData.Helpers (runV', value)
  import SlamData.Lens
    ( _java
    , _location
    , _nodeWebkit
    , _port
    , _sdConfig
    , _sdConfigNodeWebkit
    , _sdConfigRec
    , _sdConfigServer
    , _server
    )
  import SlamData.Types
    ( SDConfig()
    , SDConfigServerRec()
    , SlamDataEventTy(..)
    , ValidationTy(..)
    )
  import SlamData.Types.Workspace.Notebook.Settings
    ( SettingsProps()
    , SettingsState()
    )
  import SlamData.Validation (defaultPort, portParser, validateParsed)

  import Text.Parsing.Parser (runParser)

  import qualified React.DOM as D

  slamDataServerSettings :: forall fields eff state
                         .  ReactThis fields (SettingsProps eff) SettingsState
                         -> Component
  slamDataServerSettings this = D.fieldset {}
    [ D.legend {} [D.rawText "SlamEngine server"]
    , slamDataServerLocation this
    , slamDataServerPort this
    ]

  slamDataServerLocation :: forall fields eff state
                         .  ReactThis fields (SettingsProps eff) SettingsState
                         -> Component
  slamDataServerLocation this = D.div {}
    [ D.label {htmlFor: "server-location"} [D.rawText "Location"]
    , D.input { name: "server-location"
              , onChange: eventHandler this \this e -> pure $
                this.setState (this.state # _sdServerLocation .~ value e.target)
              , placeholder: "http://localhost"
              , value: this.state^._sdServerLocation
              }
      []
    ]

  slamDataServerPort :: forall fields eff state
                     .  ReactThis fields (SettingsProps eff) SettingsState
                     -> Component
  slamDataServerPort this = D.div {}
    [ D.label {htmlFor: "server-port"} [D.rawText "Port"]
    , D.input { name: "server-port"
              , onChange: eventHandler this \this' e -> do
                let parsed = runParser (value e.target) portParser
                this'.props.request $ CreateValidation SettingsSDServerPort $ validateParsed parsed
                pure $ this'.setState (this'.state # _sdServerPort .~ defaultPort parsed)
              , placeholder: "8080"
              , defaultValue: this.state^._sdServerPort
              }
      []
    , D.span {className: "validation-error"}
      [D.rawText $ runV' this.props.state.validation SettingsSDServerPort]
    ]
  -- Java Fields

  slamDataJavaSettings :: forall fields eff state
                         .  ReactThis fields (SettingsProps eff) SettingsState
                         -> Component
  slamDataJavaSettings this = D.fieldset {}
    [ D.legend {} [D.rawText "Java"]
    , slamDataJavaBinary this
    ]

  slamDataJavaBinary :: forall fields eff state
                       .  ReactThis fields (SettingsProps eff) SettingsState
                       -> Component
  slamDataJavaBinary this = D.div {}
    [ D.label {htmlFor: "java-binary"} [D.rawText "Binary"]
    , D.input { name: "java-binary"
              , onChange: eventHandler this \this e -> pure $
                this.setState (this.state # _sdJava .~ value e.target)
              , placeholder: "/usr/bin/java"
              , value: this.state^._sdJava
              }
      []
    ]

  _sdJava :: forall r. LensP {sdConfig :: SDConfig | r} String
  _sdJava = _sdConfig.._sdConfigRec.._nodeWebkit.._sdConfigNodeWebkit.._java

  _sdServer :: forall r. LensP {sdConfig :: SDConfig | r} SDConfigServerRec
  _sdServer = _sdConfig.._sdConfigRec.._server.._sdConfigServer

  _sdServerLocation :: forall r. LensP {sdConfig :: SDConfig | r} String
  _sdServerLocation = _sdServer.._location

  _sdServerPort :: forall r. LensP {sdConfig :: SDConfig | r} Number
  _sdServerPort = _sdServer.._port
