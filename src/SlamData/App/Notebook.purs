module SlamData.App.Notebook (notebook) where

  import React

  import SlamData.App.Notebook.Block
  import SlamData.App.Panel
  import SlamData.App.Panel.Widget

  import qualified React.DOM as D

  notebook :: UI
  notebook = nbPanel

  nbPanel :: UI
  nbPanel =
    panel { widgets: [ widget { name: "Untitled Notebook"
                              , content: block
                              , active: true
                              }
                     , widget { name: "+"
                              , content: D.text ""
                              , active: false
                              }
                     ]
          }



