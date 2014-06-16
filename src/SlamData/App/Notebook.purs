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

  data Notebook = Notebook NotebookRecord
  data NotebookID = NotebookID UUID
  data BlockSpec = BlockSpec BlockRecord

  type NotebookRecord = { name :: String
                        , blocks :: [BlockSpec]
                        , ident :: NotebookID
                        }
  type BlockRecord = { blockType :: BlockType
                     , content :: Maybe String
                     , ident :: BlockID
                     }
  type NotebookState = {notebooks :: [Notebook], active :: Maybe NotebookID}
  type NotebookEvent eff =
    EventHandlerContext eff
                        {}
                        NotebookState
                        (ReactStateRW NotebookState NotebookState)

  instance eqNotebookID :: Eq NotebookID where
    (==) (NotebookID i) (NotebookID i') =      i == i'
    (/=) b              b'              = not (b == b')

  instance readBlockSpec :: ReadForeign BlockSpec where
    read = do
      ty <- prop "blockType"
      c <- prop "content"
      i <- prop "id"
      pure $ BlockSpec {blockType: ty, content: c, ident: BlockID i}

  getNotebook :: Notebook -> NotebookRecord
  getNotebook (Notebook nb) = nb
  getNotebookID :: NotebookID -> UUID
  getNotebookID (NotebookID i) = i

  notebook :: UI
  notebook = nbPanel {}

  -- Since this is not backed by an actual resource, we don't have real models.
  -- So the insertion/deletion behavior is a bit buggy.
  nbPanel :: {} -> UI
  nbPanel = mkUI spec{getInitialState = pure initialState} do
    state <- readState
    let notebooks = state.notebooks
    let active = state.active
             <|> maybe Nothing (\(Notebook nb) -> Just nb.ident) (head notebooks)
    pure $ D.div
      [D.className "slamdata-panel"]
      -- This can't be abstracted out, we'll lose the context if we try.
      [ D.dl
          [D.className "tabs"]
          (makeNotebook active (deferred <<< activateTab) <$> notebooks)
      , D.div
          [D.className "tabs-content"]
          (makeBlocks active (deferred <<< createMarkdown) (deferred <<< createSQL) <$> notebooks)
      ]

  activateTab :: forall eff. NotebookID -> NotebookEvent eff
  activateTab ident = do
    state <- readState
    pure $ writeState state{active = Just ident}

  makeNotebook :: forall eff. Maybe NotebookID
               -> (NotebookID -> NotebookEvent eff)
               -> Notebook
               -> UI
  makeNotebook active activate (Notebook nb) = D.dd
    [D.className $ maybeActive nb.ident active]
    [D.a
        [ D.href $ "#" ++ tabize (getNotebookID nb.ident)
        , D.onClick $ \_ -> activate nb.ident
        ]
        [D.text nb.name]
    ]

  makeBlocks :: forall eff. Maybe NotebookID
             -> (NotebookID -> NotebookEvent eff)
             -> (NotebookID -> NotebookEvent eff)
             -> Notebook
             -> UI
  makeBlocks active createM createS (Notebook nb) = D.div
    [D.className $ "content" ++ maybeActive nb.ident active]
    [ D.div
        [D.className "toolbar button-bar"]
        [ externalActions {}
        , internalActions {notebook: nb, createM: createM, createS: createS}
        ]
    , D.hr' []
    , D.div [D.className "actual-content"] (block2UI <$> nb.blocks)
    ]

  maybeActive :: NotebookID -> Maybe NotebookID -> String
  maybeActive ident = maybe "" (\i -> if ident == i then " active" else "")

  externalActions :: {} -> UI
  externalActions _ = D.ul
    [D.className "button-group"]
    [ actionButton { tooltip: "Save"
                   , icon: saveIcon {}
                   , click: pure {}
                   }
    , actionButton { tooltip: "Publish"
                   , icon: publishIcon {}
                   , click: pure {}
                   }
    ]

  internalActions :: forall eff. { notebook :: NotebookRecord
                                 , createM :: NotebookID -> NotebookEvent eff
                                 , createS :: NotebookID -> NotebookEvent eff
                                 }
                  -> UI
  internalActions {notebook = nb, createM = createM, createS = createS} = D.ul
    [D.className "button-group"]
    [ actionButton { tooltip: show Markdown
                   , icon: markdownIcon {}
                   , click: createM nb.ident
                   }
    , actionButton { tooltip: show SQL
                   , icon: sqlIcon {}
                   , click: createS nb.ident
                   }
    ]

  crudBlock :: forall eff. (Notebook -> Notebook) -> NotebookEvent eff
  crudBlock f = do
    state <- readState
    pure $ writeState state{notebooks = f <$> state.notebooks}

  createBlock :: forall eff. BlockType -> NotebookID -> NotebookEvent eff
  createBlock ty ident = crudBlock \(Notebook nb) ->
    if nb.ident == ident
    then Notebook nb{blocks = nb.blocks ++ [BlockSpec {ident: BlockID $ runUUID v4, blockType: ty, content: Nothing}]}
    else Notebook nb

  createMarkdown :: forall eff. NotebookID -> NotebookEvent eff
  createMarkdown = createBlock Markdown

  createSQL :: forall eff. NotebookID -> NotebookEvent eff
  createSQL = createBlock SQL

  updateBlock :: forall eff. BlockID -> Maybe String -> NotebookEvent eff
  updateBlock ident c = crudBlock \(Notebook nb) ->
    Notebook nb{blocks = (\(BlockSpec b) ->
      if b.ident == ident
      then BlockSpec b{content = c}
      else BlockSpec b) <$> nb.blocks}

  deleteBlock :: forall eff. BlockID -> NotebookEvent eff
  deleteBlock ident = crudBlock \(Notebook nb) ->
    Notebook nb{blocks = filter (\(BlockSpec b) -> b.ident /= ident) nb.blocks}

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
    let ident = NotebookID $ runUUID v4
    pure $ writeState { notebooks: snoc notebooks' $ Notebook { name: "Untitled"
                                                              , blocks: []
                                                              , ident: ident
                                                              }
                      , active: Just ident
                      }

  localBlocks :: [BlockSpec]
  localBlocks =
    maybe []
          (parseJSON >>> either (const []) id)
          (WS.getItem WS.localStorage "blocks")

  testBlocks _ =
    [ BlockSpec { ident: BlockID $ runUUID v4
      , blockType: Markdown
      , content: Just "##Experiments\nWe found many interesting things happened:\n\n1. There was a strong correlation between subjects exposed to the medication and their overall happiness\n1. Any amount of dosage caused an effect.\n1. Men were more susceptible to the medication than women."
      }
    , BlockSpec { ident: BlockID $ runUUID v4
      , blockType: SQL
      , content: Just "SELECT happiness FROM subjects;"
      }
    ]

  initialState :: NotebookState
  initialState = { notebooks: [ Notebook { name: "Foo"
                                         , blocks: localBlocks
                                         , ident: NotebookID $ runUUID v4
                                         }
                              , Notebook { name: "Bar"
                                         , blocks: testBlocks {}
                                         , ident: NotebookID $ runUUID v4
                                         }
                              , Notebook { name: "Baz"
                                         , blocks: []
                                         , ident: NotebookID $ runUUID v4
                                         }
                              ]
                 , active: Nothing :: Maybe NotebookID
                 }
