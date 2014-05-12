module SlamData.App.Workspace (workspace) where

  import React

  import SlamData.App.Extra
  import SlamData.App.FileSystem
  import SlamData.App.Notebook
  import SlamData.App.Reference

  import qualified React.DOM as D

  workspace :: UI
  workspace = D.div {}
    [ filesystem
    , notebook
    , reference
    , extra
    ]
