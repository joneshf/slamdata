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
              [D.div'
                [D.a
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
    , D.div [D.className "actual-content"] (zipWith block2UI (filter (\(BlockSpec bs) -> bs.ident `elem` nb.blocks) (localGet Blocks)) (0..length nb.blocks))
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
    let notebooks = f <$> state.notebooks
    pure $ localSet Notebooks notebooks
    pure $ writeState state{notebooks = f <$> state.notebooks}

  createBlock :: forall eff. BlockType -> NotebookID -> NotebookEvent eff
  createBlock ty ident = do
    state <- readState
    let i = BlockID $ runUUID v4
    let block = BlockSpec {blockType: ty, content: Nothing, ident: i}
    let blocks' = localGet Blocks `snoc` block
    let go (NotebookSpec nb) = if nb.ident == ident then NotebookSpec nb{blocks = nb.blocks `snoc` i} else NotebookSpec nb
    let notebooks' = go <$> state.notebooks
    pure $ localSet Blocks blocks'
    pure $ localSet Notebooks notebooks'
    pure $ writeState state{notebooks = notebooks'}

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
  deleteBlock ident = do
    state <- readState
    let blocks' = filter (\(BlockSpec bs) -> bs.ident /= ident) $ localGet Blocks
    let go (NotebookSpec nb) = NotebookSpec nb{blocks = delete ident nb.blocks}
    let notebooks' = go <$> state.notebooks
    pure $ localSet Blocks blocks'
    pure $ localSet Notebooks notebooks'
    pure $ writeState state{notebooks = notebooks'}

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
    let i = NotebookID $ runUUID v4
    let notebooks' = state.notebooks `snoc` NotebookSpec { name: "Untitled"
                                                         , blocks: []
                                                         , ident: i
                                                         }
    pure $ localSet Notebooks notebooks'
    pure $ writeState {notebooks: notebooks', active: Just i}

  deleteNotebook :: forall eff. NotebookID -> NotebookEvent eff
  deleteNotebook ident = do
    state <- readState
    let o = partition (\(NotebookSpec nb) -> nb.ident == ident) state.notebooks
    let notebooks' = o.snd
    let blocks = localGet Blocks
    blocks' <- pure $ fromMaybe blocks do
      NotebookSpec nb <- head o.fst
      pure $ filter (\(BlockSpec bs) -> bs.ident `notElem` nb.blocks) $ blocks
    pure $ localSet Blocks blocks'
    pure $ localSet Notebooks notebooks'
    pure $ writeState {notebooks: notebooks', active: Nothing}

  initialState :: NotebookState
  initialState = {notebooks: localGet Notebooks, active: Nothing}

  getNotebookID :: NotebookID -> UUID
  getNotebookID (NotebookID i) = i
