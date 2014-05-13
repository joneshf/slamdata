module SlamData.App.Reference (reference) where

  import React

  import SlamData.App.Panel
  import SlamData.App.Panel.Widget

  import qualified React.DOM as D

  reference :: UI
  reference = refPanel

  refPanel :: UI
  refPanel =
    panel { widgets: [ widget { name: "Tutorial"
                              , content: D.text "Here's some tutorial things."
                              , active: true
                              }
                     , widget { name: "References"
                              , content: D.text "Look at all this reference stuff."
                              , active: false
                              }
                     , widget { name: "Examples"
                              , content: D.text "Wow, examples!"
                              , active: false
                              }
                     , widget { name: "Notes"
                              , content: D.text "Knowtes."
                              , active: false
                              }
                     ]
          }
