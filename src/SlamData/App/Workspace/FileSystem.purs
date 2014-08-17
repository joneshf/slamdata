module SlamData.App.Workspace.FileSystem
  ( filesystem
  , FileSystemProps()
  , FileSystemState()
  ) where

  import Control.Lens ((^.), (..))
  import Control.Monad.Eff (Eff())

  import Data.Array (snoc, sort)
  import Data.Function (mkFn3)
  import Data.String (charAt, length)

  import React (coerceThis, createClass, eventHandler, spec)
  import React.TreeView (treeView)
  import React.Types
    ( Component()
    , ComponentClass()
    , ReactSyntheticEvent()
    , ReactThis()
    )

  import SlamData.Components (dirOpenIcon, fileIcon)
  import SlamData.Lens (_children, _fileTypeRec, _name)
  import SlamData.Types (SlamDataEventTy(..), SlamDataRequest(), SlamDataRequestEff())
  import SlamData.Types.Workspace.FileSystem (FileType(..), FileTypeRec())

  import qualified React.DOM as D

  type FileSystemProps eff =
    { files :: FileType
    , request :: SlamDataRequest eff
    }
  type FileSystemState = {}
  type FileSystemTreeProps eff =
    { files :: FileType
    , path :: [String]
    , request :: SlamDataRequest eff
    }
  type FileSystemTreeState =
    {collapsed :: Boolean}

  filesystem :: forall eff. ComponentClass (FileSystemProps eff) FileSystemState
  filesystem = createClass spec
    { displayName = "FileSystem"
    , shouldComponentUpdate = mkFn3 \this props _ -> pure $
      this.props.files /= props.files
    , render = \this -> pure $ D.div {className: "slamdata-panel"}
      [fsTab, fsContent this.props.files this.props.request]
    }

  fsTab :: Component
  fsTab = D.dl {className: "tabs", "data-tab": "true"}
    [D.dd {className: "tab active"}
      [D.a {} [D.rawText "FileSystem"]]
    ]

  fsContent :: forall eff. FileType -> SlamDataRequest eff -> Component
  fsContent files request = D.div {className: "tabs-content"}
    [D.div {className: "content active"}
      [ D.div {className: "toolbar button-bar"}
        [ D.ul {className: "button-group"} []
        , D.ul {className: "button-group"} []
        ]
      , D.hr {} []
      , D.div {className: "actual-content"}
        [reify {files: files, request: request, path: []} []]
      ]
    ]

  reify :: forall eff. ComponentClass (FileSystemTreeProps eff) FileSystemTreeState
  reify = createClass spec
    { displayName = "FileSystemTree"
    , getInitialState = \_ -> pure {collapsed: true}
    , render = \this -> case this.props.files of
      (FileType {"type" = "file", name = n}) -> pure $ D.div {} [D.rawText n]
      (FileType {"type" = "directory", name = n, children = c}) -> do
        let name = this.props.files^._fileTypeRec.._name
        let path = this.props.path `snoc` name
        let children = sort (this.props.files^._fileTypeRec.._children)
        let req = this.props.request
        pure $ treeView
          { collapsed: this.state.collapsed
          , defaultCollapsed: true
          , nodeLabel: D.span
             {onClick: eventHandler (coerceThis this) toggleTree}
             [D.rawText name]
          , onClick: eventHandler (coerceThis this) toggleTree
          }
          ((\f -> reify {files: f, request: req, path: path} []) <$> children)
    }

  toggleTree :: forall fields eff eff' event
             .  ReactThis fields (FileSystemTreeProps eff) FileSystemTreeState
             -> ReactSyntheticEvent event
             -> Eff (SlamDataRequestEff eff) Unit
  toggleTree this _ =
    let name = this.props.files^._fileTypeRec.._name
        path = this.props.path `snoc` (name ++ "/")
        -- joinedPath = if path == [] then "" else joinWith "/" path
        -- joined = joinedPath ++ (this.props.files^._fileTypeRec.._name) ++ "/"
    in if this.state.collapsed then do
      this.props.request $ ReadFileSystem path
      pure $ this.setState {collapsed: not this.state.collapsed}
    else
      pure $ this.setState {collapsed: not this.state.collapsed}
