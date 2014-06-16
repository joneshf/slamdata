module SlamData.App.Reference (reference) where

  import Data.UUID

  import React

  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  reference :: UI
  reference = refPanel

  refPanel :: UI
  refPanel =
    panel [ { name: "Tutorial"
            , content: [ D.text "Here's some tutorial things." ]
            , external: []
            , internal: []
            , ident: runUUID v4
            }
          , { name: "References"
            , content: [ D.text "Look at all this reference stuff." ]
            , external: []
            , internal: []
            , ident: runUUID v4
            }
          , { name: "Examples"
            , content: [ D.text "Wow, examples!" ]
            , external: []
            , internal: []
            , ident: runUUID v4
            }
          , { name: "Notes"
            , content: [ D.text "Knowtes." ]
            , external: []
            , internal: []
            , ident: runUUID v4
            }
          ]
