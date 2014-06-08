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

  data Notebook = Notebook { name :: String
                           , blocks :: [ { blockType :: BlockType
                                         , content :: Maybe String
                                         }
                                       ]
                           , active :: Boolean
                           }
  type NotebookState = {notebooks :: [Notebook]}

  notebook :: UI
  notebook = nbPanel {}

  -- Since this is not backed by an actual resource, we don't have real models.
  -- So the insertion/deletion behavior is a bit buggy.
  nbPanel :: {} -> UI
  nbPanel = mkUI spec { getInitialState = pure { notebooks: [Notebook {name: "Foo", blocks: testBlocks, active: true}, Notebook {name: "Bar", blocks: testBlocks, active: false}] } } do
    state <- readState
    pure $ panel $ (createNotebook <$> state.notebooks) ++
      -- TODO: This is far too fragile.
      -- We cannot factor out the "name", otherwise we lose the context.
      -- This React library is really getting on my nerves.
      [ Tab { name: D.dd'
                [ D.div'
                  [ D.a
                      [ D.onClick \_ -> addNotebook
                      , D.idProp "add-notebook"
                      ]
                      [toUI $ newNotebookIcon {}]
                  ]
                ]
            , toolbar: {external: [], internal: []}
            , content: D.text ""
            }
      ]

  createNotebook :: Notebook -> Tab
  createNotebook (Notebook nb) =
    tab { name: nb.name
        , content: createBlock <$> (zipWith insertIndex (range 1 (length nb.blocks)) nb.blocks)
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
        , active: nb.active
        }

  addBlock :: forall eff. BlockType
           -> EventHandlerContext eff {} NotebookState (ReactStateRW NotebookState NotebookState)
  addBlock ty = do
    state <- readState
    let notebooks' = (\(Notebook nb) -> if nb.active then Notebook nb{blocks = nb.blocks ++ [{blockType: ty, content: Nothing}]} else Notebook nb) <$> state.notebooks
    pure $ writeState {notebooks: notebooks'}

  removeBlock :: forall eff. Number
              -> EventHandlerContext eff {} NotebookState (ReactStateRW NotebookState NotebookState)
  removeBlock index = do
    state <- readState
    let notebooks' = (\(Notebook nb) -> if nb.active then Notebook nb{blocks = deleteAt (index - 1) 1 nb.blocks} else Notebook nb) <$> state.notebooks
    pure $ writeState {notebooks: notebooks'}

  createBlock :: {blockType :: BlockType, index :: Number, content :: Maybe String}
              -> UI
  createBlock {blockType = ty, index = n, content = c} =
    block {blockType: ty, index: n, close: deferred $ removeBlock n, content: c}

  insertIndex :: Number
              -> {blockType :: BlockType, content :: Maybe String}
              -> {blockType :: BlockType, content :: Maybe String, index :: Number}
  insertIndex n {blockType = ty, content = c} =
    {blockType: ty, content: c, index: n}

  addNotebookButton :: {} -> UI
  addNotebookButton = mkUI spec do
    pure $ D.dd'
      [ D.div'
        [ D.a
            [ D.onClick \_ -> addNotebook
            , D.idProp "add-notebook"
            ]
            [toUI $ newNotebookIcon {}]
        ]
      ]

  addNotebook :: forall eff. EventHandlerContext eff {} NotebookState (ReactStateRW NotebookState NotebookState)
  addNotebook  = do
    state <- readState
    let deactivated = deactivate <$> state.notebooks
    pure $ writeState {notebooks: deactivated ++ [Notebook {name: "Untitled", blocks: [], active: true}]}

  deactivate :: Notebook -> Notebook
  deactivate (Notebook nb) = Notebook nb{active = false}

  testBlocks =
    [ { blockType: Markdown
      , content: Just "##Experiments\nWe found many interesting things happened:\n\n1. There was a strong correlation between subjects exposed to the medication and their overall happiness\n1. Any amount of dosage caused an effect.\n1. Men were more susceptible to the medication than women."
      }
    , { blockType: SQL
      , content: Just "SELECT happiness FROM subjects;"
      }
    ]
