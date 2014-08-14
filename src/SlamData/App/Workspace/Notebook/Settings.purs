module SlamData.App.Workspace.Notebook.Settings
  ( settings
  , SettingsProps()
  , SettingsState()
  , SettingsTab()
  ) where

  import Control.Lens ((.~), (%~), (..), (^.), LensP())
  import Control.Bind ((=<<))

  import Data.Either (Either(..))
  import Data.Maybe (Maybe(..))
  import Data.Tuple (Tuple(..))

  import Global (readInt)

  import React (coerceThis, createClass, eventHandler, spec)
  import React.Types (Component(), ComponentClass(), Element(), ReactThis())

  import SlamData.Lens
    ( _connectionUri
    , _database
    , _java
    , _location
    , _mountings
    , _mountingRec
    , _mountingWrapper
    , _nodeWebkit
    , _port
    , _sdConfig
    , _sdConfigNodeWebkit
    , _sdConfigRec
    , _sdConfigServer
    , _seConfig
    , _seConfigRec
    , _seConfigServer
    , _server
    , _settings
    )
  import SlamData.Types
    ( Mounting(..)
    , SDConfig()
    , SDConfigNodeWebkitRec()
    , SDConfigServerRec()
    , SEConfig()
    , SEConfigServerRec()
    , SlamDataEventTy(..)
    , SlamDataRequest(..)
    , SlamDataState()
    )

  import qualified Data.Map as M
  import qualified React.DOM as D

  type SettingsProps eff =
    { request :: SlamDataRequest eff
    , state   :: SlamDataState
    }
  type SettingsState =
    { active   :: SettingsTab
    , sdConfig :: SDConfig
    , seConfig :: SEConfig
    }

  data SettingsTab = SlamDataTab
                   | SlamEngineTab

  instance eqSettingsTab :: Eq SettingsTab where
    (==) SlamDataTab   SlamDataTab   = true
    (==) SlamEngineTab SlamEngineTab = true
    (==) _             _             = false

    (/=) st            st'           = not (st == st')

  instance showSettingsTab :: Show SettingsTab where
    show SlamDataTab   = "SlamData"
    show SlamEngineTab = "SlamEngine"

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
  reifyTab name this = D.dd {className: "tab" ++ activate name this.state.active}
    [D.a {id: "settings-" ++ show name, onClick: \_ -> this.setState this.state{active = name}}
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
        , saveConfig this (Right this.state.seConfig)
        ]
      ]
  reifyContent SlamDataTab this =
    D.div {className: "content" ++ activate SlamDataTab this.state.active}
      [ D.h6 {} [D.rawText "SlamEngine server to connect to"]
      , D.form {}
        [ slamDataServerSettings this
        , saveConfig this (Left this.state.sdConfig)
        ]
      ]

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
              , onChange: eventHandler this \this e -> pure $
                this.setState (this.state # _sdServerPort .~ (readInt 10 $ value e.target))
              , placeholder: "8080"
              , value: this.state^._sdServerPort
              }
      []
    ]

  slamEngineServerSettings :: forall fields eff state
                     .  ReactThis fields (SettingsProps eff) SettingsState
                     -> Component
  slamEngineServerSettings this = D.fieldset {}
    [ D.legend {} [D.rawText "Server"]
    , slamEngineServerPort this
    ]

  slamEngineMountingsSettings :: forall fields eff state
                              .  ReactThis fields (SettingsProps eff) SettingsState
                              -> Component
  slamEngineMountingsSettings this = D.fieldset {}
    (D.legend {} [D.rawText "MongoDB mountings"] : slamEngineMountings this)

  slamEngineServerPort :: forall fields eff state
                       .  ReactThis fields (SettingsProps eff) SettingsState
                       -> Component
  slamEngineServerPort this = D.div {}
    [ D.label {htmlFor: "slamengine-port"} [D.rawText "Port"]
    , D.input { name: "slamengine-port"
              , onChange: eventHandler this \this e -> pure $
                this.setState (this.state # _seServerPort .~ (readInt 10 $ value e.target))
              , placeholder: "8080"
              , value: this.state^._seServerPort
              }
      []
    ]

  slamEngineMountings :: forall fields eff state
                      .  ReactThis fields (SettingsProps eff) SettingsState
                      -> [Component]
  slamEngineMountings this =
     M.toList (this.state.seConfig^._seConfigRec.._mountings) >>= slamEngineMounting this

  slamEngineMounting :: forall fields eff state
                     .  ReactThis fields (SettingsProps eff) SettingsState
                     -> Tuple String Mounting
                     -> [Component]
  slamEngineMounting this mounting =
    (\m -> m this mounting) =<< [ slamEngineMountingPath
                                , slamEngineMountingMongoDBMongoUri
                                , slamEngineMountingMongoDBDatabse
                                ]

  slamEngineMountingPath :: forall fields eff state
                         .  ReactThis fields (SettingsProps eff) SettingsState
                         -> Tuple String Mounting
                         -> [Component]
  slamEngineMountingPath this (Tuple path mounting) =
    [ D.label {htmlFor: "mongodb-path"} [D.rawText "Path"]
    , D.input { name: "mongodb-path"
              , onChange: eventHandler this \this e -> do
                let state' = this.state # _seMountings %~ (M.delete path)
                let state'' = state' # _seMountings %~ (M.insert (value e.target) mounting)
                pure $ this.setState state''
              , placeholder: "/"
              , value: path
              }
      []
    ]

  slamEngineMountingMongoDBMongoUri :: forall fields eff state
                                    .  ReactThis fields (SettingsProps eff) SettingsState
                                    -> Tuple String Mounting
                                    -> [Component]
  slamEngineMountingMongoDBMongoUri this (Tuple path mounting) =
    [ D.label {htmlFor: "mongodb-mongouri"} [D.rawText "MongoUri"]
    , D.input { name: "mongodb-mongouri"
              , onChange: eventHandler this \this e -> do
                let state' = this.state # _seMountings %~ (M.update (\m -> Just (m # _mountingWrapper.._mountingRec.._connectionUri .~ value e.target)) path)
                pure $ this.setState state'
              , placeholder: "/"
              , value: mounting^._mountingWrapper.._mountingRec.._connectionUri
              }
      []
    ]

  slamEngineMountingMongoDBDatabse :: forall fields eff state
                                   .  ReactThis fields (SettingsProps eff) SettingsState
                                   -> Tuple String Mounting
                                   -> [Component]
  slamEngineMountingMongoDBDatabse this (Tuple path mounting) =
    [ D.label {htmlFor: "mongodb-mongouri"} [D.rawText "MongoUri"]
    , D.input { name: "mongodb-mongouri"
              , onChange: eventHandler this \this e -> do
                let state' = this.state # _seMountings %~ (M.update (\m -> Just (m # _mountingWrapper.._mountingRec.._database .~ value e.target)) path)
                pure $ this.setState state'
              , placeholder: "/"
              , value: mounting^._mountingWrapper.._mountingRec.._database
              }
      []
    ]

  slamEngineJavaSettings :: forall fields eff state
                         .  ReactThis fields (SettingsProps eff) SettingsState
                         -> Component
  slamEngineJavaSettings this = D.fieldset {}
    [ D.legend {} [D.rawText "Java"]
    , slamEngineJavaBinary this
    ]

  slamEngineJavaBinary :: forall fields eff state
                       .  ReactThis fields (SettingsProps eff) SettingsState
                       -> Component
  slamEngineJavaBinary this = D.div {}
    [ D.label {htmlFor: "java-binary"} [D.rawText "Binary"]
    , D.input { name: "java-binary"
              , onChange: eventHandler this \this e -> pure $
                this.setState (this.state # _sdJava .~ value e.target)
              , placeholder: "/usr/bin/java"
              , value: this.state^._sdJava
              }
      []
    ]

  saveConfig :: forall fields eff state
             .  ReactThis fields (SettingsProps eff) SettingsState
             -> Either SDConfig SEConfig
             -> Component
  saveConfig this (Left sdConfig) =
    D.a { className: "tiny button"
        , onClick: eventHandler this \this _ ->
          this.props.request $ SaveSDConfig sdConfig
        }
      [D.rawText "Save"]
  saveConfig this (Right seConfig) =
    D.a { className: "tiny button"
        , onClick: eventHandler this \this _ ->
          this.props.request $ SaveSEConfig seConfig
        }
      [D.rawText "Save"]

  activate :: SettingsTab -> SettingsTab -> String
  activate tab active | tab == active = " active"
  activate _   _                      = ""

  foreign import value
    "function value(el) {\
    \  return el.value;\
    \}" :: Element -> String

  -- Lenses

  _sdServer :: forall r. LensP {sdConfig :: SDConfig | r} SDConfigServerRec
  _sdServer = _sdConfig.._sdConfigRec.._server.._sdConfigServer

  _seServer :: forall r. LensP {seConfig :: SEConfig | r} SEConfigServerRec
  _seServer = _seConfig.._seConfigRec.._server.._seConfigServer

  _sdNodeWebkit :: forall r. LensP {sdConfig :: SDConfig | r} SDConfigNodeWebkitRec
  _sdNodeWebkit = _sdConfig.._sdConfigRec.._nodeWebkit.._sdConfigNodeWebkit

  _sdServerLocation :: forall r. LensP {sdConfig :: SDConfig | r} String
  _sdServerLocation = _sdServer.._location

  _sdServerPort :: forall r. LensP {sdConfig :: SDConfig | r} Number
  _sdServerPort = _sdServer.._port

  _sdJava :: forall r. LensP {sdConfig :: SDConfig | r} String
  _sdJava = _sdNodeWebkit.._java

  _seServerPort :: forall r. LensP {seConfig :: SEConfig | r} Number
  _seServerPort = _seServer.._port

  _seMountings :: forall r. LensP {seConfig :: SEConfig | r} (M.Map String Mounting)
  _seMountings = _seConfig.._seConfigRec.._mountings
