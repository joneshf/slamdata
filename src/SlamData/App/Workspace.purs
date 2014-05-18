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
  workspace = D.div [ D.idProp "workspace" ] $
    [ D.div [ D.className "row"
            , D.idProp "main-row"
            , D.dataProp {"equalizer": true}
            ]
            [ large "2" filesystem
            , large "7" notebook
            , large "3" reference
            ]
    , D.div [ D.className "row"
            , D.idProp "extra-row"
            ]
            [ large "12" extra ]
    ]
