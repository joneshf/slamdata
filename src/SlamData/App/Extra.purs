module SlamData.App.Extra (extra) where

  import React

  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  extra :: UI
  extra = exPanel

  exPanel :: UI
  exPanel =
    panel [ tab { name: "Tasks"
                , content: [ D.text "Do some tasks." ]
                , external: []
                , internal: []
                , active: true
                }
          , tab { name: "Sharing"
                , content: [ D.text "Show your friends." ]
                , external: []
                , internal: []
                , active: false
                }
          , tab { name: "Chat"
                , content: [ D.text "Guess what he/she said." ]
                , external: []
                , internal: []
                , active: false
                }
          ]
