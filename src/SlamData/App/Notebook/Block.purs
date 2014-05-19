module SlamData.App.Notebook.Block
  ( block
  , Block()
  , BlockType(..)
  ) where

  import Data.Tuple

  import React
  import Showdown

  import SlamData.Helpers
  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  type Block = { blockType :: BlockType
               , content :: String
               , editor :: Editor
               }
  data BlockType = Markdown | SQL
  data Editor = Edit | Eval

  instance eqEditor :: Eq Editor where
    (==) Edit Edit = true
    (==) Eval Eval = true
    (==) _    _    = false

    (/=) e    e'   = not (e == e')

  instance showBlockType :: Show BlockType where
    show Markdown = "Markdown"
    show SQL = "SQL"

  -- block :: forall props. {| props} -> UI
  -- block {blockType = ty, content = cont} = D.div'
  block = mkUI spec {getInitialState = pure {edit: Edit}} do
    state <- readState
    props <- getProps
    let ty = props.blockType
    let cont = props.content
    if state.edit == Edit then
      pure $ [ D.div [ D.className "block-toolbar" ] $
                 [ D.div [ D.className "large-1 columns" ] [blockType ty]
                 , D.div [ D.className "large-11 columns" ]
                         [ toolbar ty
                         ]
                 ]
             , blockEditor ty cont
             ]
      else
    -- block {blockType = Markdown, content = cont} =
        pure $ D.div [D.dangerouslySetInnerHTML $ makeHtml cont] []

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
      specificButtons Markdown = [ actionButton {name: "Preview", click: pure {}} ]
      specificButtons SQL      = [ actionButton {name: "Run", click: pure {}} ]

  blockEditor :: BlockType -> String -> UI
  blockEditor _ content = D.div'
    [ D.textarea [ D.className "block-editor" ] [D.text content]
    ]
