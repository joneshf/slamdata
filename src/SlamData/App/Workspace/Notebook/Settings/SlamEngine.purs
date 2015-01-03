module SlamData.App.Workspace.Notebook.Settings.SlamEngine
  ( slamEngineMountingsSettings
  , slamEngineServerSettings
  ) where

  import Control.Lens ((.~), (%~), (?~), (^.), (..), at, ix, LensP())

  import Data.Maybe (Maybe(..))
  import Data.Tuple (Tuple(..))

  import React (eventHandler)
  import React.Types (Component(), ReactThis())

  import SlamData.Helpers (getOrElse, runV', value)
  import SlamData.Lens
    ( _connectionUri
    , _database
    , _mountings
    , _mountingRec
    , _mountingWrapper
    , _port
    , _seConfig
    , _seConfigRec
    , _seConfigServer
    , _seDirty
    , _server
    )
  import SlamData.Types
    ( Mounting()
    , SDConfig()
    , SEConfig()
    , SEConfigServerRec()
    , SlamDataEventTy(..)
    , ValidationTy(..)
    )
  import SlamData.Types.React.WorkSpace.Notebook.Settings
    ( SettingsProps()
    , SettingsState()
    )
  import SlamData.Types.Workspace.Notebook.Settings (SettingsTab(..))
  import SlamData.Validation
    ( defaultPort
    , portParser
    , validateMongoUri
    , validateMountPath
    , validateParsed
    )

  import Text.Parsing.Parser (runParser)

  import qualified Data.StrMap as M
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
              , onChange: eventHandler this \this e -> do
                let parsed = runParser (value e.target) portParser
                this.props.request $ CreateValidation SettingsSEServerPort $ validateParsed parsed
                pure $ this.setState (this.state # _seServerPort .~ defaultPort parsed # _seDirty .~ true)
              , placeholder: "8080"
              , defaultValue: this.state^._seServerPort
              }
      []
    , D.span {className: "validation-error"}
      [D.rawText $ runV' this.props.state.validation SettingsSEServerPort]
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
                let state' = this.state # _seDirty .~ true # _seMountings
                           %~ (at path .~ (Nothing :: Maybe Mounting)) .. (at path' ?~ mounting)
                pure $ this.setState state'
                this.props.request $ CreateValidation SettingsSEMountPath $ validateMountPath path'
              , placeholder: "/"
              , defaultValue: path
              }
      []
    , D.span {className: "validation-error"}
      [D.rawText $ runV' this.props.state.validation SettingsSEMountPath]
    ]

  slamEngineMountingMongoDBMongoUri :: forall fields eff state
                                    .  ReactThis fields (SettingsProps eff) SettingsState
                                    -> Tuple String Mounting
                                    -> Component
  slamEngineMountingMongoDBMongoUri this (Tuple path mounting) = D.div {}
    [ D.label {htmlFor: "mongodb-mongouri"} [D.rawText "MongoUri"]
    , D.input { name: "mongodb-mongouri"
              , onChange: eventHandler this \this e -> do
                let uri = value e.target
                let state' = this.state # _seDirty .~ true # _seMountings
                           %~ ix path
                           %~ _mountingMongoURI .~ value e.target
                pure $ this.setState state'
                this.props.request $ CreateValidation SettingsSEMongoUri $ validateMongoUri uri
              , placeholder: "mongodb://localhost:27017"
              , defaultValue: mounting^._mountingMongoURI
              }
      []
    , D.span {className: "validation-error"}
      [D.rawText $ runV' this.props.state.validation SettingsSEMongoUri]
    ]

  slamEngineMountingMongoDBDatabse :: forall fields eff state
                                   .  ReactThis fields (SettingsProps eff) SettingsState
                                   -> Tuple String Mounting
                                   -> Component
  slamEngineMountingMongoDBDatabse this (Tuple path mounting) = D.div {}
    [ D.label {htmlFor: "mongodb-database"} [D.rawText "Database"]
    , D.input { name: "mongodb-database"
              , onChange: eventHandler this \this e -> do
                let state' = this.state # _seDirty .~ true # _seMountings
                           %~ ix path
                           %~ _mountingDatabase .~ value e.target
                pure $ this.setState state'
              , placeholder: "test"
              , defaultValue: mounting^._mountingDatabase
              }
      []
    ]

  _seServerPort :: forall r. LensP {seConfig :: SEConfig | r} Number
  _seServerPort = _seConfig.._seConfigRec.._server.._seConfigServer.._port

  _seMountings :: forall r. LensP {seConfig :: SEConfig | r} (M.StrMap Mounting)
  _seMountings = _seConfig.._seConfigRec.._mountings

  _mountingMongoURI :: LensP Mounting String
  _mountingMongoURI = _mountingWrapper.._mountingRec.._connectionUri

  _mountingDatabase :: LensP Mounting String
  _mountingDatabase = _mountingWrapper.._mountingRec.._database
