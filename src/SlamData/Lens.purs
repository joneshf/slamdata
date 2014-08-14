module SlamData.Lens where

  import Control.Lens

  import Data.Maybe

  import SlamData.Types
  import SlamData.Types.Workspace.FileSystem

  _sdConfigRec :: LensP SDConfig SDConfigRec
  _sdConfigRec f (SDConfig rec) = SDConfig <$> f rec

  _seConfigRec :: LensP SEConfig SEConfigRec
  _seConfigRec f (SEConfig rec) = SEConfig <$> f rec

  _sdConfigServer :: LensP SDConfigServer SDConfigServerRec
  _sdConfigServer f (SDConfigServer rec) = SDConfigServer <$> f rec

  _sdConfigNodeWebkit :: LensP SDConfigNodeWebkit SDConfigNodeWebkitRec
  _sdConfigNodeWebkit f (SDConfigNodeWebkit rec) = SDConfigNodeWebkit <$> f rec

  _seConfigServer :: LensP SEConfigServer SEConfigServerRec
  _seConfigServer f (SEConfigServer rec) = SEConfigServer <$> f rec

  _mountingWrapper :: LensP Mounting MountingWrapper
  _mountingWrapper f (MountMongo rec) = MountMongo <$> f rec

  _mountingRec :: LensP MountingWrapper MountingRec
  _mountingRec f (MountingWrapper rec) = MountingWrapper <$> f rec

  _fileTypeRec :: LensP FileType FileTypeRec
  _fileTypeRec f (FileType rec) = FileType <$> f rec

  _sdConfig :: forall a r. LensP {sdConfig :: a | r} a
  _sdConfig f o@{sdConfig = sdc} = (\sdc' -> o{sdConfig = sdc'}) <$> f sdc

  _seConfig :: forall a r. LensP {seConfig :: a | r} a
  _seConfig f o@{seConfig = sec} = (\sec' -> o{seConfig = sec'}) <$> f sec

  _server :: forall a r. LensP {server :: a | r} a
  _server = lens (\o -> o.server) (\o x -> o{server = x})

  _location :: forall a r. LensP {location :: a | r} a
  _location = lens (\o -> o.location) (\o x -> o{location = x})

  _port :: forall a r. LensP {port :: a | r} a
  _port = lens (\o -> o.port) (\o x -> o{port = x})

  _nodeWebkit :: forall a r. LensP {nodeWebkit :: a | r} a
  _nodeWebkit = lens (\o -> o.nodeWebkit) (\o x -> o{nodeWebkit = x})

  _java :: forall a r. LensP {java :: a | r} a
  _java = lens (\o -> o.java) (\o x -> o{java = x})

  _mountings :: forall a r. LensP {mountings :: a | r} a
  _mountings = lens (\o -> o.mountings) (\o x -> o{mountings = x})

  _connectionUri :: forall a r. LensP {connectionUri :: a | r} a
  _connectionUri = lens (\o -> o.connectionUri) (\o x -> o{connectionUri = x})

  _database :: forall a r. LensP {database :: a | r} a
  _database = lens (\o -> o.database) (\o x -> o{database = x})

  _settings :: forall a r. LensP {settings :: a | r} a
  _settings = lens (\o -> o.settings) (\o x -> o{settings = x})
