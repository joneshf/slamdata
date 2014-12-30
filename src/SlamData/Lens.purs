module SlamData.Lens where

  import Control.Lens

  import Data.Maybe

  import SlamData.Types
  import SlamData.Types.Workspace.FileSystem
  import SlamData.Types.Workspace.Notebook
  import SlamData.Types.Workspace.Notebook.Block

  _sdConfigRec :: LensP SDConfig SDConfigRec
  _sdConfigRec f (SDConfig rec) = SDConfig <$> f rec

  _seConfigRec :: LensP SEConfig SEConfigRec
  _seConfigRec f (SEConfig rec) = SEConfig <$> f rec

  _sdConfigServer :: LensP SDConfigServer SDConfigServerRec
  _sdConfigServer f (SDConfigServer rec) = SDConfigServer <$> f rec

  _seConfigServer :: LensP SEConfigServer SEConfigServerRec
  _seConfigServer f (SEConfigServer rec) = SEConfigServer <$> f rec

  _mountingWrapper :: LensP Mounting MountingWrapper
  _mountingWrapper f (MountMongo rec) = MountMongo <$> f rec

  _mountingRec :: LensP MountingWrapper MountingRec
  _mountingRec f (MountingWrapper rec) = MountingWrapper <$> f rec

  _fileTypeRec :: LensP FileType FileTypeRec
  _fileTypeRec f (FileType rec) = FileType <$> f rec

  _notebookRec :: LensP Notebook NotebookRec
  _notebookRec f (Notebook rec) = Notebook <$> f rec

  _blockRec :: LensP Block BlockRec
  _blockRec f (Block rec) = Block <$> f rec

  _sdConfig :: forall a r. LensP {sdConfig :: a | r} a
  _sdConfig f o@{sdConfig = sdc} = (\sdc' -> o{sdConfig = sdc'}) <$> f sdc

  _seConfig :: forall a r. LensP {seConfig :: a | r} a
  _seConfig f o@{seConfig = sec} = (\sec' -> o{seConfig = sec'}) <$> f sec

  _server :: forall a r. LensP {server :: a | r} a
  _server f o@{server = i} = (\i' -> o{server = i'}) <$> f i

  _location :: forall a r. LensP {location :: a | r} a
  _location f o@{location = i} = (\i' -> o{location = i'}) <$> f i

  _port :: forall a r. LensP {port :: a | r} a
  _port f o@{port = i} = (\i' -> o{port = i'}) <$> f i

  _mountings :: forall a r. LensP {mountings :: a | r} a
  _mountings f o@{mountings = i} = (\i' -> o{mountings = i'}) <$> f i

  _connectionUri :: forall a r. LensP {connectionUri :: a | r} a
  _connectionUri f o@{connectionUri = i} = (\i' -> o{connectionUri = i'}) <$> f i

  _database :: forall a r. LensP {database :: a | r} a
  _database f o@{database = i} = (\i' -> o{database = i'}) <$> f i

  _settings :: forall a r. LensP {settings :: a | r} a
  _settings f o@{settings = i} = (\i' -> o{settings = i'}) <$> f i

  _ident :: forall a r. LensP {ident :: a | r} a
  _ident f o@{ident = i} = (\i' -> o{ident = i'}) <$> f i

  _content :: forall a r. LensP {content :: a | r} a
  _content f o@{content = i} = (\i' -> o{content = i'}) <$> f i

  _blockMode :: forall a r. LensP {blockMode :: a | r} a
  _blockMode f o@{blockMode = i} = (\i' -> o{blockMode = i'}) <$> f i

  _blockType :: forall a r. LensP {blockType :: a | r} a
  _blockType f o@{blockType = i} = (\i' -> o{blockType = i'}) <$> f i

  _editContent :: forall a r. LensP {editContent :: a | r} a
  _editContent f o@{editContent = i} = (\i' -> o{editContent = i'}) <$> f i

  _evalContent :: forall a r. LensP {evalContent :: a | r} a
  _evalContent f o@{evalContent = i} = (\i' -> o{evalContent = i'}) <$> f i

  _children :: forall a r. LensP {children :: a | r} a
  _children f o@{children = i} = (\i' -> o{children = i'}) <$> f i

  _name :: forall a r. LensP {name :: a | r} a
  _name f o@{name = i} = (\i' -> o{name = i'}) <$> f i

  _files :: forall a r. LensP {files :: a | r} a
  _files f o@{files = i} = (\i' -> o{files = i'}) <$> f i

  _published :: forall a r. LensP {published :: a | r} a
  _published f o@{published = i} = (\i' -> o{published = i'}) <$> f i

  _numOut :: forall a r. LensP {numOut :: a | r} a
  _numOut f o@{numOut = i} = (\i' -> o{numOut = i'}) <$> f i

  _validation :: forall a r. LensP {validation :: a | r} a
  _validation f o@{validation = i} = (\i' -> o{validation = i'}) <$> f i

  _dirty :: forall a r. LensP {dirty :: a | r} a
  _dirty f o@{dirty = i} = (\i' -> o{dirty = i'}) <$> f i

  _sdDirty :: forall a r. LensP {sdDirty :: a | r} a
  _sdDirty f o@{sdDirty = i} = (\i' -> o{sdDirty = i'}) <$> f i

  _seDirty :: forall a r. LensP {seDirty :: a | r} a
  _seDirty f o@{seDirty = i} = (\i' -> o{seDirty = i'}) <$> f i

  _label :: forall a r. LensP {label :: a | r} a
  _label f o@{label = i} = (\i' -> o{label = i'}) <$> f i

  _logs :: forall a r. LensP {logs :: a | r} a
  _logs f o@{logs = i} = (\i' -> o{logs = i'}) <$> f i

  _showConfig :: forall a r. LensP {showConfig :: a | r} a
  _showConfig f o@{showConfig = i} = (\i' -> o{showConfig = i'}) <$> f i

  _showSettings :: forall a r. LensP {showSettings :: a | r} a
  _showSettings f o@{showSettings = i} = (\i' -> o{showSettings = i'}) <$> f i

  _notebooks :: forall a r. LensP {notebooks :: a | r} a
  _notebooks f o@{notebooks = i} = (\i' -> o{notebooks = i'}) <$> f i
