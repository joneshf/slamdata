module SlamData.App.Notebook (notebook) where

  import React

  import SlamData.Helpers
  import SlamData.App.Notebook.Block
  import SlamData.App.Panel
  import SlamData.App.Panel.Widget

  import qualified React.DOM as D

  notebook :: UI
  notebook = nbPanel

  nbPanel :: UI
  nbPanel =
    panel { widgets: [ widget { name: "Untitled Notebook"
                              , content: markdown
                              , active: true
                              }
                     , widget { name: "+"
                              , content: D.text ""
                              , active: false
                              }
                     ]
          , actions: { external: [ action "Save", action "Publish" ]
                     , internal: [ action "Markdown", action "SQL" ]
                     }
          }



