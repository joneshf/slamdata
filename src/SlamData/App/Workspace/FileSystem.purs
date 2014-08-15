module SlamData.App.Workspace.FileSystem
  ( filesystem
  , FileSystemProps()
  , FileSystemState()
  ) where

  import Data.Function (mkFn3)

  import React (createClass, spec)
  import React.Types (Component(), ComponentClass())

  import SlamData.Components (dirOpenIcon, fileIcon)
  import SlamData.Types.Workspace.FileSystem (FileType(..), FileTypeRec())

  import qualified React.DOM as D

  type FileSystemProps = {files :: [FileType]}
  type FileSystemState = {}

  filesystem :: ComponentClass FileSystemProps FileSystemState
  filesystem = createClass spec
    { displayName = "FileSystem"
    , shouldComponentUpdate = mkFn3 \this props _ -> pure $
      this.props.files /= props.files
    , render = \this -> pure $ D.div {className: "slamdata-panel"}
      [fsTab, fsContent this.props.files]
    }

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
