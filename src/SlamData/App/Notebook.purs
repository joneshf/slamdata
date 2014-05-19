module SlamData.App.Notebook (notebook) where

  import Control.Monad.Eff

  import React

  import SlamData.Helpers
  import SlamData.App.Notebook.Block
  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  type ContentState = { content :: [{blockType :: BlockType}] }

  notebook :: UI
  notebook = nbPanel {}

  nbPanel :: {} -> UI
  nbPanel = mkUI spec { getInitialState = pure { content: [] } } do
    state <- readState
    pure $ panel [ tab { name: "Untitled Notebook"
                       , content: block <$> state.content
                       , external: [ actionButton {name: "Save", click: pure {}}
                                   , actionButton {name: "Publish", click: pure {}}
                                   ]
                       , internal: [ actionButton {name: show Markdown, click: addBlock Markdown}
                                   , actionButton {name: show SQL,      click: addBlock SQL}
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

  addBlock :: forall eff.
    BlockType
    -> EventHandlerContext eff {} ContentState (ReactStateRW ContentState ContentState)
  addBlock ty = do
    state <- readState
    pure $ writeState {content: {blockType: ty}:state.content}
