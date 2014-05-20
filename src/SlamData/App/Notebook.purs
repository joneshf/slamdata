module SlamData.App.Notebook (notebook) where

  import Control.Monad.Eff

  import Data.Array

  import React

  import SlamData.Helpers
  import SlamData.App.Notebook.Block
  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  type ContentState = { content :: [{blockType :: BlockType, index :: Number}] }

  notebook :: UI
  notebook = nbPanel {}

  nbPanel :: {} -> UI
  nbPanel = mkUI spec { getInitialState = pure { content: [] } } do
    state <- readState
    pure $ panel [ tab { name: "Untitled Notebook"
                       , content: createBlock <$> state.content
                       , external: [ actionButton {name: "Save", click: pure {}}
                                   , actionButton {name: "Publish", click: pure {}}
                                   ]
                       , internal: [ actionButton { name: show Markdown
                                                  , click: addBlock Markdown
                                                  }
                                   , actionButton { name: show SQL
                                                  , click: addBlock SQL
                                                  }
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
    let content = state.content
    let newBlock = [{blockType: ty, index: length content + 1}]
    pure $ writeState {content: content ++ newBlock}
  removeBlock :: forall eff.
    Number
    -> EventHandlerContext eff {} ContentState (ReactStateRW ContentState ContentState)
  removeBlock index = do
    state <- readState
    let newContent = filter ((/=) index <<< \b -> b.index) state.content
    pure $ writeState {content: newContent}
  createBlock {blockType = ty, index = n} =
    block {blockType: ty, index: n, close: deferred $ removeBlock n}
