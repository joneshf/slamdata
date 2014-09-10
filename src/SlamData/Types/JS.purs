module SlamData.Types.JS where

  -- This is a module to help from the JS side.

  import SlamData.Types (SlamDataEventTy(..))
  import SlamData.Types.Workspace.Notebook.Block (BlockType(..))

  isSaveSDConfig :: SlamDataEventTy -> Boolean
  isSaveSDConfig (SaveSDConfig _) = true
  isSaveSDConfig _                = false
  isSaveSEConfig :: SlamDataEventTy -> Boolean
  isSaveSEConfig (SaveSEConfig _) = true
  isSaveSEConfig _                = false
  isShowConfig :: SlamDataEventTy -> Boolean
  isShowConfig ShowConfig = true
  isShowConfig _          = false
  isHideConfig :: SlamDataEventTy -> Boolean
  isHideConfig HideConfig = true
  isHideConfig _          = false
  isReadFileSystem :: SlamDataEventTy -> Boolean
  isReadFileSystem (ReadFileSystem _) = true
  isReadFileSystem _                  = false
  isReadFields :: SlamDataEventTy -> Boolean
  isReadFields (ReadFields _) = true
  isReadFields _              = false
  isCreateNotebook :: SlamDataEventTy -> Boolean
  isCreateNotebook CreateNotebook = true
  isCreateNotebook _              = false
  isCloseNotebook :: SlamDataEventTy -> Boolean
  isCloseNotebook (CloseNotebook _) = true
  isCloseNotebook _                 = false
  isSaveNotebook :: SlamDataEventTy -> Boolean
  isSaveNotebook (SaveNotebook _) = true
  isSaveNotebook _                = false
  isOpenNotebook :: SlamDataEventTy -> Boolean
  isOpenNotebook (OpenNotebook _) = true
  isOpenNotebook _                = false
  isRenameNotebook :: SlamDataEventTy -> Boolean
  isRenameNotebook (RenameNotebook _ _) = true
  isRenameNotebook _                    = false
  isTogglePublish :: SlamDataEventTy -> Boolean
  isTogglePublish (TogglePublish _) = true
  isTogglePublish _                 = false
  isShowSettings :: SlamDataEventTy -> Boolean
  isShowSettings ShowSettings = true
  isShowSettings _            = false
  isHideSettings :: SlamDataEventTy -> Boolean
  isHideSettings HideSettings = true
  isHideSettings _            = false
  isCreateBlock :: SlamDataEventTy -> Boolean
  isCreateBlock (CreateBlock _ _ _) = true
  isCreateBlock _                   = false
  isDeleteBlock :: SlamDataEventTy -> Boolean
  isDeleteBlock (DeleteBlock _ _) = true
  isDeleteBlock _                 = false
  isEditBlock :: SlamDataEventTy -> Boolean
  isEditBlock (EditBlock _ _) = true
  isEditBlock _               = false
  isEvalBlock :: SlamDataEventTy -> Boolean
  isEvalBlock (EvalBlock _ _) = true
  isEvalBlock _               = false
  isEvalVisual :: SlamDataEventTy -> Boolean
  isEvalVisual (EvalVisual _ _ _) = true
  isEvalVisual _                  = false
