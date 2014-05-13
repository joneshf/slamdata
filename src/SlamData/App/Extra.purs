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
                              , content: "This is some content like crazy."
                              , active: true
                              }
                     , widget { name: "Sharing"
                              , content: "This is some content like crazy."
                              , active: false
                              }
                     , widget { name: "Chat"
                              , content: "This is some content like crazy."
                              , active: false
                              }
                     ]
          }
