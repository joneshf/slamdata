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
                       , internal: [ actionButton {name: show Markdown, click: addBlock {blockType: Markdown, index: length state.content + 1}}
                                   , actionButton {name: show SQL,      click: addBlock {blockType: SQL,      index: length state.content + 1}}
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
    {blockType :: BlockType, index :: Number}
    -> EventHandlerContext eff {} ContentState (ReactStateRW ContentState ContentState)
  addBlock b = do
    state <- readState
    pure $ writeState {content: state.content ++ [b]}
  removeBlock :: forall eff. Number -> EventHandlerContext eff {} ContentState (ReactStateRW ContentState ContentState)
  removeBlock index = do
    state <- readState
    let newContent = filter ((/=) index <<< \b -> b.index) state.content
    pure $ writeState {content: newContent}
  createBlock {blockType = ty, index = n} = block {blockType: ty, index: n, close: removeBlock}
