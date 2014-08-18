module SlamData.Types.Workspace.Notebook.Block.Visual where

  import Graphics.C3 (C3Type())

  newtype VisualData = VisualData
    { fields :: [String]
    , path   :: String
    , "type" :: C3Type
    }
