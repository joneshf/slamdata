module SlamData.App.Notebook (notebook) where

  import Control.Monad.Eff

  import Data.Array
  import Data.Maybe

  import React

  import SlamData.Helpers
  import SlamData.App.Notebook.Block
  import SlamData.App.Notebook.Block.Common
  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  type ContentState = { blocks :: [{blockType :: BlockType, index :: Number}] }

  notebook :: UI
  notebook = nbPanel {}

  -- Since this is not backed by an actual resource, we don't have real models.
  -- So the insertion/deletion behavior is a bit buggy.
  nbPanel :: {} -> UI
  nbPanel = mkUI spec { getInitialState = pure { blocks: testBlocks } } do
    state <- readState
    pure $ panel [ tab { name: "Untitled Notebook"
                       , content: createBlock <$> state.blocks
                       , external: [ actionButton { tooltip: "Save"
                                                  , icon: saveIcon {}
                                                  , click: pure {}
                                                  }
                                   , actionButton { tooltip: "Publish"
                                                  , icon: publishIcon {}
                                                  , click: pure {}
                                                  }
                                   ]
                       , internal: [ actionButton { tooltip: show Markdown
                                                  , icon: markdownIcon {}
                                                  , click: addBlock Markdown
                                                  }
                                   , actionButton { tooltip: show SQL
                                                  , icon: sqlIcon {}
                                                  , click: addBlock SQL
                                                  }
                                   ]
                       , active: true
                       }
                 , Tab { name: addNotebook
                       , toolbar: {external: [], internal: []}
                       , content: D.text ""
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

  createBlock :: {blockType :: BlockType, index :: Number, content :: Maybe String} -> UI
  createBlock {blockType = ty, index = n, content = c} =
    block {blockType: ty, index: n, close: deferred $ removeBlock n, content: c}

  testBlocks =
    [ { blockType: Markdown
      , content: Just "##Experiments\nWe found many interesting things happened:\n\n1. There was a strong correlation between subjects exposed to the medication and their overall happiness\n1. Any amount of dosage caused an effect.\n1. Men were more susceptible to the medication than women."
      , index: 1
      }
    , { blockType: SQL
      , content: Just "SELECT happiness FROM subjects;"
      , index: 2
      }
    ]

  addNotebook :: UI
  addNotebook = D.dd'
    [ D.div'
      [ D.a
          [ D.onClick $ \_ -> Debug.Trace.print "wat"
          , D.idProp "add-notebook"
          ]
          [toUI $ newNotebookIcon {}]
      ]
    ]
