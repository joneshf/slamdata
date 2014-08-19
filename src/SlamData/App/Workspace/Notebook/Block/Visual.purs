module SlamData.App.Workspace.Notebook.Block.Visual
  ( visualEditor
  , VisualProps()
  , VisualState()
  , VisualTab(..)
  ) where

  import Control.Lens ((^.), (..), (%~))
  import Control.Bind ((=<<))
  import Control.Monad.Eff (Eff())

  import Data.Array (snoc, sort)
  import Data.Array.Unsafe (head, tail)
  import Data.Maybe (maybe, Maybe(..))
  import Data.String (charAt, joinWith, length)
  import Data.Tuple (Tuple(..))

  import Graphics.C3 (C3Type(..))

  import React (coerceThis, createClass, eventHandler, spec)
  import React.TreeView (treeView)
  import React.Types
    ( Component()
    , ComponentClass()
    , ReactSyntheticEvent()
    , ReactThis()
    )

  import SlamData.App.Workspace.Notebook.Block.Common (blockRow)
  import SlamData.Components
    ( barChartIcon
    , lineChartIcon
    , pieChartIcon
    )
  import SlamData.Helpers (activate, checked, selectedOptgroup, value)
  import SlamData.Lens (_children, _fileTypeRec, _name)
  import SlamData.Types
    ( SlamDataEventTy(..)
    , SlamDataRequest()
    , SlamDataRequestEff()
    )
  import SlamData.Types.Workspace.FileSystem (FileType(..))
  import SlamData.Types.Workspace.Notebook (Notebook())
  import SlamData.Types.Workspace.Notebook.Block (Block())
  import SlamData.Types.Workspace.Notebook.Block.Visual (VisualData(..))

  import qualified React.DOM as D
  import qualified Data.Map as M
  import qualified Data.Set as S

  data VisualTab = FieldsTab
                 | VisualTypeTab

  data VisualType = VisualBar
                  | VisualLine
                  | VisualPie

  instance eqVisualTab :: Eq VisualTab where
    (==) FieldsTab     FieldsTab     = true
    (==) VisualTypeTab VisualTypeTab = true
    (==) _             _             = false
    (/=) vt vt' = not (vt == vt')

  instance showVisualTab :: Show VisualTab where
    show FieldsTab     = "Fields"
    show VisualTypeTab = "Type"

  type VisualProps eff =
    { block    :: Block
    , files    :: FileType
    , notebook :: Notebook
    , request  :: SlamDataRequest eff
    }
  type VisualState =
    { active         :: VisualTab
    , fields         :: M.Map String (S.Set String)
    , selectedFields :: M.Map String (S.Set String)
    , visual         :: C3Type
    }
  type VisualTreeProps eff fields =
    { files      :: FileType
    , path       :: [String]
    , request    :: SlamDataRequest eff
    , visualThis :: ReactThis fields (VisualProps eff) VisualState
    }
  type VisualTreeState =
    { collapsed :: Boolean
    }

  visualEditor :: forall eff. ComponentClass (VisualProps eff) VisualState
  visualEditor = createClass spec
    { displayName = "VisualEditor"
    , getInitialState = \_ -> pure
      { active: FieldsTab
      , fields: M.empty
      , selectedFields: M.empty
      , visual: Line
      }
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
      [reify { files: this.props.files
             , request: this.props.request
             , path: []
             , visualThis: this
             }
        []
      ]
    , D.div {className: "content" ++ activate VisualTypeTab this.state.active}
      [ D.ul {className: "chart-type small-block-grid-5"}
        (visual this <$> [Bar, Line, Pie])
      , selectFields this
      , selectFields this
      , selectFields this
      , D.div {className: "actions"}
        [ D.a { className: "tiny button"
              , onClick: eventHandler this \this _ -> this.props.request $
                EvalVisual this.props.notebook
                           this.props.block
                           (createData this.state)
              }
          [D.rawText "Create"]
        ]
      ]
    ]

  createData :: VisualState -> [VisualData]
  createData {selectedFields = fs, visual = v} =
    (\(Tuple p f) -> VisualData {fields: S.toList f, path: p, "type": v}) <$> M.toList fs

  reify :: forall eff fields
        . ComponentClass (VisualTreeProps eff fields) VisualTreeState
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
            (reifyField this.props.visualThis path <$> children)
        (FileType {"type" = "directory", name = n, children = c}) -> pure $
          treeView
            { collapsed: this.state.collapsed
            , defaultCollapsed: true
            , nodeLabel: D.span
               {onClick: eventHandler (coerceThis this) (toggleTree $ ReadFileSystem path')}
               [D.rawText name]
            , onClick: eventHandler (coerceThis this) (toggleTree $ ReadFileSystem path')
            }
            ((\f -> reify {files: f, request: req, path: path, visualThis: this.props.visualThis} []) <$> children)
    }

  toggleTree :: forall fields fields' eff event
             .  SlamDataEventTy
             -> ReactThis fields (VisualTreeProps eff fields') VisualTreeState
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

  reifyField :: forall eff fields
             .  ReactThis fields (VisualProps eff) VisualState
             -> [String]
             -> FileType
             -> Component
  reifyField this path (FileType {name = n}) = D.div {className: "visual-field"}
    [ D.input { onClick: eventHandler this \this e -> do
                let path' = tail path
                let root = head path
                let field = root ++ joinWith "/" path'
                let fields = if checked e.target then
                        -- Lack of inference is killer here.
                        M.alter (maybe (Just $ S.singleton n) (S.insert n >>> Just)) field this.state.fields
                      else
                        M.alter ((<$>) (S.delete n)) field this.state.fields
                pure $ this.setState this.state{fields = fields}
              , "type": "checkbox"
              }
      []
    , D.rawText n
    ]

  visual :: forall eff fields
         .  ReactThis fields (VisualProps eff) VisualState
         -> C3Type
         -> Component
  visual this ty =
    D.li { onClick: eventHandler this \this _ -> pure $
            this.setState this.state{visual = ty}
         , className: activate ty this.state.visual
         }
      [ D.a {} [visualIcon ty]
      , D.span {} [D.rawText $ show ty]
      ]

  visualIcon :: C3Type -> Component
  visualIcon Bar  = barChartIcon
  visualIcon Line = lineChartIcon
  visualIcon Pie  = pieChartIcon

  optionify :: Tuple String (S.Set String) -> Component
  optionify (Tuple path fields) = D.optgroup {label: path}
    ((\f -> D.option {value: f} [D.rawText f]) <$> S.toList fields)

  placeholder :: Component
  placeholder = D.option {disabled: true, selected: true, value: ""}
    [D.rawText "Select a field"]

  selectFields :: forall eff fields
               .  ReactThis fields (VisualProps eff) VisualState
               -> Component
  selectFields this =
    D.select {onChange: eventHandler this \this e -> do
                let path = selectedOptgroup e.target
                let field = value e.target
                -- let selected = M.insert path (S.singleton field) this.state.selectedFields
                let selected = M.alter (maybe (Just $ S.singleton field) (S.insert field >>> Just)) path this.state.selectedFields
                pure $ this.setState this.state{selectedFields = selected}
             }
      (placeholder:(optionify <$> M.toList this.state.fields))
