module SlamData.Types where

  import Control.Monad.Eff (Eff(..))
  import Control.Monad.Identity (Identity(..))
  import Control.Monad.Cont.Trans (ContT())
  import Control.Reactive.Timer (Timer())

  import Data.Argonaut.Combinators
  import Data.Argonaut.Core
  import Data.Argonaut.Decode
  import Data.Argonaut.Encode
  import Data.Either (Either(..))
  import Data.Foldable (foldl, foldMap, foldr, Foldable)
  import Data.Maybe (maybe, Maybe(..))
  import Data.Tuple (uncurry, Tuple(..))
  import Data.Traversable (sequence, traverse, Traversable)

  import DOM (DOM())

  import Node.Events (Event(..))

  import React.Types (React())

  import qualified Data.Map as M

  -- TODO: These ports should be their own type, not `Number`.
  type Settings =
    { sdConfig :: SDConfig
    , seConfig :: SEConfig
    }

  newtype SDConfig = SDConfig SDConfigRec
  type SDConfigRec =
    { server :: {location :: String, port :: Number}
    , nodeWebkit :: {java :: String}
    }

  newtype SEConfig = SEConfig SEConfigRec
  type SEConfigRec =
    { mountings :: M.Map String Mounting
    , server :: {port :: Number}
    }

  data Mounting = MountMongo MountingRec
  type MountingRec =
    { connectionUri :: String
    , database :: String
    }

  data SlamDataEvent = SaveSDConfig SDConfig
                     | SaveSEConfig SEConfig
                     | ReadFileSystem
                     | CreateNotebook

  type SlamDataRequest eff =
    SlamDataEvent -> Eff (dom :: DOM, react :: React, timer :: Timer | eff) Boolean

  type SlamDataCont eff = SlamDataEvent -> Eff eff Unit

  type SaveSettings eff = Settings -> Eff eff Unit

  type SlamDataState = {showSettings :: Boolean}

  newtype FileType = FileType FileTypeRec
  type FileTypeRec = {name :: String, "type" :: String}
  type FileSystemProps = {files :: [FileType]}

  newtype FileTypes = FileTypes FileTypesRec
  type FileTypesRec = {children :: [FileType]}

  instance encodeSDConfig :: EncodeJson Identity Identity SDConfig where
    encodeJson (Identity (SDConfig sdConfig)) = Identity $
      "server" := (  "location" := sdConfig.server.location
                  ~> "port" := sdConfig.server.port
                  ~> jsonEmptyObject
                  )
      ~> "nodeWebkit" := ("java" := sdConfig.nodeWebkit.java ~> jsonEmptyObject)
      ~> jsonEmptyObject

  instance decodeSDConfig :: DecodeJson Identity (Either String) SDConfig where
    decodeJson (Identity json) = maybe (Left "Not SDConfig.") Right $ do
      obj <- toObject json
      server <- M.lookup "server" obj >>= toObject
      location <- M.lookup "location" server >>= toString
      port <- M.lookup "port" server >>= toNumber
      nodeWebkit <- M.lookup "nodeWebkit" obj >>= toObject
      java <- M.lookup "java" nodeWebkit >>= toString
      pure (SDConfig { server: {location: location, port: port}
                     , nodeWebkit: {java: java}
                     })

  instance encodeMounting :: EncodeJson Identity Identity Mounting where
    encodeJson (Identity (MountMongo mounting)) = Identity $
      "mongodb" := (  "connectionUri" := mounting.connectionUri
                   ~> "database" := mounting.database
                   ~> jsonEmptyObject
                   )
      ~> jsonEmptyObject

  instance decodeMounting :: DecodeJson Identity (Either String) Mounting where
    decodeJson (Identity json) = maybe (Left "Not a MongoDB Mounting.") Right $ do
      obj <- toObject json
      mongodb <- M.lookup "mongodb" obj >>= toObject
      connectionUri <- M.lookup "connectionUri" mongodb >>= toString
      database <- M.lookup "database" mongodb >>= toString
      pure $ MountMongo { connectionUri: connectionUri
                        , database: database
                        }

  -- TODO: This should be `uncurry`, but have to wrap that record.
  encodeMounting' :: Tuple String Mounting -> JAssoc
  encodeMounting' (Tuple path mongodb) = path := mongodb

  instance encodeSEConfig :: EncodeJson Identity Identity SEConfig where
    encodeJson (Identity (SEConfig seConfig)) = Identity $
      "server" := ("port" := seConfig.server.port ~> jsonEmptyObject)
      ~> "mountings" := foldr (~>) jsonEmptyObject (encodeMounting' <$> M.toList seConfig.mountings)
      ~> jsonEmptyObject

  instance decodeSEConfig :: DecodeJson Identity (Either String) SEConfig where
    decodeJson (Identity json) = maybe (Left "Not SEConfig.") Right $ do
      obj <- toObject json
      server <- M.lookup "server" obj >>= toObject
      port <- M.lookup "port" server >>= toNumber
      mountings <- M.lookup "mountings" obj >>= toObject
      mountings' <- traverse decodeMaybe mountings
      pure $ SEConfig { server: {port: port}
                      , mountings: mountings'
                      }

  instance decodeMap :: (DecodeJson Identity (Either String) a) => DecodeJson Identity (Either String) (M.Map String a) where
    decodeJson (Identity json) = maybe (Left "Couldn't decode.") Right $ do
      obj <- toObject json
      traverse decodeMaybe obj

  instance decodeArray :: (DecodeJson Identity (Either String) a) => DecodeJson Identity (Either String) [a] where
    decodeJson (Identity json) = maybe (Left "Couldn't decode.") Right $ do
      obj <- toArray json
      traverse decodeMaybe obj

  instance decodeFileType :: DecodeJson Identity (Either String) FileType where
    decodeJson (Identity json) = maybe (Left "Not a file type") Right $ do
      obj <- toObject json
      name <- M.lookup "name" obj >>= toString
      ty <- M.lookup "type" obj >>= toString
      pure $ FileType {name: name, "type": ty}

  instance decodeFileTypes :: DecodeJson Identity (Either String) FileTypes where
    decodeJson (Identity json) = maybe (Left "No FileTypes") Right $ do
      obj <- toObject json
      children <- M.lookup "children" obj >>= toArray >>= traverse decodeMaybe
      pure $ FileTypes {children: children}

  -- Orphans

  instance foldableMap :: Foldable (M.Map k) where
    foldr f z ms = foldr f z $ M.values ms
    foldl f z ms = foldl f z $ M.values ms
    foldMap f ms = foldMap f $ M.values ms

  instance traversableMap :: (Ord k) => Traversable (M.Map k) where
    traverse f ms = foldr (\x acc -> M.union <$> x <*> acc) (pure M.empty) ((\fs -> uncurry M.singleton <$> fs) <$> (traverse f <$> M.toList ms))
    sequence = traverse id

  requestEvent :: Event
  requestEvent = Event "request"

  responseEvent :: Event
  responseEvent = Event "response"

