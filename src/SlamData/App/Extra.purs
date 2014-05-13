module SlamData.App.Extra (extra) where

  import React

  import SlamData.App.Panel
  import SlamData.App.Panel.Widget

  import qualified React.DOM as D

  extra :: UI
  extra = exPanel

  exPanel :: UI
  exPanel =
    panel { widgets: [ widget { name: "Tasks"
                              , content: D.text "Do some tasks."
                              , active: true
                              }
                     , widget { name: "Sharing"
                              , content: D.text "Show your friends."
                              , active: false
                              }
                     , widget { name: "Chat"
                              , content: D.text "Guess what he/she said."
                              , active: false
                              }
                     ]
          }
