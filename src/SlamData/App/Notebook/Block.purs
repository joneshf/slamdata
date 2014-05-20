module SlamData.App.Notebook.Block
  ( block
  , BlockType(..)
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

  instance eqEditor :: Eq Editor where
    (==) Edit Edit = true
    (==) Eval Eval = true
    (==) _    _    = false

    (/=) e    e'   = not (e == e')

  instance showBlockType :: Show BlockType where
    show Markdown = "Markdown"
    show SQL = "SQL"

  block :: {blockType :: BlockType} -> UI
  block = mkUI spec {getInitialState = pure {edit: Edit, content: ""}} do
    state <- readState
    props <- getProps
    let ty = props.blockType
    let cont = state.content
    pure $ if state.edit == Edit
      then D.div'
        [ D.div [ D.className "block-toolbar" ]
            [ D.div [ D.className "large-1 columns" ] [blockType ty]
            , D.div [ D.className "large-11 columns" ]
                    [ toolbar ty
                    ]
            ]
        , blockEditor ty cont
        ]
      else
        evalMarkdown cont

  blockType :: BlockType -> UI
  blockType ty = D.h3'
    [ D.small' [ D.text $ show ty ]
    ]

  toolbar :: BlockType -> UI
  toolbar ty = D.div [ D.className "button-bar" ]
    [ D.ul [ D.className "left button-group" ] (specificButtons ty)
    , D.ul [ D.className "right button-group" ] standardButtons
    ]
    where
      standardButtons = [ actionButton {name: "X", click: pure {}} ]
      specificButtons Markdown = [ actionButton {name: "Preview", click: eval} ]
      specificButtons SQL      = [ actionButton {name: "Run", click: eval} ]

  eval ::forall attrs.
    EventHandlerContext (f :: ReadRefsEff { editor :: Component attrs {value :: String} })
                        {}
                        BlockState
                        (ReactStateRW BlockState BlockState)
  eval = do
    refs <- getRefs
    pure $ writeState {edit: Eval, content: (getDOMNode refs.editor).value}

  edit ::forall attrs eff.
    EventHandlerContext eff
                        {}
                        BlockState
                        (ReactStateRW BlockState BlockState)
  edit = do
    state <- readState
    pure $ writeState {edit: Edit, content: state.content}

  blockEditor :: BlockType -> String -> UI
  blockEditor _ content = D.div'
    [ D.textarea [ D.className "block-editor"
                 , D.ref "editor"
                 ]
                 [D.text content]
    ]

  evalMarkdown :: String -> UI
  evalMarkdown content = D.div
    [ D.className "evaled-block"
    , D.onClick $ \_ -> edit
    ]
    [ D.span [D.dangerouslySetInnerHTML $ makeHtml content] []
    ]
