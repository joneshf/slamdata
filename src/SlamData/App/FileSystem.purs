module SlamData.App.FileSystem (filesystem) where

  import React

  import SlamData.App.Panel
  import SlamData.App.Panel.Widget

  import qualified React.DOM as D

  filesystem :: UI
  filesystem = panel { widgets: [ widget { name: "File System"
                                         , content: "This is some content like crazy."
                                         }
                                ]
                     }
