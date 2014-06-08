module SlamData.App.Notebook.Block
  ( block
  ) where

  import Control.Monad.Eff

  import Data.Maybe
  import Data.Tuple

  import React
  import Showdown

  import SlamData.Helpers
  import SlamData.App.Notebook.Block.Common
  import SlamData.App.Notebook.Block.Markdown
  import SlamData.App.Notebook.Block.SQL
  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  block :: forall eff state result. BlockProps eff state result -> UI
  block = mkUI spec { getInitialState = pure {edit: Edit, content: ""} } do
    state <- readState
    props <- getProps
    let content = maybe state.content id props.content
    let ty = props.blockType
    pure $ D.div [D.className "block"] $
      [ blockRow "block-toolbar toolbar" [blockType ty] [toolbar props]
      , blockRow "block-content" [] [evalOrEdit state.edit ty content]
      ]

  blockRow :: String -> [UI] -> [UI] -> UI
  blockRow styles firstCol secondCol =
    D.div [D.className $ styles ++ " row"]
          [ D.div [D.className "large-1  columns"] firstCol
          , D.div [D.className "large-11 columns right-side"] secondCol
          ]

  blockType :: BlockType -> UI
  blockType ty = D.div [D.className "block-type text-center"]
    [ D.span [D.className ""]
        [D.text $ show ty]
    ]

  toolbar :: forall eff state result. BlockProps eff state result -> UI
  toolbar = mkUI spec do
    props <- getProps
    pure $ D.div [ D.className "button-bar" ]
      [ D.ul [ D.className "left button-group" ] (specificButtons props.blockType)
      , D.ul [ D.className "right button-group" ]
             [ actionButton { tooltip: "Close"
                            , icon: closeIcon {}
                            , click: props.close
                            }
             ]
      ]
      where
        specificButtons Markdown = []
        specificButtons SQL      = []

  evalOrEdit :: Editor -> BlockType -> String -> UI
  evalOrEdit Edit _ = blockEditor
  evalOrEdit Eval Markdown = evalMarkdown
  evalOrEdit Eval SQL      = evalSQL

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

  handleKeyPress k = do
    if (k.ctrlKey && k.keyCode == 13) || k.keyCode == 10
      then eval
      else edit
