module SlamData.Types where

  import Control.Events (Event(..), EventEff())
  import Control.Monad.Eff (Eff(..))
  import Control.Reactive.Timer (Timer())

  import Data.Argonaut
    ( (:=)
    , (~>)
    , (?>>=)
    , decodeMaybe
    , decodeJson
    , encodeJson
    , jsonEmptyObject
    , toArray
    , toNumber
    , toObject
    , toString
    )
  import Data.Argonaut.Decode (DecodeJson)
  import Data.Argonaut.Encode (EncodeJson)
  import Data.Either (Either(..))
  import Data.Foldable (foldl, foldMap, foldr, Foldable)
  import Data.Maybe (maybe, Maybe(..))
  import Data.Moment (Moment())
  import Data.Tuple (uncurry, Tuple(..))
  import Data.Traversable (sequence, traverse, Traversable)
  import Data.Validation (V(..))

  import DOM (DOM())

  import React.Types (React())

  import SlamData.Types.Workspace.FileSystem (FileType())
  import SlamData.Types.Workspace.Notebook (Notebook(), NotebookID())
  import SlamData.Types.Workspace.Notebook.Block
    ( Block()
    , BlockID()
    , BlockType()
    )
  import SlamData.Types.Workspace.Notebook.Block.Visual (VisualData())

  import qualified Data.StrMap as StrMap
  import qualified Data.Map as M

  type FilePath = String

  -- TODO: These ports should be their own type, not `Number`.
  type Settings =
    { sdConfig :: SDConfig
    , seConfig :: SEConfig
    }

  newtype SDConfig = SDConfig SDConfigRec
  type SDConfigRec =
    { server     :: SDConfigServer
    }

  newtype SDConfigServer = SDConfigServer SDConfigServerRec
  type SDConfigServerRec =
    { location :: String
    , port :: Number
    }

  newtype SEConfig = SEConfig SEConfigRec
  type SEConfigRec =
    { mountings :: StrMap.StrMap Mounting
    , server    :: SEConfigServer
    }

  newtype SEConfigServer = SEConfigServer SEConfigServerRec
  type SEConfigServerRec =
    { port :: Number
    }

  -- This should stay a data type for now,
  -- as we plan to have different types of mountings.
  data Mounting = MountMongo MountingWrapper
  newtype MountingWrapper = MountingWrapper MountingRec
  type MountingRec =
    { connectionUri :: String
    , database      :: String
    }

  newtype SlamDataEvent = SlamDataEvent SlamDataEventRec
  type SlamDataEventRec =
    { event :: SlamDataEventTy
    }

  data SlamDataEventTy = CleanNotebook Notebook
                       | CloseNotebook NotebookID
                       | CreateBlock NotebookID BlockType Number
                       | CreateNotebook
                       | CreateValidation ValidationTy ValidationVal
                       | DeleteBlock NotebookID BlockID
                       | DeleteValidation ValidationTy
                       | DirtyNotebook Notebook
                       | EditBlock Notebook Block
                       | EvalBlock Notebook Block
                       | EvalVisual Notebook Block [VisualData]
                       | HideConfig
                       | HideSettings
                       | LogMessage Log
                       | OpenNotebook FilePath
                       | ReadFields [FilePath]
                       | ReadFileSystem [FilePath]
                       | RenameNotebook Notebook FilePath
                       | SaveNotebook Notebook
                       | SaveSDConfig SDConfig
                       | SaveSEConfig SEConfig
                       | ShowConfig
                       | ShowSettings
                       | TogglePublish Notebook

  data Log = LogError   Moment String
           | LogInfo    Moment String
           | LogWarning Moment String

  type SlamDataRequest eff
    =  SlamDataEventTy
    -> Eff (SlamDataRequestEff eff) Unit

  type SlamDataRequestEff eff =
    ( dom :: DOM
    , event :: EventEff
    , react :: React
    , timer :: Timer
    | eff
    )

  type SlamDataState =
    { files        :: FileType
    , logs         :: [Log]
    , notebooks    :: [Notebook]
    , settings     :: Settings
    , showSettings :: Boolean
    , showConfig   :: Boolean
    , validation   :: Validation
    }

  data ValidationTy = SettingsSDServerPort
                    | SettingsSEMongoUri
                    | SettingsSEMountPath
                    | SettingsSEServerPort

  instance eqValidationTy :: Eq ValidationTy where
    (==) SettingsSDServerPort SettingsSDServerPort = true
    (==) SettingsSEMongoUri   SettingsSEMongoUri   = true
    (==) SettingsSEMountPath  SettingsSEMountPath  = true
    (==) SettingsSEServerPort SettingsSEServerPort = true
    (==) _                    _                    = false
    (/=) v v' = not (v == v')

  instance ordValidationTy :: Ord ValidationTy where
    -- Lower bound
    compare SettingsSDServerPort _                   = LT
    compare SettingsSEMongoUri   SettingsSEMountPath = LT
    -- Upper bound
    compare SettingsSEServerPort _                   = GT
    compare v v' | v == v' = EQ
    compare v v' = case compare v' v of
      LT -> GT
      GT -> LT

  type ValidationVal = V String Unit

  type Validation = M.Map ValidationTy ValidationVal

  -- Instances

  -- SDConfig
  instance encodeSDConfig :: EncodeJson SDConfig where
    encodeJson (SDConfig sdConfig)
      =  "server" := encodeJson sdConfig.server
      ~> jsonEmptyObject

  instance encodeSDConfigServer :: EncodeJson SDConfigServer where
    encodeJson (SDConfigServer server)
      = "location" := encodeJson server.location
      ~> "port"    := encodeJson server.port
      ~> jsonEmptyObject

  instance decodeSDConfig :: DecodeJson SDConfig where
    decodeJson json = toObject json ?>>= "SDConfig" >>= \obj -> do
      server <- StrMap.lookup "server" obj ?>>= "server" >>= decodeJson
      pure $ SDConfig {server: server}

  instance decodeSDConfigServer :: DecodeJson SDConfigServer where
    decodeJson json = toObject json ?>>= "SDConfigServer" >>= \obj -> do
      location <- StrMap.lookup "location" obj ?>>= "location" >>= decodeJson
      port     <- StrMap.lookup "port"     obj ?>>= "port"     >>= decodeJson
      pure $ SDConfigServer {location: location, port: port}

  -- SEConfig
  instance encodeSEConfig :: EncodeJson SEConfig where
    encodeJson (SEConfig seConfig)
      =  "server"    := encodeJson seConfig.server
      ~> "mountings" := encodeJson seConfig.mountings
      ~> jsonEmptyObject

  instance encodeSEConfigServer :: EncodeJson SEConfigServer where
    encodeJson (SEConfigServer server)
      =  "port" := encodeJson server.port
      ~> jsonEmptyObject

  instance encodeMounting :: EncodeJson Mounting where
    encodeJson (MountMongo mounting)
      =  "mongodb" := encodeJson mounting
      ~> jsonEmptyObject

  instance encodeMountingRec :: EncodeJson MountingWrapper where
    encodeJson (MountingWrapper mounting)
      =  "connectionUri" := encodeJson mounting.connectionUri
      ~> "database"      := encodeJson mounting.database
      ~> jsonEmptyObject

  instance decodeSEConfig :: DecodeJson SEConfig where
    decodeJson json = toObject json ?>>= "SEConfig" >>= \obj -> do
      server     <- StrMap.lookup "server"    obj ?>>= "server"    >>= decodeJson
      mountings  <- StrMap.lookup "mountings" obj ?>>= "mountings" >>= decodeJson
      mountings' <- traverse decodeJson mountings
      pure $ SEConfig { server: server
                      , mountings: mountings'
                      }

  instance decodeSEConfigServer :: DecodeJson SEConfigServer where
    decodeJson json = toObject json ?>>= "SEConfigServer" >>= \obj -> do
      port <- StrMap.lookup "port" obj ?>>= "port" >>= decodeJson
      pure $ SEConfigServer {port: port}

  instance decodeMounting :: DecodeJson Mounting where
    decodeJson json = toObject json ?>>= "MountMongo" >>= \obj -> do
      mongodb <- StrMap.lookup "mongodb" obj ?>>= "mongodb" >>= decodeJson
      pure $ MountMongo mongodb

  instance decodeMountingRec :: DecodeJson MountingWrapper where
    decodeJson json = toObject json ?>>= "MountingWrapper" >>= \obj -> do
      connectionUri <- StrMap.lookup "connectionUri" obj ?>>= "connectionUri" >>= decodeJson
      database      <- StrMap.lookup "database"      obj ?>>= "database"      >>= decodeJson
      pure $ MountingWrapper {connectionUri: connectionUri, database: database}

  -- Events

  requestEvent :: Event
  requestEvent = Event "request"

  responseEvent :: Event
  responseEvent = Event "response"
