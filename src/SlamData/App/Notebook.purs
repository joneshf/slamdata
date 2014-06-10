module SlamData.App.Notebook (notebook) where

  import Control.Monad.Eff

  import Data.Array
  import Data.Maybe
  import Data.UUID

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
                           , ident :: UUIDv4
                           }
  type NotebookState = {notebooks :: [Notebook], activeBook :: Maybe UUIDv4}
  type NotebookEvent eff =
    EventHandlerContext eff
                        {}
                        NotebookState
                        (ReactStateRW NotebookState NotebookState)

  notebook :: UI
  notebook = nbPanel {}

  -- Since this is not backed by an actual resource, we don't have real models.
  -- So the insertion/deletion behavior is a bit buggy.
  nbPanel :: {} -> UI
  nbPanel = mkUI spec
      { getInitialState = pure { notebooks: [ Notebook { name: "Foo"
                                                       , blocks: testBlocks
                                                       , active: true
                                                       , ident: testId
                                                       }
                                            , Notebook { name: "Bar"
                                                       , blocks: testBlocks
                                                       , active: false
                                                       , ident: runv4 v4
                                                       }
                                            ]
                               , activeBook: Just testId
                               }
      } do
    state <- readState
    Debug.Trace.print ((\(Notebook nb) -> (\{content=c} -> c) <$> nb.blocks) <$> state.notebooks)
    pure $ panel $ (createNotebook state.activeBook <$> state.notebooks){- ++-}
      -- TODO: This is far too fragile.
      -- We cannot factor out the "name", otherwise we lose the context.
      -- This React library is really getting on my nerves.
      -- [ Tab { name: D.dd'
      --           [ D.div'
      --             [ D.a
      --                 [ D.onClick \_ -> addNotebook
      --                 , D.idProp "add-notebook"
      --                 ]
      --                 [toUI $ newNotebookIcon {}]
      --             ]
      --           ]
      --       , toolbar: {external: [], internal: []}
      --       , content: D.text ""
      --       , active: false
      --       }
      -- ]

  createNotebook :: Maybe UUIDv4 -> Notebook -> TabSpec
  createNotebook mId (Notebook nb) =
    { name: nb.name
    , content: block2UI <$> (zipWith insertIndex (range 1 (length nb.blocks)) nb.blocks)
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
                               , click: createBlock Markdown
                               }
                , actionButton { tooltip: show SQL
                               , icon: sqlIcon {}
                               , click: createBlock SQL
                               }
                ]
    , ident: nb.ident
    }

  crudBlock :: forall eff. (Notebook -> Notebook) -> NotebookEvent eff
  crudBlock f = do
    state <- readState
    pure $ writeState state{notebooks = f <$> state.notebooks}

  createBlock :: forall eff. BlockType -> NotebookEvent eff
  createBlock ty = crudBlock \(Notebook nb) ->
    if nb.active
    then Notebook nb{blocks = nb.blocks ++ [{blockType: ty, content: Nothing}]}
    else Notebook nb

  removeBlock :: forall eff. Number -> NotebookEvent eff
  removeBlock index = crudBlock \(Notebook nb) ->
    if nb.active
    then Notebook nb{blocks = deleteAt (index - 1) 1 nb.blocks}
    else Notebook nb

  block2UI :: {blockType :: BlockType, index :: Number, content :: Maybe String}
              -> UI
  block2UI {blockType = ty, index = n, content = c} =
    block {blockType: ty, index: n, close: deferred $ removeBlock n, content: c}

  insertIndex :: Number
              -> {blockType :: BlockType, content :: Maybe String}
              -> {blockType :: BlockType, content :: Maybe String, index :: Number}
  insertIndex n {blockType = ty, content = c} =
    {blockType: ty, content: c, index: n}

  addNotebook :: forall eff. NotebookEvent eff
  addNotebook  = do
    state <- readState
    let deactivated = deactivate <$> state.notebooks
    let id = runv4 v4
    pure $ writeState { notebooks: deactivated ++ [ Notebook { name: "Untitled"
                                                             , blocks: []
                                                             , active: false
                                                             , ident: id
                                                             }
                                                  ]
                      , activeBook: Just id
                      }

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

  testId = runv4 v4
