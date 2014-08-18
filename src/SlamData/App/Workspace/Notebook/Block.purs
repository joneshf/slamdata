module SlamData.App.Workspace.Notebook.Block
  ( block
  , BlockProps()
  , BlockState()
  ) where

  import Control.Lens ((^.), (..), (.~))

  import React (coerceThis, createClass, eventHandler, spec)
  import React.Types (Component(), ComponentClass(), ReactThis())

  import SlamData.App.Workspace.Notebook.Block.Common
    ( BlockRowProps()
    , BlockRowState()
    , blockRow
    )
  import SlamData.App.Workspace.Notebook.Block.Visual (visualEditor)
  import SlamData.Components (actionButton, closeIcon)
  import SlamData.Helpers (value)
  import SlamData.Lens
    ( _blockMode
    , _blockRec
    , _blockType
    , _editContent
    , _evalContent
    , _ident
    , _notebookRec
    )
  import SlamData.Types (SlamDataEventTy(..), SlamDataRequest())
  import SlamData.Types.Workspace.FileSystem (FileType())
  import SlamData.Types.Workspace.Notebook (Notebook())
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
    , render = \this -> pure $ D.div {className: "block"}
      [ blockRow {styles: "block-toolbar toolbar"}
        [ typeName this.props.block
        , toolbar $ coerceThis this
        ]
      , blockContent $ coerceThis this
      ]
    }

  typeName :: Block -> Component
  typeName (Block b) = D.div {className: "block-type text-center"}
    [D.span {} [D.rawText $ show b.blockType]
    ]

  toolbar :: forall eff fields
          .  ReactThis fields (BlockProps eff) BlockState
          -> Component
  toolbar this = D.div {className: "button-bar"}
    [ D.ul {className: "left button-group"} []
    , D.ul {className: "right button-group"}
      [actionButton
        this
        (DeleteBlock (this.props.notebook^._notebookRec.._ident)
                     (this.props.block^._blockRec.._ident))
        "Close"
        closeIcon
      ]
    ]

  blockContent :: forall eff fields
               .  ReactThis fields (BlockProps eff) BlockState
               -> Component
  blockContent this = case this.props.block^._blockRec of
    {blockMode = Edit, blockType = Visual} ->
      visualEditor { block: this.props.block
                   , files: this.props.files
                   , notebook: this.props.notebook
                   , request: this.props.request
                   } []
    {blockMode = Edit}                     -> blockEditor this
    {blockMode = Eval, blockType = Visual} -> evaluatedVisualBlock this
    {blockMode = Eval}                     -> evaluatedBlock this

  blockEditor :: forall eff fields
              .  ReactThis fields (BlockProps eff) BlockState
              -> Component
  blockEditor this = blockRow {styles: "block-content"}
    [D.div {}
      [D.textarea
        { autoFocus: "true"
        , className: "block-editor"
        , onBlur: eventHandler this \this _ ->
          let content = this.state.editContent
              block' = this.props.block # _blockRec.._editContent .~ content
          in this.props.request $ EvalBlock this.props.notebook block'
        , onChange: eventHandler this \this e -> pure $
          this.setState this.state{editContent = value e.target}
        , onKeyUp: eventHandler this \this k ->
          if k.ctrlKey && k.key == "Enter" then
            let content = this.state.editContent
                block' = this.props.block # _blockRec.._editContent .~ content
            in this.props.request $ EvalBlock this.props.notebook block'
          else
            pure unit
        , value: this.state.editContent
        }
        []
      ]
    ]

  evaluatedBlock :: forall eff fields
                 .  ReactThis fields (BlockProps eff) BlockState
                 -> Component
  evaluatedBlock this = let blockRec = this.props.block^._blockRec in
    blockRow {styles: "block-content block-" ++ show blockRec.blockType}
      [D.div { className: "evaled-block"
             , onClick: eventHandler this \this _ -> this.props.request $
                EditBlock this.props.notebook this.props.block
             }
        [D.span {dangerouslySetInnerHTML: {__html: blockRec.evalContent}}
          []
        ]
      ]

  evaluatedVisualBlock :: forall eff fields
                       .  ReactThis fields (BlockProps eff) BlockState
                       -> Component
  evaluatedVisualBlock this = let blockRec = this.props.block^._blockRec in
    blockRow {styles: "block-content block-" ++ show blockRec.blockType}
      [D.div { className: "evaled-block"
             , onClick: eventHandler this \this _ -> this.props.request $
                EditBlock this.props.notebook this.props.block
             }
        [D.div {id: this.props.block^._blockRec.._evalContent}
          []
        ]
      ]
