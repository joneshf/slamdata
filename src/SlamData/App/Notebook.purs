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
                                         , ident :: UUIDv4
                                         }
                                       ]
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
                                                       , blocks: testBlocks {}
                                                       , ident: runv4 v4
                                                       }
                                            , Notebook { name: "Bar"
                                                       , blocks: testBlocks {}
                                                       , ident: runv4 v4
                                                       }
                                            ]
                               , activeBook: Nothing :: Maybe UUIDv4
                               }
      } do
    state <- readState
    Debug.Trace.print state.activeBook
    Debug.Trace.print ((\(Notebook nb) -> (\{ident=c} -> c) <$> nb.blocks) <$> state.notebooks)
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
    , content: block2UI <$> nb.blocks
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
                               , click: createBlock nb.ident Markdown
                               }
                , actionButton { tooltip: show SQL
                               , icon: sqlIcon {}
                               , click: createBlock nb.ident SQL
                               }
                ]
    , ident: nb.ident
    }

  crudBlock :: forall eff. (Notebook -> Notebook) -> NotebookEvent eff
  crudBlock f = do
    state <- readState
    pure $ writeState state{notebooks = f <$> state.notebooks}

  createBlock :: forall eff. UUIDv4 -> BlockType -> NotebookEvent eff
  createBlock ident ty = crudBlock \(Notebook nb) -> if nb.ident == ident
    then Notebook nb{blocks = nb.blocks ++ [{ident: runv4 v4, blockType: ty, content: Nothing}]}
    else Notebook nb

  removeBlock :: forall eff. UUIDv4 -> NotebookEvent eff
  removeBlock ident = crudBlock \(Notebook nb) ->
    Notebook nb{blocks = filter (\{ident = i} -> i /= ident) nb.blocks}

  block2UI :: {blockType :: BlockType, ident :: UUIDv4, content :: Maybe String}
              -> UI
  block2UI {blockType = ty, ident = n, content = c} =
    block {blockType: ty, ident: n, close: deferred $ removeBlock n, content: c}

  addNotebook :: forall eff. NotebookEvent eff
  addNotebook  = do
    state <- readState
    let deactivated = state.notebooks
    let id = runv4 v4
    pure $ writeState { notebooks: deactivated ++ [ Notebook { name: "Untitled"
                                                             , blocks: []
                                                             , ident: id
                                                             }
                                                  ]
                      , activeBook: Just id
                      }

  testBlocks _ =
    [ { ident: runv4 v4
      , blockType: Markdown
      , content: Just "##Experiments\nWe found many interesting things happened:\n\n1. There was a strong correlation between subjects exposed to the medication and their overall happiness\n1. Any amount of dosage caused an effect.\n1. Men were more susceptible to the medication than women."
      }
    , { ident: runv4 v4
      , blockType: SQL
      , content: Just "SELECT happiness FROM subjects;"
      }
    ]
