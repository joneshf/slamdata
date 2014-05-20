module SlamData.App.Reference (reference) where

  import React

  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  reference :: UI
  reference = refPanel

  refPanel :: UI
  refPanel =
    panel [ tab { name: "Tutorial"
                , content: [ D.text "Here's some tutorial things." ]
                , external: []
                , internal: []
                , active: true
                }
          , tab { name: "References"
                , content: [ D.text "Look at all this reference stuff." ]
                , external: []
                , internal: []
                , active: false
                }
          , tab { name: "Examples"
                , content: [ D.text "Wow, examples!" ]
                , external: []
                , internal: []
                , active: false
                }
          , tab { name: "Notes"
                , content: [ D.text "Knowtes." ]
                , external: []
                , internal: []
                , active: false
                }
          ]
