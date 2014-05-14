module SlamData.App.Workspace (workspace) where

  import React

  import SlamData.App.Extra
  import SlamData.App.FileSystem
  import SlamData.App.Notebook
  import SlamData.App.Reference

  import SlamData.Helpers

  import qualified React.DOM as D

  workspace :: UI
  workspace = D.div { id: "workspace" }
    [ D.div { className: "row"
            , id: "main-row"
            , "data-equalizer": true
            }
            [ large "2" filesystem
            , large "7" notebook
            , large "3" reference
            ]
    , D.div { className: "row"
            , id: "extra-row"
            }
            [ large "12" extra ]
    ]
