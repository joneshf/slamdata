module SlamData.App.Notebook (notebook) where

  import React

  import SlamData.Helpers
  import SlamData.App.Notebook.Block
  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  notebook :: UI
  notebook = nbPanel

  nbPanel :: UI
  nbPanel =
    panel [ tab { name: "Untitled Notebook"
                , content: []
                , external: [ action "Save", action "Publish" ]
                , internal: [ action "Markdown", action "SQL" ]
                , active: true
                }
          , tab { name: "+"
                , content: []
                , external: []
                , internal: []
                , active: false
                }
          ]
