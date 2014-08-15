module SlamData.App.Workspace.Notebook.Settings.SlamEngine
  ( slamEngineJavaSettings
  , slamEngineMountingsSettings
  , slamEngineServerSettings
  ) where

  import Control.Lens ((.~), (%~), (?~), (^.), (..), at, ix, LensP())

  import Data.Maybe (Maybe(..))
  import Data.Tuple (Tuple(..))

  import Global (readInt)

  import React (eventHandler)
  import React.Types (Component(), ReactThis())

  import SlamData.Helpers (value)
  import SlamData.Lens
    ( _connectionUri
    , _database
    , _java
    , _mountings
    , _mountingRec
    , _mountingWrapper
    , _nodeWebkit
    , _port
    , _sdConfig
    , _sdConfigRec
    , _sdConfigNodeWebkit
    , _seConfig
    , _seConfigRec
    , _seConfigServer
    , _server
    )
  import SlamData.Types
    ( Mounting()
    , SDConfig()
    , SDConfigNodeWebkitRec()
    , SEConfig()
    , SEConfigServerRec()
    )
  import SlamData.Types.Workspace.Notebook.Settings
    ( SettingsProps()
    , SettingsState()
    , SettingsTab(..)
    )

  import qualified Data.Map as M
  import qualified React.DOM as D

  -- Server Fields

  slamEngineServerSettings :: forall fields eff state
                     .  ReactThis fields (SettingsProps eff) SettingsState
                     -> Component
  slamEngineServerSettings this = D.fieldset {}
    [ D.legend {} [D.rawText "Server"]
    , slamEngineServerPort this
    ]

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

  -- Mounting Fields

  slamEngineMountingsSettings :: forall fields eff state
                              .  ReactThis fields (SettingsProps eff) SettingsState
                              -> Component
  slamEngineMountingsSettings this = D.fieldset {}
    (D.legend {} [D.rawText "MongoDB mountings"] : slamEngineMountings this)

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
    (\m -> m this mounting) <$> [ slamEngineMountingPath
                                , slamEngineMountingMongoDBMongoUri
                                , slamEngineMountingMongoDBDatabse
                                ]

  slamEngineMountingPath :: forall fields eff state
                         .  ReactThis fields (SettingsProps eff) SettingsState
                         -> Tuple String Mounting
                         -> Component
  slamEngineMountingPath this (Tuple path mounting) = D.div {}
    [ D.label {htmlFor: "mongodb-path"} [D.rawText "Path"]
    , D.input { name: "mongodb-path"
              , onChange: eventHandler this \this e -> do
                let path' = value e.target
                let state' = this.state # _seMountings
                           %~ (at path .~ Nothing) .. (at path' ?~ mounting)
                pure $ this.setState state'
              , placeholder: "/"
              , value: path
              }
      []
    ]

  slamEngineMountingMongoDBMongoUri :: forall fields eff state
                                    .  ReactThis fields (SettingsProps eff) SettingsState
                                    -> Tuple String Mounting
                                    -> Component
  slamEngineMountingMongoDBMongoUri this (Tuple path mounting) = D.div {}
    [ D.label {htmlFor: "mongodb-mongouri"} [D.rawText "MongoUri"]
    , D.input { name: "mongodb-mongouri"
              , onChange: eventHandler this \this e -> do
                let state' = this.state # _seMountings
                           %~ ix path
                           %~ _mountingMongoURI .~ value e.target
                pure $ this.setState state'
              , placeholder: "mongodb://localhost:27017"
              , value: mounting^._mountingMongoURI
              }
      []
    ]

  slamEngineMountingMongoDBDatabse :: forall fields eff state
                                   .  ReactThis fields (SettingsProps eff) SettingsState
                                   -> Tuple String Mounting
                                   -> Component
  slamEngineMountingMongoDBDatabse this (Tuple path mounting) = D.div {}
    [ D.label {htmlFor: "mongodb-mongouri"} [D.rawText "MongoUri"]
    , D.input { name: "mongodb-mongouri"
              , onChange: eventHandler this \this e -> do
                let state' = this.state # _seMountings
                           %~ ix path
                           %~ _mountingDatabase .~ value e.target
                pure $ this.setState state'
              , placeholder: "test"
              , value: mounting^._mountingDatabase
              }
      []
    ]

  -- Java Fields

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

  _sdJava :: forall r. LensP {sdConfig :: SDConfig | r} String
  _sdJava = _sdConfig.._sdConfigRec.._nodeWebkit.._sdConfigNodeWebkit.._java

  _seServerPort :: forall r. LensP {seConfig :: SEConfig | r} Number
  _seServerPort = _seConfig.._seConfigRec.._server.._seConfigServer.._port

  _seMountings :: forall r. LensP {seConfig :: SEConfig | r} (M.Map String Mounting)
  _seMountings = _seConfig.._seConfigRec.._mountings

  _mountingMongoURI :: forall r. LensP Mounting String
  _mountingMongoURI = _mountingWrapper.._mountingRec.._connectionUri

  _mountingDatabase :: forall r. LensP Mounting String
  _mountingDatabase = _mountingWrapper.._mountingRec.._database
