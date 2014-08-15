module SlamData.Types.JS where

  -- This is a module to help from the JS side.

  import SlamData.Types (SlamDataEventTy(..))

  isSaveSDConfig :: SlamDataEventTy -> Boolean
  isSaveSDConfig (SaveSDConfig _) = true
  isSaveSDConfig _                = false
  isSaveSEConfig :: SlamDataEventTy -> Boolean
  isSaveSEConfig (SaveSEConfig _) = true
  isSaveSEConfig _                = false
  isReadFileSystem :: SlamDataEventTy -> Boolean
  isReadFileSystem ReadFileSystem = true
  isReadFileSystem _              = false
  isCreateNotebook :: SlamDataEventTy -> Boolean
  isCreateNotebook CreateNotebook = true
  isCreateNotebook _              = false
  isCloseNotebook :: SlamDataEventTy -> Boolean
  isCloseNotebook (CloseNotebook _) = true
  isCloseNotebook _                 = false
  isShowSettings :: SlamDataEventTy -> Boolean
  isShowSettings ShowSettings = true
  isShowSettings _            = false
  isHideSettings :: SlamDataEventTy -> Boolean
  isHideSettings HideSettings = true
  isHideSettings _            = false
  isCreateBlock :: SlamDataEventTy -> Boolean
  isCreateBlock (CreateBlock _ _) = true
  isCreateBlock _                 = false
  isDeleteBlock :: SlamDataEventTy -> Boolean
  isDeleteBlock (DeleteBlock _ _) = true
  isDeleteBlock _                 = false
