module SlamData.App.Notebook (notebook) where

  import Control.Monad.Eff

  import Data.Array

  import React

  import SlamData.Helpers
  import SlamData.App.Notebook.Block
  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  type ContentState = { blocks :: [{blockType :: BlockType, index :: Number}] }

  notebook :: UI
  notebook = nbPanel {}

  -- Since this is not backed by an actual resource, we don't have real models.
  -- So the insertion/deletion behavior is a bit buggy.
  nbPanel :: {} -> UI
  nbPanel = mkUI spec { getInitialState = pure { blocks: [] } } do
    state <- readState
    pure $ panel [ tab { name: "Untitled Notebook"
                       , content: createBlock <$> state.blocks
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
    let blocks = state.blocks
    let newBlock = [{blockType: ty, index: length blocks + 1}]
    pure $ writeState {blocks: blocks ++ newBlock}

  removeBlock :: forall eff.
    Number
    -> EventHandlerContext eff {} ContentState (ReactStateRW ContentState ContentState)
  removeBlock index = do
    state <- readState
    let newContent = filter ((/=) index <<< \b -> b.index) state.blocks
    pure $ writeState {blocks: newContent}

  createBlock :: {blockType :: BlockType, index :: Number} -> UI
  createBlock {blockType = ty, index = n} =
    block {blockType: ty, index: n, close: deferred $ removeBlock n}
