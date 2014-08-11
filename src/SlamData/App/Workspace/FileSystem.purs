module SlamData.App.Workspace.FileSystem (filesystem) where

  import React.Types (Component())

  import SlamData.Components (dirOpenIcon, fileIcon)
  import SlamData.Types (FileType(..), FileTypeRec())

  import qualified React.DOM as D

  filesystem :: [FileType] -> Component
  filesystem files = D.div {className: "slamdata-panel"}
    [fsTab, fsContent files]

  fsTab :: Component
  fsTab = D.dl {className: "tabs", "data-tab": "true"}
    [D.dd {className: "tab active"}
      [D.a {} [D.rawText "FileSystem"]]
    ]

  fsContent :: [FileType] -> Component
  fsContent files = D.div {className: "tabs-content"}
    [D.div {className: "content active"}
      [ D.div {className: "toolbar button-bar"}
        [ D.ul {className: "button-group"} []
        , D.ul {className: "button-group"} []
        ]
      , D.hr {} []
      , D.div {className: "actual-content"}
        ((\(FileType f) -> reify f) <$> files)
      ]
    ]

  reify :: FileTypeRec -> Component
  reify {"type" = "directory", name = n} = D.ul {} [dirOpenIcon, D.rawText n]
  reify {"type" = "file",      name = n} = D.ul {} [fileIcon,    D.rawText n]
  reify _                                = D.ul {} []
