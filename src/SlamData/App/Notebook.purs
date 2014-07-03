module SlamData.App.Notebook (notebook) where

  import Control.Monad.Eff

  import Data.Array
  import Data.Either
  import Data.Foldable
  import Data.Foreign
  import Data.Maybe
  import Data.Maybe.Unsafe
  import Data.String (joinWith)
  import Data.UUID

  import Network.Oboe

  import React

  import SlamData.App.Notebook.Block
  import SlamData.App.Notebook.Block.Common
  import SlamData.App.Notebook.Block.Types
  import SlamData.App.Notebook.Types
  import SlamData.App.Panel
  import SlamData.App.Panel.Tab
  import SlamData.Helpers

  import qualified React.DOM as D
  import qualified Browser.WebStorage as WS

  notebook :: {files :: [FileType]} -> UI
  notebook = mkUI spec{ getInitialState = pure initialState
                      } do
    props <- getProps
    state <- readState
    this <- getSelf
    let notebooks = state.notebooks
    let vState = state.visualState
    let active = state.active
             <|> maybe Nothing (\(NotebookSpec nb) -> Just nb.ident) (head notebooks)
    pure $ D.div
      [D.className "slamdata-panel"]
      -- This can't be abstracted out, we'll lose the context if we try.
      ([ D.dl
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
          (makeBlocks active (deferred <<< modalVisibility) <$> notebooks)
      ] ++ if vState.visible
        then
          [D.div
              [D.idProp "visual-modal"]
              [ D.div
                  [D.idProp "visual-modal-content"]
                  [ D.dl
                      [D.className "tabs vertical"]
                      [ D.dd
                          [D.className $ "tab" ++ actData vState.active]
                          [D.a
                              [D.onClick \_ -> activateVisualTab DataSrcTab]
                              [D.text "Data Source"]
                          ]
                      , D.dd
                          [D.className $ "tab" ++ actFields vState.active]
                          [D.a
                              [D.onClick \_ -> activateVisualTab FieldsTab]
                              [D.text "Fields"]
                          ]
                      , D.dd
                          [D.className $ "tab" ++ actVisualType vState.active]
                          [D.a
                              [D.onClick \_ -> activateVisualTab VisualTypeTab]
                              [D.text "Type"]
                          ]
                      ]
                  , D.div
                      [D.className "tabs-content vertical"]
                      [ D.ul
                          [D.className $ "content" ++ actData vState.active]
                          (ft2UI (\b i -> deferred $ modifyDataSrc this b i) vState.fields <$> filter (_type >>> (==) "file") props.files)
                      , D.ul
                          [D.className $ "content" ++ actFields vState.active]
                          (fields2UI (\s ss -> deferred $ modifyFields s ss) <$> vState.fields)
                      , D.div
                          [D.className $ "content" ++ actVisualType vState.active]
                          [ D.ul
                              [D.className "chart-type small-block-grid-5"]
                              (visuals (deferred <<< changeVisual) vState.visualType)
                          , D.select
                              [D.onChange \e -> let vState' = vState{visualData = [targetValue e vState.visualType]} in writeState state{visualState = vState'}]
                              (optionify <$> vState.fields)
                          , D.div [D.className "actions"]
                              [ D.a
                                  [ D.className "button"
                                  , D.onClick \_ -> do
                                      state <- readState
                                      let active = state.active `getOrElse` (maybe (NotebookID $ runUUID v4) (\(NotebookSpec ns) -> ns.ident) (head state.notebooks))
                                      createVisualBlock this Visual active $ visualContent vState.visualData
                                      writeState state{visualState = initialState.visualState}
                                  ]
                                  [D.text "Create"]
                              , D.a
                                  [ D.className "button secondary"
                                  , D.onClick \_ -> writeState state{visualState = initialState.visualState}
                                  ]
                                  [D.text "Cancel"]
                              ]
                          ]
                      ]
                  ]
                ]
              ]
        else [])

  visualContent :: [VisualData] -> Maybe String
  visualContent vds =
    let content = joinWith "" (showVisualData <$> vds)
    in if content == "" then Nothing else Just content

  foreign import targetValue
    "function targetValue(e) {\
    \  return function(ty) {\
    \    return {\
    \      dataSrc: e.target.selectedOptions[0].parentNode.label,\
    \      field: e.target.value,\
    \      visualType: showVisualType_(ty)\
    \    }\
    \  }\
    \}" :: forall a. a -> VisualType -> VisualData

  showVisualType_ :: VisualType -> String
  showVisualType_ ty = show ty

  _type o = o."type"
  _dataSrc o = o.dataSrc
  _selectedFields o = o.selectedFields
  ft2UI :: forall eff r s
        .  (Boolean -> String -> NotebookEvent eff)
        -> [{dataSrc :: String, allFields :: [String], selectedFields :: [String]}]
        -> FileType
        -> UI
  ft2UI modify fields {"type" = "file", name = n} =
    let checked = n `elem` (_dataSrc <$> fields)
    in D.li' [ D.input
                 [ D.typeProp "checkbox"
                 , D.onChange \_ -> modify (not checked) n
                 , D.checked checked
                 ]
                 []
             , D.text n
             ]

  fields2UI :: forall eff p s
            .  (String -> [String] -> NotebookEvent eff)
            -> {dataSrc :: String, allFields :: [String], selectedFields :: [String]}
            -> UI
  fields2UI modify props = D.li'
    [ D.text props.dataSrc
    , D.ul' (field2UI modify props.dataSrc props.selectedFields <$> props.allFields)
    ]

  foreign import fieldswm
    "function fieldswm(that) {\
    \    that.state.state.visualState.fields.forEach(function(f0) {\
    \      oboe(SlamData_Helpers.serverURI +'/data/fs/' + f0.dataSrc + '?limit=1')\
    \      .done(function(json) {\
    \        var state = that.state.state;\
    \        state.visualState.fields.forEach(function(f1, i) {\
    \          if (f1.dataSrc === f0.dataSrc) {\
    \            state.visualState.fields[i].allFields = Object.keys(json);\
    \          }\
    \        });\
    \        if (that.isMounted()) {\
    \          that.setState(state);\
    \        }\
    \      });\
    \    });\
    \}" :: forall a. a

  foreign import bind
    "function bind(that) {\
    \  return function(f) {\
    \    return f.bind(that);\
    \  }\
    \}" :: forall func p s. UIRef p s -> func -> func

  field2UI :: forall eff
           .  (String -> [String] -> NotebookEvent eff)
           -> String
           -> [String]
           -> String
           -> UI
  field2UI modify dataSrc fields field =
    let checked = field `elem` fields
    in D.li'
        [ D.input
            [ D.typeProp "checkbox"
            , D.checked checked
            , D.onChange \_ -> modify dataSrc (if checked then filter ((/=) field) fields else field:fields)
            ]
            []
        , D.text field
        ]

  visuals change ty =
    [ D.li
        [ D.onClick \_ -> change visualPie
        , D.className (if ty == visualPie then "selected" else "")
        ]
        [ D.a' [toUI $ pieChartIcon {}]
        , D.span' [D.text "Pie"]
        ]
    , D.li
        [ D.onClick \_ -> change visualBar
        , D.className (if ty == visualBar then "selected" else "")
        ]
        [ D.a' [toUI $ barChartIcon {}]
        , D.span' [D.text "Bar"]
        ]
    , D.li
        [ D.onClick \_ -> change visualLine
        , D.className (if ty == visualLine then "selected" else "")
        ]
        [ D.a' [toUI $ lineChartIcon {}]
        , D.span' [D.text "Line"]
        ]
    ]

  optionify vsf =
    D.optgroup
      [D.labelProp vsf.dataSrc]
      ((\s -> D.option [D.value s] [D.text s]) <$> vsf.selectedFields)

  changeVisual ty = do
    state <- readState
    let vState = state.visualState
    let vState' = vState{visualType = ty}
    pure $ writeState state{visualState = vState'}

  activateTab :: forall eff. NotebookID -> NotebookEvent eff
  activateTab ident = do
    state <- readState
    pure $ writeState state{active = Just ident}

  activateVisualTab :: forall eff. VisualTab -> NotebookEvent eff
  activateVisualTab visualTab = do
    state <- readState
    let visualState = state.visualState
    let visualState' = visualState{active = visualTab}
    pure $ writeState state{visualState = visualState'}

  modalVisibility :: forall eff. Boolean -> NotebookEvent eff
  modalVisibility vis = do
    state <- readState
    let visualState = state.visualState
    let visualState' = visualState{visible = vis}
    pure $ writeState state{visualState = visualState'}

  foreign import modifyDataSrc
    "function modifyDataSrc(that) {\
    \  return function(bool) {\
    \    return function(str) {\
    \      return function() {\
    \        var state = that.state.state;\
    \        var vState = dataSrcUpdate(bool)(str)(state.visualState);\
    \        state.visualState = vState;\
    \        that.replaceState({state: state});\
    \        fieldswm(that);\
    \      }\
    \    }\
    \  }\
    \}" :: forall eff p r. UIRef p r -> Boolean -> String -> NotebookEvent eff

  dataSrcUpdate :: Boolean -> String -> VisualState -> VisualState
  dataSrcUpdate new ident vState =
    let fields = vState.fields
        newField = {dataSrc: ident, allFields: [], selectedFields: []}
        fields' = if new then newField:fields else filter (_dataSrc >>> (/=) ident) fields
    in vState{fields = fields'}

  modifyFields :: forall eff p s. String -> [String] -> NotebookEvent eff
  modifyFields ident fields = do
    state <- readState
    let vState = state.visualState
    let fields' = (\f -> if ident == _dataSrc f then f{selectedFields = fields} else f) <$> vState.fields
    let vState' = vState{fields = fields'}
    pure $ writeState state{visualState = vState'}

  actData :: VisualTab -> String
  actData DataSrcTab = " active"
  actData _          = ""
  actFields :: VisualTab -> String
  actFields FieldsTab = " active"
  actFields _         = ""
  actVisualType :: VisualTab -> String
  actVisualType VisualTypeTab = " active"
  actVisualType _             = ""

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
             -> (Boolean -> NotebookEvent eff)
             -> NotebookSpec
             -> UI
  makeBlocks active vis (NotebookSpec nb) = D.div
    [D.className $ "content" ++ maybeActive nb.ident active]
    [ D.div
        [D.className "toolbar button-bar"]
        [ externalActions {}
        , internalActions {notebook: nb, visibility: vis}
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

  internalActions :: forall eff
                  .  { notebook :: NotebookRecord
                     , visibility :: Boolean -> NotebookEvent eff} -> UI
  internalActions {notebook = nb, visibility = vis} = D.ul
    [D.className "button-group"]
    [ actionButton { tooltip: show Markdown
                   , icon: markdownIcon {}
                   , click: createBlock Markdown nb.ident Nothing
                   }
    , actionButton { tooltip: show SQL
                   , icon: sqlIcon {}
                   , click: createBlock SQL nb.ident Nothing
                   }
    , actionButton { tooltip: show Visual
                   , icon: visualIcon {}
                   , click: vis true
                   }
    ]

  crudBlock :: forall eff. (NotebookSpec -> NotebookSpec) -> NotebookEvent eff
  crudBlock f = do
    state <- readState
    let notebooks = f <$> state.notebooks
    pure $ localSet Notebooks notebooks
    pure $ writeState state{notebooks = f <$> state.notebooks}

  foreign import createVisualBlock
    "function createVisualBlock(that) {\
    \  return function(ty) {\
    \    return function(ident) {\
    \      return function(content) {\
    \        var event = createBlock(ty)(ident)(content)();\
    \        that.forceUpdate();\
    \        return event;\
    \      }\
    \    }\
    \  }\
    \}" :: forall eff p s. UIRef p s -> BlockType -> NotebookID -> Maybe String -> NotebookEvent eff
  createBlock :: forall eff. BlockType -> NotebookID -> Maybe String -> NotebookEvent eff
  createBlock ty ident content = do
    state <- readState
    let i = BlockID $ runUUID v4
    let block = BlockSpec {blockType: ty, content: content, ident: i}
    let blocks' = localGet Blocks `snoc` block
    let go (NotebookSpec nb) = if nb.ident == ident then NotebookSpec nb{blocks = nb.blocks `snoc` i} else NotebookSpec nb
    let notebooks' = go <$> state.notebooks
    pure $ localSet Blocks blocks'
    pure $ localSet Notebooks notebooks'
    pure $ writeState state{notebooks = notebooks'}

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
                                                         } -- TODO: Note this in a bug report. This is a compiler error if it's not inline.
    pure $ localSet Notebooks notebooks'
    pure $ writeState state{notebooks = notebooks', active = Just i}

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
    pure $ writeState state{notebooks = notebooks', active = Nothing}

  getNotebookID :: NotebookID -> UUID
  getNotebookID (NotebookID i) = i

  initialState :: NotebookState
  initialState =
    { notebooks: localGet Notebooks
    , active: Nothing
    , visualState: { active: DataSrcTab
                   , fields: []
                   , visualType: visualBar
                   , visualData: []
                   , visible: false
                   }
    }
