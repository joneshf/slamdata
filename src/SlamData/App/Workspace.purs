module SlamData.App.Workspace (workspace) where

  import Data.Array

  import React

  import SlamData.App.Extra
  import SlamData.App.FileSystem
  import SlamData.App.Notebook
  import SlamData.App.Reference

  import SlamData.Helpers

  import qualified React.DOM as D

  workspace :: UI
  workspace = D.div
    [D.idProp "workspace"]
    [D.div  [ D.className "row"
            , D.idProp "main-row"
            -- , D.dataSet {equalizer: ""}
            ]
            [ D.div
                [ D.className $ "large-2 medium-3 small-5 columns"
                , D.idProp "filesystem"
                ]
                [filesystem]
            , D.div
                [ D.className $ "large-10 medium-9 small-7 columns"
                , D.idProp "notebook"
                ]
                [notebook]
            ]
    ]
