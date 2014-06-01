module SlamData.App.Notebook.Block
  ( block
  , BlockType(..)
  , BlockProps(..)
  , BlockState(..)
  ) where

  import Control.Monad.Eff

  import Data.Tuple

  import React
  import Showdown

  import SlamData.Helpers
  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  data BlockType = Markdown | SQL
  data Editor = Edit | Eval

  type BlockState = { edit :: Editor, content :: String }
  type BlockProps eff state result =
    { blockType :: BlockType
    , index :: Number
    , close :: EventHandlerContext eff {} state result
    }

  instance eqEditor :: Eq Editor where
    (==) Edit Edit = true
    (==) Eval Eval = true
    (==) _    _    = false

    (/=) e    e'   = not (e == e')

  instance showBlockType :: Show BlockType where
    show Markdown = "Markdown"
    show SQL = "SQL"

  block :: forall eff state result. BlockProps eff state result -> UI
  block = mkUI spec { getInitialState = pure {edit: Edit, content: ""} } do
    state <- readState
    props <- getProps
    pure $ D.div' $
      [ blockRow "block-toolbar" [blockType props.blockType] [toolbar props]
      , blockRow "" [] [evalOrEdit state.edit $ state.content]
      ]

  blockRow :: String -> [UI] -> [UI] -> UI
  blockRow styles firstCol secondCol = D.div [D.className $ styles ++ " row"]
    [ D.div [D.className "large-1  columns"] firstCol
    , D.div [D.className "large-11 columns"] secondCol
    ]

  blockType :: BlockType -> UI
  blockType ty = D.h3'
    [ D.small' [ D.text $ show ty ]
    ]

  toolbar :: forall eff state result. BlockProps eff state result -> UI
  toolbar = mkUI spec do
    props <- getProps
    pure $ D.div [ D.className "button-bar" ]
      [ D.ul [ D.className "left button-group" ] (specificButtons props.blockType)
      , D.ul [ D.className "right button-group" ]
             [ actionButton {name: "X", click: props.close} ]
      ]
      where
        specificButtons Markdown = []
        specificButtons SQL      = []

  eval ::forall attrs.
    EventHandlerContext (f :: ReadRefsEff { editor :: Component attrs {value :: String} })
                        {}
                        BlockState
                        (ReactStateRW BlockState BlockState)
  eval = do
    refs <- getRefs
    pure $ writeState {edit: Eval, content: (getDOMNode refs.editor).value}

  edit ::forall attrs.
    EventHandlerContext (f :: ReadRefsEff { editor :: Component attrs {value :: String} }) -- Not sure why psc can't infer this with a type variable.
                        {}
                        BlockState
                        (ReactStateRW BlockState BlockState)
  edit = do
    state <- readState
    pure $ writeState {edit: Edit, content: state.content}

  evalOrEdit :: Editor -> (String -> UI)
  evalOrEdit Edit = blockEditor
  evalOrEdit Eval = evalMarkdown

  blockEditor :: String -> UI
  blockEditor content = D.div'
    [ D.textarea [ D.autoFocus "true"
                 , D.className "block-editor"
                 , D.onBlur \_ -> eval
                 , D.onChange $ \e ->
                    pure $ writeState {edit: Edit, content: e.target.value}
                 , D.onKeyPress handleKeyPress
                 , D.ref "editor"
                 , D.value content
                 ]
                 []
    ]

  evalMarkdown :: String -> UI
  evalMarkdown content = D.div
    [ D.className "evaled-block"
    , D.onClick \_ -> edit
    ]
    [ D.span [D.dangerouslySetInnerHTML $ makeHtml content] []
    ]

  handleKeyPress k = do
    if (k.ctrlKey && k.keyCode == 13) || k.keyCode == 10
      then eval
      else edit

  foreign import focus
    "function focus(x) {\
    \  return x.focus();\
    \}" :: forall a b. a -> b
