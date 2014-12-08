module SlamData.App.Workspace.Notebook.Block
  ( block
  , BlockProps()
  , BlockState()
  ) where

  import Browser.Navigator (Navigator(), navigator)

  import Control.Lens ((^.), (..), (.~), to)
  import Control.Monad (unless, when)

  import Data.Argonaut (jsonParser)
  import Data.Either (either)
  import Data.Function (mkFn3)
  import Data.String (toLower)

  import React (coerceThis, createClass, eventHandler, spec)
  import React.Reactable (defaultTableProps, table)
  import React.Types (Component(), ComponentClass(), ReactThis())

  import SlamData.App.Workspace.Notebook.Block.Common
    ( BlockRowProps()
    , BlockRowState()
    , blockRow
    )
  import SlamData.App.Workspace.Notebook.Block.Visual (visualEditor)
  import SlamData.Components
    ( actionButton
    , blockIcon
    , closeIcon
    , createBlockButton
    , runIcon
    )
  import SlamData.Helpers (contains, publish, value)
  import SlamData.Lens
    ( _blockMode
    , _blockRec
    , _blockType
    , _editContent
    , _evalContent
    , _ident
    , _label
    , _notebookRec
    , _dirty
    , _published
    )
  import SlamData.Types (SlamDataEventTy(..), SlamDataRequest())
  import SlamData.Types.Workspace.FileSystem (FileType())
  import SlamData.Types.Workspace.Notebook (Notebook(..))
  import SlamData.Types.Workspace.Notebook.Block
    ( Block(..)
    , BlockID()
    , BlockMode(..)
    , BlockType(..)
    )

  import qualified React.DOM as D

  type BlockProps eff =
    { files      :: FileType
    , block      :: Block
    -- This is needed so react doesn't try to outsmart itself
    -- http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
    , key        :: BlockID
    , notebook   :: Notebook
    , request    :: SlamDataRequest eff
    , index      :: Number
    }
  type BlockState =
    { editContent :: String
    , evalContent :: String
    }

  block :: forall eff. ComponentClass (BlockProps eff) BlockState
  block = createClass spec
    { displayName = "Block"
    , getInitialState = \this -> pure
      { editContent: this.props.block^._blockRec.._editContent
      , evalContent: this.props.block^._blockRec.._evalContent
      }
    , render = \this -> pure $ D.div {className: publish this.props.notebook}
      [ D.div {className: "block"}
        [ blockRow {styles: "block-toolbar toolbar"}
          [ typeName this.props.block
          , toolbar $ coerceThis this
          ]
        , if this.props.notebook^._notebookRec.._published then
            evaluatedBlock $ coerceThis this
          else
            blockContent $ coerceThis this
        ]
      , createBlockButton' $ coerceThis this
      ]
    }

  typeName :: Block -> Component
  typeName (Block b) = D.div {className: "block-type text-center"}
    [blockIcon b.blockType]

  toolbar :: forall eff fields
          .  ReactThis fields (BlockProps eff) BlockState
          -> Component
  toolbar this = D.div {className: "button-bar"}
    [ D.ul {className: "left button-group"}
      (internalActions this)
    , D.ul {className: "right button-group"}
      [actionButton
        this
        [DeleteBlock (this.props.notebook^._notebookRec.._ident)
                     (this.props.block^._blockRec.._ident)]
        "Close"
        closeIcon
      ]
    ]

  internalActions :: forall eff fields
                  .  ReactThis fields (BlockProps eff) BlockState
                  -> [Component]
  internalActions this = case this.props.block^._blockRec.._blockType of
    BlockType "SQL" ->
      let content = this.state.editContent
          block' = this.props.block # _blockRec.._editContent .~ content
      in [actionButton
           this
           [EvalBlock this.props.notebook block']
           "Run"
           runIcon
         ]
    _               -> []

  createBlockButton' :: forall eff fields
                     .  ReactThis fields (BlockProps eff) BlockState
                     -> Component
  createBlockButton' {props = p} =
    createBlockButton { request: p.request
                      , ident: p.notebook^._notebookRec.._ident
                      , index: p.index
                      }
      []

  blockContent :: forall eff fields
               .  ReactThis fields (BlockProps eff) BlockState
               -> Component
  blockContent this = case this.props.block^._blockRec of
    {blockType = BlockType "SQL"} ->
      blockRow {styles: "block-content block-SQL"}
        [ D.div {className: "block-label"}
          [formatLabel $ this.props.block^._blockRec.._label]
        , D.div {}
          [ sqlEditor this
          , evaluatedBlock' this
          ]
        ]
    {blockMode = BlockMode "Edit", blockType = BlockType "Visual"} ->
      visualEditor { block: this.props.block
                   , files: this.props.files
                   , notebook: this.props.notebook
                   , request: this.props.request
                   } []
    {blockMode = BlockMode "Edit"} -> blockEditor this
    {blockMode = BlockMode "Eval"} -> evaluatedBlock this

  blockEditor :: forall eff fields
              .  ReactThis fields (BlockProps eff) BlockState
              -> Component
  blockEditor this = blockRow {styles: "block-content"}
    [D.div {}
      [D.textarea
        { autoFocus: this.props.notebook^._notebookRec.._dirty
        , className: "block-editor"
        , onBlur: eventHandler this \this _ ->
          let content = this.state.editContent
              block' = this.props.block # _blockRec.._editContent .~ content
          in this.props.request $ EvalBlock this.props.notebook block'
        , onChange: eventHandler this \this e -> do
          pure $ this.setState this.state{editContent = value e.target}
          let nb = this.props.notebook^._notebookRec
          unless (nb.dirty) (this.props.request $ DirtyNotebook this.props.notebook)
        , onKeyDown: eventHandler this \this k -> when (evalKey k navigator) do
          let content = this.state.editContent
          let block' = this.props.block # _blockRec.._editContent .~ content
          this.props.request $ EvalBlock this.props.notebook block'
        , value: this.state.editContent
        }
        []
      ]
    ]

  sqlEditor :: forall eff fields
            .  ReactThis fields (BlockProps eff) BlockState
            -> Component
  sqlEditor this = D.div {className: "SQL-editor"}
    [D.textarea
      { autoFocus: this.props.notebook^._notebookRec.._dirty
      , className: "block-editor"
      , onChange: eventHandler this \this e -> do
        pure $ this.setState this.state{editContent = value e.target}
        let nb = this.props.notebook^._notebookRec
        unless (nb.dirty) (this.props.request $ DirtyNotebook this.props.notebook)
      , onKeyDown: eventHandler this \this k -> when (evalKey k navigator) do
        let content = this.state.editContent
        let block' = this.props.block # _blockRec.._editContent .~ content
        this.props.request $ EvalBlock this.props.notebook block'
      , value: this.state.editContent
      }
      []
    ]

  evalKey :: forall r
          .  {ctrlKey :: Boolean, key :: String, metaKey :: Boolean | r}
          -> Navigator
          -> Boolean
  evalKey k {platform = p}
    | isMac p   = k.metaKey && k.key == "Enter"
    | otherwise = k.ctrlKey && k.key == "Enter"

  isMac :: String -> Boolean
  isMac str = toLower str `contains` "mac"

  evaluatedBlock :: forall eff fields
                 .  ReactThis fields (BlockProps eff) BlockState
                 -> Component
  evaluatedBlock this = let blockRec = this.props.block^._blockRec in
    blockRow {styles: "block-content block-" ++ show blockRec.blockType}
      [ D.div {className: "block-label"}
        [formatLabel blockRec.label]
      , evaluatedBlock' this
      ]

  formatLabel :: String -> Component
  formatLabel "" = D.rawText ""
  formatLabel l  = D.rawText $ l ++ " :="

  evaluatedBlock' :: forall eff fields
                  .  ReactThis fields (BlockProps eff) BlockState
                  -> Component
  evaluatedBlock' this = if this.props.notebook^._notebookRec.._published then
      D.div {className: "published-block"}
        [evaluatedBlockContent this]
    else D.div { className: "evaled-block"
               , onClick: eventHandler this \this _ -> this.props.request $
                  EditBlock this.props.notebook this.props.block
               }
      [evaluatedBlockContent this]

  evaluatedBlockContent :: forall eff fields
                        .  ReactThis fields (BlockProps eff) BlockState
                        -> Component
  evaluatedBlockContent this = case this.props.block^._blockRec.._blockType of
    BlockType "Visual" ->
      D.div {id: this.props.block^._blockRec.._evalContent}
        []
    BlockType "SQL"    ->
      either
        (\_ -> D.rawText $ this.props.block^._blockRec.._evalContent)
        (\t -> table defaultTableProps{columns = [], "data" = t} [])
        (this.props.block^._blockRec.._evalContent..to jsonParser)
    _                  ->
      D.span {dangerouslySetInnerHTML: {__html: this.props.block^._blockRec.._evalContent}}
        []
