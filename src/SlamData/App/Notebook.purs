module SlamData.App.Notebook (notebook) where

  import Control.Monad.Eff

  import Data.Array
  import Data.Either
  import Data.Foldable
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

  type NotebookState = {notebooks :: [NotebookSpec], active :: Maybe NotebookID}
  type NotebookEvent eff =
    EventHandlerContext eff
                        {}
                        NotebookState
                        (ReactStateRW NotebookState NotebookState)

  getNotebook :: NotebookSpec -> NotebookRecord
  getNotebook (NotebookSpec nb) = nb
  getNotebookID :: NotebookID -> UUID
  getNotebookID (NotebookID i) = i

  notebook :: UI
  notebook = nbPanel {}

  nbPanel :: {} -> UI
  nbPanel = mkUI spec{getInitialState = pure initialState} do
    state <- readState
    let notebooks = state.notebooks
    let active = state.active
             <|> maybe Nothing (\(NotebookSpec nb) -> Just nb.ident) (head notebooks)
    pure $ D.div
      [D.className "slamdata-panel"]
      -- This can't be abstracted out, we'll lose the context if we try.
      [ D.dl
          [D.className "tabs"]
          ((makeNotebook active (deferred <<< activateTab) (deferred <<< deleteNotebook) <$> notebooks) `snoc`
            D.dd
              [D.className "tab"]
              [ D.div'
                [ D.a
                    [ D.onClick \_ -> createNotebook
                    , D.idProp "add-notebook"
                    ]
                    [toUI $ newNotebookIcon {}]
                ]
              ])
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
               -> (NotebookID -> NotebookEvent eff)
               -> NotebookSpec
               -> UI
  makeNotebook active activate close (NotebookSpec nb) = D.dd
    [D.className $ "tab" ++ maybeActive nb.ident active]
    [D.a
        [ D.href $ "#" ++ tabize (getNotebookID nb.ident)
        , D.onClick \e -> do
            pure $ e.preventDefault {}
            activate nb.ident
        ]
        [ D.text nb.name
        , D.i
            [ D.className "fa fa-times"
            , D.onClick \e -> do
                pure $ e.stopPropagation {}
                pure $ e.preventDefault {}
                close nb.ident
            ]
            []
        ]
    ]

  makeBlocks :: forall eff. Maybe NotebookID
             -> (NotebookID -> NotebookEvent eff)
             -> (NotebookID -> NotebookEvent eff)
             -> NotebookSpec
             -> UI
  makeBlocks active createM createS (NotebookSpec nb) = D.div
    [D.className $ "content" ++ maybeActive nb.ident active]
    [ D.div
        [D.className "toolbar button-bar"]
        [ externalActions {}
        , internalActions {notebook: nb, createM: createM, createS: createS}
        ]
    , D.hr' []
    , D.div [D.className "actual-content"] (zipWith block2UI (filter (\(BlockSpec bs) -> bs.ident `elem` nb.blocks) localBlocks) (0..length nb.blocks))
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

  crudBlock :: forall eff. (NotebookSpec -> NotebookSpec) -> NotebookEvent eff
  crudBlock f = do
    state <- readState
    pure $ writeState state{notebooks = f <$> state.notebooks}

  createBlock :: forall eff. BlockType -> NotebookID -> NotebookEvent eff
  createBlock ty ident = do
    let i = BlockID $ runUUID v4
    let block = BlockSpec {blockType: ty, content: Nothing, ident: i}
    let _ = WS.setItem WS.localStorage "blocks" (show (localBlocks `snoc` block))
    let f (NotebookSpec nb) = if nb.ident == ident then NotebookSpec nb{blocks = nb.blocks `snoc` i} else NotebookSpec nb
    state <- readState
    pure $ writeState state{notebooks = f <$> state.notebooks}

  createMarkdown :: forall eff. NotebookID -> NotebookEvent eff
  createMarkdown = createBlock Markdown

  createSQL :: forall eff. NotebookID -> NotebookEvent eff
  createSQL = createBlock SQL

  -- updateBlock :: forall eff. BlockID -> Maybe String -> NotebookEvent eff
  -- updateBlock ident c = crudBlock \(NotebookSpec nb) ->
  --   NotebookSpec nb{blocks = (\(BlockSpec b) ->
  --     if b.ident == ident
  --     then BlockSpec b{content = c}
  --     else BlockSpec b) <$> nb.blocks}

  deleteBlock :: forall eff. BlockID -> NotebookEvent eff
  deleteBlock ident = crudBlock \(NotebookSpec nb) ->
    NotebookSpec nb{blocks = filter ((/=) ident) nb.blocks}

  block2UI :: BlockSpec -> Number -> UI
  block2UI (BlockSpec {blockType = ty, ident = n, content = c}) i =
    block { blockType: ty
          , ident: n
          , close: deferred $ deleteBlock n
          , content: c
          , index: i
          }

  createNotebook :: forall eff. NotebookEvent eff
  createNotebook = do
    state <- readState
    let notebooks' = state.notebooks
    let ident = NotebookID $ runUUID v4
    pure $ writeState { notebooks: snoc notebooks' $ NotebookSpec { name: "Untitled"
                                                              , blocks: []
                                                              , ident: ident
                                                              }
                      , active: Just ident
                      }
  deleteNotebook :: forall eff. NotebookID -> NotebookEvent eff
  deleteNotebook ident = do
    state <- readState
    pure $ writeState { notebooks: filter (\(NotebookSpec nb) -> nb.ident /= ident) state.notebooks
                      , active: Nothing
                      }

  initialState :: NotebookState
  initialState = { notebooks: [ NotebookSpec { name: "Foo"
                                             , blocks: (\(BlockSpec bs) -> bs.ident) <$> localBlocks
                                             , ident: NotebookID $ runUUID v4
                                             }
                              ]
                 , active: Nothing :: Maybe NotebookID
                 }
