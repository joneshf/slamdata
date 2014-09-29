module SlamData.Types where

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
  import Data.Tuple (uncurry, Tuple(..))
  import Data.Traversable (sequence, traverse, Traversable)
  import Data.Validation (V(..))

  import DOM (DOM())

  import Node.Events (Event(..), EventEff())

  import React.Types (React())

  import SlamData.Types.Workspace.FileSystem (FileType())
  import SlamData.Types.Workspace.Notebook (Notebook(), NotebookID())
  import SlamData.Types.Workspace.Notebook.Block
    ( Block()
    , BlockID()
    , BlockType()
    )
  import SlamData.Types.Workspace.Notebook.Block.Visual (VisualData())

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
    , nodeWebkit :: SDConfigNodeWebkit
    }

  newtype SDConfigServer = SDConfigServer SDConfigServerRec
  type SDConfigServerRec =
    { location :: String
    , port :: Number
    }

  newtype SDConfigNodeWebkit = SDConfigNodeWebkit SDConfigNodeWebkitRec
  type SDConfigNodeWebkitRec =
    { java :: String
    }

  newtype SEConfig = SEConfig SEConfigRec
  type SEConfigRec =
    { mountings :: M.Map FilePath Mounting
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

  newtype SlamDataEvent = SlamDataEvent
    { state :: SlamDataState
    , event :: SlamDataEventTy
    }

  data SlamDataEventTy = SaveSDConfig SDConfig
                       | SaveSEConfig SEConfig
                       | HideConfig
                       | ShowConfig
                       | ReadFileSystem [FilePath]
                       | ReadFields [FilePath]
                       | CreateNotebook
                       | CloseNotebook NotebookID
                       | OpenNotebook FilePath
                       | RenameNotebook Notebook FilePath
                       | SaveNotebook Notebook
                       | DirtyNotebook Notebook
                       | CleanNotebook Notebook
                       | TogglePublish Notebook
                       | ShowSettings
                       | HideSettings
                       | CreateBlock NotebookID BlockType Number
                       | DeleteBlock NotebookID BlockID
                       | EditBlock Notebook Block
                       | EvalBlock Notebook Block
                       | EvalVisual Notebook Block [VisualData]
                       | CreateValidation ValidationTy ValidationVal
                       | DeleteValidation ValidationTy

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
      =  "server"     := encodeJson sdConfig.server
      ~> "nodeWebkit" := encodeJson sdConfig.nodeWebkit
      ~> jsonEmptyObject

  instance encodeSDConfigServer :: EncodeJson SDConfigServer where
    encodeJson (SDConfigServer server)
      = "location" := encodeJson server.location
      ~> "port"    := encodeJson server.port
      ~> jsonEmptyObject

  instance encodeSDConfigNodeWebkit :: EncodeJson SDConfigNodeWebkit where
    encodeJson (SDConfigNodeWebkit nw)
      = "java" := encodeJson nw.java
      ~> jsonEmptyObject

  instance decodeSDConfig :: DecodeJson SDConfig where
    decodeJson json = toObject json ?>>= "SDConfig" >>= \obj -> do
      server     <- M.lookup "server"     obj ?>>= "server"     >>= decodeJson
      nodeWebkit <- M.lookup "nodeWebkit" obj ?>>= "nodeWebkit" >>= decodeJson
      pure $ SDConfig {server: server, nodeWebkit: nodeWebkit}

  instance decodeSDConfigServer :: DecodeJson SDConfigServer where
    decodeJson json = toObject json ?>>= "SDConfigServer" >>= \obj -> do
      location <- M.lookup "location" obj ?>>= "location" >>= decodeJson
      port     <- M.lookup "port"     obj ?>>= "port"     >>= decodeJson
      pure $ SDConfigServer {location: location, port: port}

  instance decodeSDConfigNodeWebkit :: DecodeJson SDConfigNodeWebkit where
    decodeJson json = toObject json ?>>= "SDConfigNodeWebkit" >>= \obj -> do
      java <- M.lookup "java" obj ?>>= "java" >>= decodeJson
      pure $ SDConfigNodeWebkit {java: java}

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
      server     <- M.lookup "server"    obj ?>>= "server"    >>= decodeJson
      mountings  <- M.lookup "mountings" obj ?>>= "mountings" >>= decodeJson
      mountings' <- traverse decodeJson mountings
      pure $ SEConfig { server: server
                      , mountings: mountings'
                      }

  instance decodeSEConfigServer :: DecodeJson SEConfigServer where
    decodeJson json = toObject json ?>>= "SEConfigServer" >>= \obj -> do
      port <- M.lookup "port" obj ?>>= "port" >>= decodeJson
      pure $ SEConfigServer {port: port}

  instance decodeMounting :: DecodeJson Mounting where
    decodeJson json = toObject json ?>>= "MountMongo" >>= \obj -> do
      mongodb <- M.lookup "mongodb" obj ?>>= "mongodb" >>= decodeJson
      pure $ MountMongo mongodb

  instance decodeMountingRec :: DecodeJson MountingWrapper where
    decodeJson json = toObject json ?>>= "MountingWrapper" >>= \obj -> do
      connectionUri <- M.lookup "connectionUri" obj ?>>= "connectionUri" >>= decodeJson
      database      <- M.lookup "database"      obj ?>>= "database"      >>= decodeJson
      pure $ MountingWrapper {connectionUri: connectionUri, database: database}

  -- Events

  requestEvent :: Event
  requestEvent = Event "request"

  responseEvent :: Event
  responseEvent = Event "response"
