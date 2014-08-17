module SlamData.App.Workspace.Notebook.Block.Visual
  ( visualEditor
  , VisualProps()
  , VisualState()
  , VisualTab(..)
  ) where

  import Control.Lens ((^.), (..))
  import Control.Monad.Eff (Eff())

  import Data.Array (snoc, sort)
  import Data.String (charAt, joinWith, length)

  import React (coerceThis, createClass, eventHandler, spec)
  import React.TreeView (treeView)
  import React.Types
    ( Component()
    , ComponentClass()
    , ReactSyntheticEvent()
    , ReactThis()
    )

  import SlamData.App.Workspace.Notebook.Block.Common (blockRow)
  import SlamData.Helpers (activate)
  import SlamData.Lens (_children, _fileTypeRec, _name)
  import SlamData.Types
    ( SlamDataEventTy(..)
    , SlamDataRequest()
    , SlamDataRequestEff()
    )
  import SlamData.Types.Workspace.FileSystem (FileType(..))

  import qualified React.DOM as D

  data VisualTab = FieldsTab
                 | VisualTypeTab

  instance eqVisualTab :: Eq VisualTab where
    (==) FieldsTab     FieldsTab     = true
    (==) VisualTypeTab VisualTypeTab = true
    (==) _             _             = false
    (/=) vt vt' = not (vt == vt')

  instance showVisualTab :: Show VisualTab where
    show FieldsTab     = "Fields"
    show VisualTypeTab = "Type"

  type VisualProps eff =
    { files   :: FileType
    , request :: SlamDataRequest eff
    }
  type VisualState =
    { active :: VisualTab
    }
  type VisualTreeProps eff =
    { files   :: FileType
    , path    :: [String]
    , request :: SlamDataRequest eff
    }
  type VisualTreeState =
    { collapsed :: Boolean
    }

  visualEditor :: forall eff. ComponentClass (VisualProps eff) VisualState
  visualEditor = createClass spec
    { displayName = "VisualEditor"
    , getInitialState = \_ -> pure {active: FieldsTab}
    , render = \this -> pure $
      blockRow {styles: "block-content edit-visual"}
        [ visualTabs $ coerceThis this
        , visualEditorContent $ coerceThis this
        ]
    }

  visualTabs :: forall eff fields
             .  ReactThis fields (VisualProps eff) VisualState
             -> Component
  visualTabs this = D.dl {className: "tabs vertical"}
    (visualTab this <$> [FieldsTab, VisualTypeTab])

  visualTab :: forall eff fields
            .  ReactThis fields (VisualProps eff) VisualState
            -> VisualTab
            -> Component
  visualTab this tab =
    D.dd { className: "tab" ++ activate tab this.state.active
         , onClick: eventHandler this \this _ -> pure $
           this.setState this.state{active = tab}
         }
      [D.a {} [D.rawText $ show tab]]

  visualEditorContent :: forall eff fields
                      .  ReactThis fields (VisualProps eff) VisualState
                      -> Component
  visualEditorContent this = D.div {className: "tabs-content vertical"}
    [ D.ul {className: "content" ++ activate FieldsTab this.state.active}
      [reify {files: this.props.files, request: this.props.request, path: []} []]
    , D.div {className: "content" ++ activate VisualTypeTab this.state.active}
      [ D.ul {className: "chart-type small-block-grid-5"}
        []
      , D.select {}
        []
      , D.div {className: "actions"}
        [ D.a {className: "tiny button"}
          [D.rawText "Create"]
        ]
      ]
    ]

  reify :: forall eff. ComponentClass (VisualTreeProps eff) VisualTreeState
  reify = createClass spec
    { displayName = "FieldsTree"
    , getInitialState = \_ -> pure {collapsed: true}
    , render = \this ->
      let name = this.props.files^._fileTypeRec.._name
          path = this.props.path `snoc` name
          path' = this.props.path `snoc` (name ++ "/")
          children = sort (this.props.files^._fileTypeRec.._children)
          req = this.props.request
      in case this.props.files of
        (FileType {"type" = "file", name = n}) -> pure $
          treeView
            { collapsed: this.state.collapsed
            , defaultCollapsed: true
            , nodeLabel: D.span
               {onClick: eventHandler (coerceThis this) (toggleTree $ ReadFields path)}
               [D.rawText name]
            , onClick: eventHandler (coerceThis this) (toggleTree $ ReadFields path)
            }
            (reifyField <$> children)
        (FileType {"type" = "directory", name = n, children = c}) -> pure $
          treeView
            { collapsed: this.state.collapsed
            , defaultCollapsed: true
            , nodeLabel: D.span
               {onClick: eventHandler (coerceThis this) (toggleTree $ ReadFileSystem path')}
               [D.rawText name]
            , onClick: eventHandler (coerceThis this) (toggleTree $ ReadFileSystem path')
            }
            ((\f -> reify {files: f, request: req, path: path} []) <$> children)
    }

  toggleTree :: forall fields eff event
             .  SlamDataEventTy
             -> ReactThis fields (VisualTreeProps eff) VisualTreeState
             -> ReactSyntheticEvent event
             -> Eff (SlamDataRequestEff eff) Unit
  toggleTree event this _ =
    let name = this.props.files^._fileTypeRec.._name
        path = this.props.path `snoc` (name ++ "/")
    in if this.state.collapsed then do
      this.props.request event
      pure $ this.setState {collapsed: not this.state.collapsed}
    else
      pure $ this.setState {collapsed: not this.state.collapsed}

  reifyField :: FileType -> Component
  reifyField (FileType {name = n}) = D.div {className: "visual-field"}
    [ D.input {"type": "checkbox"} []
    , D.rawText n
    ]
