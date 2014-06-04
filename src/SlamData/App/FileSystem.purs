module SlamData.App.FileSystem (filesystem) where

  import React

  import SlamData.Helpers
  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  filesystem :: UI
  filesystem =
    panel [ tab { name: "File System"
                , content: [ D.text "The filesystem tree should be here." ]
                , active: true
                , external: []
                , internal: [ actionButton {tooltip: "New", icon: newIcon {}, click: pure {}}
                            , actionButton {tooltip: "Open", icon: openIcon {}, click: pure {}}
                            ]
                }
          ]
