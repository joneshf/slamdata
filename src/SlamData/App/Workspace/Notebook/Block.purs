module SlamData.App.Workspace.Notebook.Block
  ( block
  , BlockProps()
  , BlockState()
  ) where

  import Control.Lens ((^.), (..))

  import React (coerceThis, createClass, spec)
  import React.Types (Component(), ComponentClass(), ReactThis())

  import SlamData.Components (actionButton, closeIcon)
  import SlamData.Lens (_blockRec, _ident)
  import SlamData.Types (SlamDataEventTy(..), SlamDataRequest())
  import SlamData.Types.Workspace.Notebook (NotebookID())
  import SlamData.Types.Workspace.Notebook.Block (Block(..), BlockType(..))

  import qualified React.DOM as D

  type BlockProps eff =
    { block      :: Block
    , notebookID :: NotebookID
    , request    :: SlamDataRequest eff
    }
  type BlockState = {}
  type BlockRowProps = {styles :: String}
  type BlockRowState = {}

  block :: forall eff. ComponentClass (BlockProps eff) BlockState
  block = createClass spec
    { displayName = "Block"
    , render = \this -> pure $ D.div {className: "block"}
      [ blockRow {styles: "block-toolbar toolbar"}
        [ typeName this.props.block
        , toolbar $ coerceThis this
        ]
      , blockContent this.props.block
      ]
    }

  blockRow :: ComponentClass BlockRowProps BlockRowState
  blockRow = createClass spec
    { displayName = "BlockRow"
    , render = \this -> pure $ D.div {className: this.props.styles ++ " row"}
      case this.props.children of
        (l:r:_) -> [ D.div {className: "large-1  columns"} [l]
                   , D.div {className: "large-11 columns"} [r]
                   ]
        [r]     -> [ D.div {className: "large-1  columns"} []
                   , D.div {className: "large-11 columns"} [r]
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
        (DeleteBlock this.props.notebookID $ this.props.block^._blockRec.._ident)
        closeIcon
      ]
    ]

  blockContent :: Block -> Component
  blockContent (Block b) = blockRow {styles: "block-content"}
    [D.div {}
      [D.textarea { autoFocus: "true"
                  , className: "block-editor"
                  -- , onBlur: \_ -> eval
                  -- , onChange: $ \e -> do
                  --     pure $ writeState {edit: Edit, content: e.target.value}
                  -- , onKeyPress: handleKeyPress
                  , ref: "editor"
                  , value: b.content
                  }
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

--   handleKeyPress k = do
--     if (k.ctrlKey && k.keyCode == 13) || k.keyCode == 10
--       then eval
--       else edit
