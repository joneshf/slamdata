module SlamData.App.Notebook (notebook) where

  import Control.Monad.Eff

  import Data.Array
  import Data.Either
  import Data.Foreign
  import Data.Maybe
  import Data.UUID

  import React

  import SlamData.Helpers
  import SlamData.App.Notebook.Block
  import SlamData.App.Notebook.Block.Common
  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D
  import qualified Browser.WebStorage as WS

  data Notebook = Notebook { name :: String
                           , blocks :: [BlockSpec]
                           , ident :: UUID
                           }
  data BlockSpec = BlockSpec { blockType :: BlockType
                             , content :: Maybe String
                             , ident :: UUID
                             }
  type NotebookState = {notebooks :: [Notebook]}
  type NotebookEvent eff =
    EventHandlerContext eff
                        {}
                        NotebookState
                        (ReactStateRW NotebookState NotebookState)

  instance readBlockSpec :: ReadForeign BlockSpec where
    read = do
      ty <- prop "blockType"
      c <- prop "content"
      i <- prop "id"
      pure $ BlockSpec {blockType: ty, content: c, ident: i}

  notebook :: UI
  notebook = nbPanel {}

  -- Since this is not backed by an actual resource, we don't have real models.
  -- So the insertion/deletion behavior is a bit buggy.
  nbPanel :: {} -> UI
  nbPanel = mkUI spec
      { getInitialState = pure { notebooks: [ Notebook { name: "Foo"
                                                       , blocks: localBlocks
                                                       , ident: runUUID v4
                                                       }
                                            , Notebook { name: "Bar"
                                                       , blocks: testBlocks {}
                                                       , ident: runUUID v4
                                                       }
                                            ]
                               , activeBook: Nothing :: Maybe UUID
                               }
      } do
    state <- readState
    -- Debug.Trace.print ((\(Notebook nb) -> (\(BlockSpec {blockType = b, content = c, ident = i}) -> [show i, show b, maybe "" id c]) <$> nb.blocks) <$> state.notebooks)
    pure $ panel (createNotebook <$> state.notebooks){- ++-}
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

  createNotebook :: Notebook -> TabSpec
  createNotebook (Notebook nb) =
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

  createBlock :: forall eff. UUID -> BlockType -> NotebookEvent eff
  createBlock ident ty = crudBlock \(Notebook nb) -> if nb.ident == ident
    then Notebook nb{blocks = nb.blocks ++ [BlockSpec {ident: runUUID v4, blockType: ty, content: Nothing}]}
    else Notebook nb

  updateBlock :: forall eff. UUID -> Maybe String -> NotebookEvent eff
  updateBlock ident c = crudBlock \(Notebook nb) ->
    Notebook nb{blocks = (\(BlockSpec b) -> if b.ident == ident then BlockSpec b{content = c} else BlockSpec b) <$> nb.blocks}

  deleteBlock :: forall eff. UUID -> NotebookEvent eff
  deleteBlock ident = crudBlock \(Notebook nb) ->
    Notebook nb{blocks = filter (\(BlockSpec {ident = i}) -> i /= ident) nb.blocks}

  block2UI :: BlockSpec -> UI
  block2UI (BlockSpec {blockType = ty, ident = n, content = c}) =
    block { blockType: ty
          , ident: n
          , close: deferred $ deleteBlock n
          , content: c
          }

  addNotebook :: forall eff. NotebookEvent eff
  addNotebook = do
    state <- readState
    let notebooks' = state.notebooks
    pure $ writeState { notebooks: snoc notebooks' $ Notebook { name: "Untitled"
                                                              , blocks: []
                                                              , ident: runUUID v4
                                                              }
                      }

  localBlocks :: [BlockSpec]
  localBlocks =
    maybe [] (parseJSON >>> either (const []) id) (WS.getItem WS.localStorage "blocks")

  testBlocks _ =
    [ BlockSpec { ident: runUUID v4
      , blockType: Markdown
      , content: Just "##Experiments\nWe found many interesting things happened:\n\n1. There was a strong correlation between subjects exposed to the medication and their overall happiness\n1. Any amount of dosage caused an effect.\n1. Men were more susceptible to the medication than women."
      }
    , BlockSpec { ident: runUUID v4
      , blockType: SQL
      , content: Just "SELECT happiness FROM subjects;"
      }
    ]
