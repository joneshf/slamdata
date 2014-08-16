module SlamData.App.Workspace.Notebook.Block
  ( block
  , BlockProps()
  , BlockState()
  ) where

  import Control.Lens ((^.), (..), (.~))

  import React (coerceThis, createClass, eventHandler, spec)
  import React.Types (Component(), ComponentClass(), ReactThis())

  import SlamData.Components (actionButton, closeIcon)
  import SlamData.Helpers (value)
  import SlamData.Lens
    ( _blockRec
    , _blockMode
    , _editContent
    , _evalContent
    , _ident
    , _notebookRec
    )
  import SlamData.Types (SlamDataEventTy(..), SlamDataRequest())
  import SlamData.Types.Workspace.Notebook (Notebook())
  import SlamData.Types.Workspace.Notebook.Block
    ( Block(..)
    , BlockID()
    , BlockMode(..)
    , BlockType(..)
    )

  import qualified React.DOM as D

  type BlockProps eff =
    { block      :: Block
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
  type BlockRowProps = {styles :: String}
  type BlockRowState = {}

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

  blockRow :: ComponentClass BlockRowProps BlockRowState
  blockRow = createClass spec
    { displayName = "BlockRow"
    , render = \this -> pure $ D.div {className: this.props.styles ++ " row"}
      case this.props.children of
        (l:r:_) -> [ D.div {className: "large-1  columns"} [l]
                   , D.div {className: "large-11 columns right-side"} [r]
                   ]
        [r]     -> [ D.div {className: "large-1  columns"} []
                   , D.div {className: "large-11 columns right-side"} [r]
                   ]
        []      -> []
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
  blockContent this = case this.props.block^._blockRec.._blockMode of
    Edit -> blockRow {styles: "block-content"}
      [D.div {}
        [D.textarea
          { autoFocus: "true"
          , className: "block-editor"
          , onBlur: eventHandler this \this _ ->
            let content = this.state.editContent
                block' = this.props.block # _blockRec.._editContent .~ content
            in this.props.request $
              EvalBlock this.props.notebook block'
          , onChange: eventHandler this \this e -> pure $
            this.setState this.state{editContent = value e.target}
          , onKeyUp: eventHandler this \this k ->
            if k.ctrlKey && k.key == "Enter" then
              let content = this.state.editContent
                  block' = this.props.block # _blockRec.._editContent .~ content
              in this.props.request $
                EvalBlock this.props.notebook block'
            else
              pure unit
          , value: this.state.editContent
          }
          []
        ]
      ]
    Eval -> blockRow {styles: "block-content"}
      [D.div { className: "evaled-block"
             , onClick: eventHandler this \this _ -> this.props.request $
                EditBlock this.props.notebook this.props.block
             }
        [D.span {dangerouslySetInnerHTML: {__html: this.props.block^._blockRec.._evalContent}}
          []
        ]
      ]

--   foreign import scu
--     "function scu(p, s) {\
--     \  return (!eqEditor(this.state.edit)(s.edit)) ||\
--     \         (!isEval(s.edit) && this.state.content !== s.content) ||\
--     \         (!eqBlockID(this.props.ident)(p.ident));\
--     \}" :: forall a. a

--   block :: forall eff state result extra. BlockProps eff state result extra -> UI
--   block =
--     mkUI spec{ getInitialState = pure {edit: Edit, content: ""}
--              , componentWillUpdate = mkFn2 cwu
--              , componentWillMount = cwm
--              , shouldComponentUpdate = scu
--              } do
--       state <- readState
--       props <- getProps
--       let content = state.content
--       let ty = props.blockType
--       pure $ D.div
--         [D.className "block"]
--         [ blockRow "block-toolbar toolbar" [blockType ty] [toolbar props]
--         , evalOrEdit state.edit props content
--         ]

--   cwm = do
--     props <- getProps
--     state <- readState
--     pure $ writeState state{content = props.content `getOrElse` ""}
--     pure {}

--   cwu :: forall eff state result a extra
--       .  BlockProps eff state result extra
--       -> BlockState
--       -> Eff a {}
--   cwu props state =
--     let rec = BlockSpec {blockType: props.blockType, content: Just $ state2Content state, ident: props.ident}
--         blocks = localGet Blocks
--         go (BlockSpec bs) = if bs.ident == props.ident then rec else BlockSpec bs
--         blocks' = go <$> blocks
--     in (pure $ localSet Blocks blocks') *> pure {}

--   evalOrEdit :: forall eff state result extra
--              .  Editor
--              -> BlockProps eff state result extra
--              -> String
--              -> UI
--   evalOrEdit _    p@{blockType=Visual}   = \s -> evalVisual s p
--   evalOrEdit Edit p                      = blockEditor
--   evalOrEdit Eval p@{blockType=Markdown} = \s -> evalMarkdown s {}
--   evalOrEdit Eval p@{blockType=SQL}      = \s -> evalSQL (deferred edit) s p

--   blockEditor :: String -> UI
--   blockEditor content = blockRow "block-content" []
--     [D.div'
--       [D.textarea [ D.autoFocus "true"
--                   , D.className "block-editor"
--                   , D.onBlur \_ -> eval
--                   , D.onChange $ \e -> do
--                       pure $ writeState {edit: Edit, content: e.target.value}
--                   , D.onKeyPress handleKeyPress
--                   , D.ref "editor"
--                   , D.value content
--                   ]
--                   []
--       ]
--     ]
