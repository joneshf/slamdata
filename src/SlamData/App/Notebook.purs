module SlamData.App.Notebook (notebook) where

  import Control.Monad.Eff

  import React

  import SlamData.Helpers
  import SlamData.App.Notebook.Block
  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  notebook :: UI
  notebook = nbPanel {}

  nbPanel :: {} -> UI
  nbPanel = mkUI spec { getInitialState = pure { content: [{blockType: Markdown, content: "### Wat\n1. Does this work?\n1. Sure"}] } } do
    state <- readState
    pure $ panel [ tab { name: "Untitled Notebook"
                       , content: renderBlock <$> state.content
                       , external: [ actionButton {name: "Save", click: pure {}}
                                   , actionButton {name: "Publish", click: pure {}}
                                   ]
                       , internal: [ actionBlock Markdown
                                   , actionBlock SQL
                                   ]
                       , active: true
                       }
                 , tab { name: "+"
                       , content: []
                       , external: []
                       , internal: []
                       , active: false
                       }
                 ]
    where
      actionBlock ty = D.li'
        [ D.button [ D.className "tiny secondary button"
                   , D.onClick $ \_ -> addBlock ty
                   ]
                   [ D.text $ show ty ]
        ]
      addBlock ty = do
        state <- readState
        pure $ writeState {content: {blockType: ty, content: ""}:state.content}
      renderBlock {blockType = ty, content = c} =
        block {blockType: ty, content: c}
