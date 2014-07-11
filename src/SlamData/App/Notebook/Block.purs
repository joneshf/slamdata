module SlamData.App.Notebook.Block (block) where

  import Control.Apply
  import Control.Monad.Eff

  import Data.Array
  import Data.Foldable
  import Data.Function
  import Data.Maybe

  import React

  import SlamData.App.Notebook.Block.Common
  import SlamData.App.Notebook.Block.Markdown
  import SlamData.App.Notebook.Block.SQL
  import SlamData.App.Notebook.Block.Visual
  import SlamData.App.Notebook.Block.Types
  import SlamData.Helpers

  import qualified Graphics.C3 as C3
  import qualified React.DOM as D
  import qualified Browser.WebStorage as WS

  isEval :: Editor -> Boolean
  isEval Eval = true
  isEval _    = false

  eqEditor :: Editor -> Editor -> Boolean
  eqEditor ed ed' = ed == ed'

  eqBlockID :: BlockID -> BlockID -> Boolean
  eqBlockID ident ident' = ident == ident'

  foreign import scu
    "function scu(p, s) {\
    \  return (!eqEditor(this.state.edit)(s.edit)) ||\
    \         (!isEval(s.edit) && this.state.content !== s.content) ||\
    \         (!eqBlockID(this.props.ident)(p.ident));\
    \}" :: forall a. a

  block :: forall eff state result extra. BlockProps eff state result extra -> UI
  block =
    mkUI spec{ getInitialState = pure {edit: Edit, content: ""}
             , componentWillUpdate = mkFn2 cwu
             , componentWillMount = cwm
             , shouldComponentUpdate = scu
             } do
      state <- readState
      props <- getProps
      let content = state.content
      let ty = props.blockType
      pure $ D.div
        [D.className "block"]
        [ blockRow "block-toolbar toolbar" [blockType ty] [toolbar props]
        , evalOrEdit state.edit props content
        ]

  cwm = do
    props <- getProps
    state <- readState
    pure $ writeState state{content = props.content `getOrElse` ""}
    pure {}

  cwu :: forall eff state result a extra
      .  BlockProps eff state result extra
      -> BlockState
      -> Eff a {}
  cwu props state =
    let rec = BlockSpec {blockType: props.blockType, content: Just $ state2Content state, ident: props.ident}
        blocks = localGet Blocks
        go (BlockSpec bs) = if bs.ident == props.ident then rec else BlockSpec bs
        blocks' = go <$> blocks
    in (pure $ localSet Blocks blocks') *> pure {}

  foreign import state2Content
    "function state2Content(state) {\
    \  return state.content;\
    \}" :: BlockState -> String

  blockType :: BlockType -> UI
  blockType ty = D.div
    [D.className "block-type text-center"]
    [D.span [D.className ""]
        [D.text $ show ty]
    ]

  toolbar :: forall eff state result extra
          .  BlockProps eff state result extra
          -> UI
  toolbar = mkUI spec do
    props <- getProps
    pure $ D.div
      [ D.className "button-bar" ]
      [ D.ul [D.className "left button-group"] (specificButtons props.blockType)
      , D.ul [D.className "right button-group"]
             [actionButton  { tooltip: "Close"
                            , icon: closeIcon {}
                            , click: props.close
                            }
             ]
      ]
      where
        specificButtons Markdown = []
        specificButtons SQL      = []
        specificButtons Visual   = []

  evalOrEdit :: forall eff state result extra
             .  Editor
             -> BlockProps eff state result extra
             -> String
             -> UI
  evalOrEdit _    p@{blockType=Visual}   = \s -> evalVisual s (injectC3Options p)
  evalOrEdit Edit p                      = blockEditor
  evalOrEdit Eval p@{blockType=Markdown} = \s -> evalMarkdown s {}
  evalOrEdit Eval p@{blockType=SQL}      = \s -> evalSQL (deferred edit) s p

  blockEditor :: String -> UI
  blockEditor content = blockRow "block-content" []
    [D.div'
      [D.textarea [ D.autoFocus "true"
                  , D.className "block-editor"
                  , D.onBlur \_ -> eval
                  , D.onChange $ \e -> do
                      pure $ writeState {edit: Edit, content: e.target.value}
                  , D.onKeyPress handleKeyPress
                  , D.ref "editor"
                  , D.value content
                  ]
                  []
      ]
    ]

  injectC3Options o =
    { blockType: o.blockType
    , ident: o.ident
    , index: o.index
    , close: o.close
    , content: o.content
    , options: C3.options
    }

  handleKeyPress k = do
    if (k.ctrlKey && k.keyCode == 13) || k.keyCode == 10
      then eval
      else edit
