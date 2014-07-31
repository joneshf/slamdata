module SlamData.Lens where

  import Control.Lens

  import Data.Maybe

  import SlamData.Types

  _settingsRec :: LensP Settings SettingsRec
  _settingsRec = lens (\(Settings rec) -> rec) (\_ rec -> Settings rec)

  _sdConfigRec :: LensP SDConfig SDConfigRec
  _sdConfigRec = lens (\(SDConfig rec) -> rec) (\_ rec -> SDConfig rec)

  _seConfigRec :: LensP SEConfig SEConfigRec
  _seConfigRec = lens (\(SEConfig rec) -> rec) (\_ rec -> SEConfig rec)

  _mountingRec :: LensP Mounting MountingRec
  _mountingRec = lens (\(MountMongo rec) -> rec) (\_ rec -> MountMongo rec)

  _sdConfig :: forall a r. LensP {sdConfig :: a | r} a
  _sdConfig = lens (\o -> o.sdConfig) (\o x -> o{sdConfig = x})

  _seConfig :: forall a r. LensP {seConfig :: a | r} a
  _seConfig = lens (\o -> o.seConfig) (\o x -> o{seConfig = x})

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
