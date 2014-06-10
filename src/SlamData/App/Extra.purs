module SlamData.App.Extra (extra) where

  import Data.UUID

  import React

  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  extra :: UI
  extra = exPanel

  exPanel :: UI
  exPanel =
    panel [ { name: "Tasks"
            , content: [ D.text "Do some tasks." ]
            , external: []
            , internal: []
            , ident: runv4 v4
            }
          , { name: "Sharing"
            , content: [ D.text "Show your friends." ]
            , external: []
            , internal: []
            , ident: runv4 v4
            }
          , { name: "Chat"
            , content: [ D.text "Guess what he/she said." ]
            , external: []
            , internal: []
            , ident: runv4 v4
            }
          ]
