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
  isEditBlock :: SlamDataEventTy -> Boolean
  isEditBlock (EditBlock _ _) = true
  isEditBlock _               = false
  isEvalBlock :: SlamDataEventTy -> Boolean
  isEvalBlock (EvalBlock _ _) = true
  isEvalBlock _               = false
  isEvalVisual :: SlamDataEventTy -> Boolean
  isEvalVisual (EvalVisual _ _ _) = true
  isEvalVisual _                  = false

  isMarkdown :: BlockType -> Boolean
  isMarkdown Markdown = true
  isMarkdown _        = false
  isSQL :: BlockType -> Boolean
  isSQL SQL = true
  isSQL _   = false
  isVisual :: BlockType -> Boolean
  isVisual Visual = true
  isVisual _      = false
