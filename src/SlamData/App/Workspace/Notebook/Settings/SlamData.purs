module SlamData.App.Workspace.Notebook.Settings.SlamData
  ( slamDataServerSettings
  ) where

  import Control.Lens ((.~), (^.), (..), LensP())

  import Global (readInt)

  import React (eventHandler)
  import React.Types (Component(), ReactThis())

  import SlamData.Helpers (runV', value)
  import SlamData.Lens
    ( _location
    , _port
    , _sdConfig
    , _sdConfigRec
    , _sdConfigServer
    , _sdDirty
    , _server
    )
  import SlamData.Types
    ( SDConfig()
    , SDConfigServerRec()
    , SlamDataEventTy(..)
    , ValidationTy(..)
    )
  import SlamData.Types.React.WorkSpace.Notebook.Settings
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
                this.setState (this.state # _sdDirty .~ true # _sdServerLocation .~ value e.target)
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
                pure $ this'.setState (this'.state # _sdDirty .~ true # _sdServerPort .~ defaultPort parsed)
              , placeholder: "8080"
              , defaultValue: this.state^._sdServerPort
              }
      []
    , D.span {className: "validation-error"}
      [D.rawText $ runV' this.props.state.validation SettingsSDServerPort]
    ]

  _sdServer :: forall r. LensP {sdConfig :: SDConfig | r} SDConfigServerRec
  _sdServer = _sdConfig.._sdConfigRec.._server.._sdConfigServer

  _sdServerLocation :: forall r. LensP {sdConfig :: SDConfig | r} String
  _sdServerLocation = _sdServer.._location

  _sdServerPort :: forall r. LensP {sdConfig :: SDConfig | r} Number
  _sdServerPort = _sdServer.._port
