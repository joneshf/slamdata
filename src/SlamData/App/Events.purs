module SlamData.App.Events where

  import Control.Events
    ( EventEff()
    , EventEmitter
    )
  import Control.Events.TinyEmitter (emit)
  import Control.Lens ((^.), (..), (.~), (~), (%~), (?~), (#~), (+=), (%=), at)
  import Control.Monad (when)
  import Control.Monad.Eff (Eff())
  import Control.Reactive.Timer (timeout, Timer())

  import Data.Array (filter, head, insertAt, last, length, nubBy, snoc)
  import Data.Foldable (find)
  import Data.Maybe (Maybe(..))
  import Data.Maybe.Unsafe (fromJust)
  import Data.Path (FilePath())
  import Data.String (joinWith, replace, split, trim)
  import Data.Tuple (fst)

  import DOM (DOM())

  import Network.HTTP (Verb(..))
  import Network.Oboe (done, oboe, oboeGet, oboeOptions, JSON(), OboeEff())

  import Node.UUID (runUUID, v4, UUIDEff())

  import Showdown (makeHtml)

  import SlamData.Helpers
    ( dataUrl
    , defaultMountPath
    , getOrElse
    , metadataUrl
    , mount
    , queryUrl
    , serverURI
    )
  import SlamData.Lens
    ( _ident
    , _notebookRec
    , _numOut
    , _validation
    )
  import SlamData.Types
    ( responseEvent
    , SDConfig()
    , SEConfig(..)
    , SlamDataEventRec()
    , SlamDataEventTy(..)
    , SlamDataState()
    )
  import SlamData.Types.Workspace.FileSystem (FileType(..), FileTypeRec())
  import SlamData.Types.Workspace.Notebook
    ( Notebook(..)
    , NotebookID(..)
    , NotebookRec(..)
    )
  import SlamData.Types.Workspace.Notebook.Block
    ( Block(..)
    , BlockID(..)
    , BlockMode(..)
    , BlockRec()
    , BlockType(..)
    )
  import SlamData.Types.Workspace.Notebook.Block.Visual (VisualData(..))

  import System.Path.Unix ((</>), basename, joinPath, normalize)

  import qualified Data.Map as M

  import qualified Network.XHR as X
  import qualified Network.XHR.Internal as XI
  import qualified Network.XHR.Types as XT

  foreign import undefined :: forall a. a

  handleRequest :: forall eff e
                .  (EventEmitter e)
                => e
                -> SlamDataEventRec
                -> Eff ( ajax   :: XI.Ajax
                       , c3     :: DOM
                       , event  :: EventEff
                       , oboe   :: OboeEff
                       , timer  :: Timer
                       , uuid   :: UUIDEff
                       ) Unit
  handleRequest e {event = event, state = state} = case event of
    HideConfig -> do
      e # emit responseEvent state{showConfig = false}
      pure unit
    ShowConfig -> do
      e # emit responseEvent state{showConfig = true}
      pure unit
    ReadFileSystem paths -> do
      let path = joinPath paths
      let fs = metadataUrl state.settings.sdConfig </> path
      o <- oboeGet fs
      done o (\json ->
        let children = (unsafeCoerceJSON json).children
            files' = insertChildren paths [state.files] children
        in e # emit responseEvent state{files = files'})
      pure unit
    ReadFields paths -> do
      let path = joinPath paths
      let fs = dataUrl state.settings.sdConfig </> path ++ "?limit=1"
      o <- oboeGet fs
      done o (\json ->
        let fields = objectKeys $ unsafeCoerceJSON json
            files' = insertFields paths [state.files] fields
        in e # emit responseEvent state{files = files'})
      pure unit
    CreateNotebook -> do
      ident <- NotebookID <$> v4
      let name = "Untitled.nb"
      let path = mount state.settings.seConfig
      let notebook = Notebook { ident: ident
                              , blocks: []
                              , name: name
                              , path: path
                              , published: false
                              , numOut: 0
                              , persisted: false
                              , dirty: true
                              }
      e # emit responseEvent state{notebooks = state.notebooks `snoc` notebook}
      pure unit
    CloseNotebook ident -> do
      let notebooks' = filter (\(Notebook n) -> n.ident /= ident) state.notebooks
      e # emit responseEvent state{notebooks = notebooks'}
      pure unit
    ShowSettings -> do
      e # emit responseEvent state{showSettings = true}
      pure unit
    HideSettings -> do
      e # emit responseEvent state{showSettings = false}
      pure unit
    CreateBlock ident ty index -> do
      ident' <- BlockID <$> v4
      let isSQL = ty == BlockType "SQL"
      let n = fromJust $ find (\n -> n^._notebookRec.._ident == ident) state.notebooks
      let l = if isSQL then "out" ++ show (n^._notebookRec.._numOut) else ""
      let block = Block { ident: ident'
                        , blockType: ty
                        , blockMode: BlockMode "Edit"
                        , editContent: ""
                        , evalContent: ""
                        , label: l
                        }
      let n' = n #~ do
             when isSQL (_notebookRec.._numOut += 1)
             id %= insertBlock ident block index
      let notebooks' = replaceNotebook n' <$> state.notebooks
      e # emit responseEvent state{notebooks = notebooks'}
      pure unit
    DeleteBlock nID bID -> do
      let notebooks' = deleteBlock nID bID <$> state.notebooks
      e # emit responseEvent state{notebooks = notebooks'}
      pure unit
    EditBlock (Notebook n) (Block b) -> do
      let block' = Block b{blockMode = BlockMode "Edit"}
      let notebooks' = updateBlock n.ident block' <$> state.notebooks
      e # emit responseEvent state{notebooks = notebooks'}
      pure unit
    EvalBlock (Notebook n) (Block b@{blockType = BlockType "Markdown"}) -> do
      let block' = Block b{ evalContent = makeHtml b.editContent
                          , blockMode = BlockMode "Eval"
                          }
      let notebooks' = updateBlock n.ident block' <$> state.notebooks
      e # emit responseEvent state{notebooks = notebooks'}
      pure unit
    EvalBlock (Notebook n) (Block b@{blockType = BlockType "SQL"}) -> do
      let queryUrl' = queryUrl state.settings.sdConfig </> n.path </> n.name </> "/"
      let dataUrl' = dataUrl state.settings.sdConfig
      let out = b.label
      X.post X.defaultAjaxOptions
        { headers = ["Destination" ~ out]
        , onReadyStateChange = X.onDone \res -> do
          status <- X.getStatus res
          if status >= 500
            then do
              error <- jsonParse {error: ""} <$> X.getResponseText res
              let block = Block b{evalContent = error.error}
              let notebooks' = updateBlock n.ident block <$> state.notebooks
              e # emit responseEvent state{notebooks = notebooks'}
              pure unit
            else do
              out' <- jsonParse {out: ""} <$> X.getResponseText res
              X.get X.defaultAjaxOptions
                { headers = ["Content-Type" ~ "text/plain"]
                , onLoad = \res -> do
                  content <- trim >>> split "\n" >>> joinWith "," <$> X.getResponseText res
                  let content' = "[" ++ content ++ "]"
                  let block'' = Block b{ blockMode = BlockMode "Eval"
                                       , evalContent = content'
                                       }
                  let notebooks' = updateBlock n.ident block'' <$> state.notebooks
                  e # emit responseEvent state{notebooks = notebooks'}
                  pure unit
                } (dataUrl' ++ out'.out) {limit: 20}
              pure unit
        } queryUrl' {} (XT.Multipart b.editContent)
      pure unit
    EvalVisual (Notebook n) (Block b@{blockType = BlockType "Visual"}) ds -> do
      let selector = "chart-" ++ show b.ident
      let dataUrl' = dataUrl state.settings.sdConfig
      let block' = Block b{ blockMode = BlockMode "Eval"
                          , evalContent = selector
                          }
      let notebooks' = updateBlock n.ident block' <$> state.notebooks
      e # emit responseEvent state{notebooks = notebooks'}
      -- Give it a small amount of time to create the selector.
      timeout 1000 $ createVisual showVisualType dataUrl' selector ds
      pure unit
    SaveNotebook (Notebook n) -> do
      let dataUrl' = dataUrl state.settings.sdConfig
      let url = dataUrl' </> n.path </> n.name </> "index.nb"
      let n' = deleteID n
      let n'' = n'{persisted = true, dirty = false}
      X.post X.defaultAjaxOptions
        { onReadyStateChange = X.onDone \_ -> do
          let notebooks' = replaceNotebook (Notebook n'') <$> state.notebooks
          e # emit responseEvent state{notebooks = notebooks'}
          pure unit
        } url {} (XT.UrlEncoded $ jsonStringify n'')
      pure unit
    OpenNotebook path -> do
      let dataUrl' = dataUrl state.settings.sdConfig
      let url = dataUrl' </> path </> "index.nb"
      let name = basename path
      X.get X.defaultAjaxOptions
        {onLoad = \res -> do
          revisions <- trim >>> split "\n" <$> X.getResponseText res
          case last revisions of
            Nothing -> pure unit
            Just "" -> pure unit
            Just revision -> do
              i <- NotebookID <$> v4
              let default = { ident: i
                            , blocks: []
                            , name: name
                            , path: path
                            , published: false
                            , numOut: 0
                            , persisted: false
                            , dirty: false
                            }
              let nb = jsonParse default revision
              let notebook' = Notebook nb{name = name}
              let notebooks' = state.notebooks `snoc` notebook'
              let notebooks'' = nubBy uniqueNotebooks notebooks'
              e # emit responseEvent state{notebooks = notebooks''}
              pure unit
        } url {}
      pure unit
    RenameNotebook (Notebook n) path -> do
      let dataUrl' = dataUrl state.settings.sdConfig
      let url = dataUrl' </> n.path </> n.name </> "/"
      let base = basename path
      let fs = mount state.settings.seConfig
      X.ajax X.defaultAjaxOptions
        { method = "MOVE"
        , url = url
        , headers = ["Destination" ~ (fs </> path </> "/")]
        , onLoad = \_ -> do
          let notebook' = Notebook n{name = base, dirty = false}
          let notebooks' = replaceNotebook notebook' <$> state.notebooks
          e # emit responseEvent state{notebooks = notebooks'}
          pure unit
        } {} XT.NoBody
      pure unit
    TogglePublish (Notebook n) -> do
      let dataUrl' = dataUrl state.settings.sdConfig
      let url = dataUrl' </> n.path </> n.name </> "index.nb"
      let n' = deleteID n
      let notebook' = Notebook n'{published = not n.published, dirty = true}
      let notebooks' = replaceNotebook notebook' <$> state.notebooks
      e # emit responseEvent state{notebooks = notebooks'}
      pure unit
    CreateValidation ty val -> do
      e # emit responseEvent ((state # _validation %~ at ty ?~ val) :: SlamDataState)
      pure unit
    DeleteValidation ty -> do
      e # emit responseEvent (state # _validation %~ at ty .~ Nothing)
      pure unit
    DirtyNotebook (Notebook n) -> do
      let nb = Notebook n{dirty = true}
      let nbs = replaceNotebook nb <$> state.notebooks
      e # emit responseEvent state{notebooks = nbs}
      pure unit
    CleanNotebook (Notebook n) -> do
      let nb = Notebook n{dirty = false}
      let nbs = replaceNotebook nb <$> state.notebooks
      e # emit responseEvent state{notebooks = nbs}
      pure unit
    _ -> pure unit

  uniqueNotebooks :: Notebook -> Notebook -> Boolean
  uniqueNotebooks (Notebook nb) (Notebook nb') = nb.ident == nb'.ident

  replaceNotebook :: Notebook -> Notebook -> Notebook
  replaceNotebook n@(Notebook nb) (Notebook nb') | nb.ident == nb'.ident = n
  replaceNotebook _               n                                      = n

  countOut :: NotebookRec -> BlockRec -> Number
  countOut {blocks = bs} {blockType = ty} = go bs 0
    where
      go []           n                     = n
      go (Block b:bs) n | b.blockType == ty = go bs (n + 1)
      go (_:bs)       n                     = go bs n

  createBlock :: NotebookID -> Block -> Notebook -> Notebook
  createBlock ident block (Notebook n@{ident = ident', blocks = blocks})
    | ident == ident' = Notebook n{blocks = blocks `snoc` block, dirty = true}
  createBlock _ _ nb = nb

  deleteBlock :: NotebookID -> BlockID -> Notebook -> Notebook
  deleteBlock nID bID (Notebook n@{ident = nID', blocks = blocks})
    | nID == nID' = Notebook n{blocks = filter go blocks, dirty = true}
                    where go (Block b) = b.ident /= bID
  deleteBlock _ _ nb = nb

  insertBlock :: NotebookID -> Block -> Number -> Notebook -> Notebook
  insertBlock ident block index (Notebook n@{ident = ident', blocks = blocks})
    | ident == ident' = Notebook n{blocks = insertAt index block blocks, dirty = true}
  insertBlock _ _ _ nb = nb

  updateBlock :: NotebookID -> Block -> Notebook -> Notebook
  updateBlock ident (Block b) (Notebook n@{ident = ident', blocks = blocks})
    | ident == ident' = Notebook n{blocks = go <$> blocks, dirty = true}
               where go (Block b') | b.ident == b'.ident = Block b
                     go b'                               = b'
  updateBlock _ _ nb = nb

  insertChildren :: [String] -> [FileType] -> [FileType] -> FileType
  insertChildren ds fs kids = case insertChildren' ds fs kids of
    [f] -> f

  insertChildren' :: [String] -> [FileType] -> [FileType] -> [FileType]
  insertChildren' [d]    (FileType f:fs) children
    | (d == f.name ++ "/" || d == f.name) && f."type" == "directory" =
      mergeKids (FileType f) children : fs
  insertChildren' (d:ds) (FileType f:fs) children
    | d == f.name =
      FileType f{children = insertChildren' ds f.children children} : fs
  insertChildren' ds     (f:fs)          children =
    f : insertChildren' ds fs children

  mergeKids :: FileType -> [FileType] -> FileType
  mergeKids (FileType f) kids =
    let kids' = unsafeMerge FileType f.children <$> kids
    in FileType f{children = kids'}

  insertFields :: [String] -> [FileType] -> [String] -> FileType
  insertFields ds fs fields = case insertFields' ds fs fields of
    [f] -> f

  insertFields' :: [String] -> [FileType] -> [String] -> [FileType]
  insertFields' [d]    (FileType f:fs) fields
    | d == f.name && f."type" == "file" =
      insertFields'' (FileType f) fields : fs
  insertFields' (d:ds) (FileType f:fs) fields
    | d == f.name =
      FileType f{children = insertFields' ds f.children fields} : fs
  insertFields' ds     (f:fs)          fields =
    f : insertFields' ds fs fields

  insertFields'' :: FileType -> [String] -> FileType
  insertFields'' (FileType f) fields =
    FileType f{children = insertField <$> fields}

  insertField :: String -> FileType
  insertField field = FileType {name: field, "type": "field", children: []}

  foreign import unsafeMerge
    "function unsafeMerge(ft) {\
    \  return function (oldKids) {\
    \    return function(c) {\
    \      var kid = c;\
    \      for (var i = 0; i < oldKids.length; ++i) {\
    \        var oldKid = oldKids[i];\
    \        if (oldKid.name == c.name && oldKid.type == c.type) {\
    \          if (oldKid.children != null) {\
    \            kid.children = oldKid.children;\
    \          } else {\
    \            kid.children = [];\
    \          }\
    \          return kid;\
    \        }\
    \      }\
    \      kid.children = [];\
    \      return ft(kid);\
    \    }\
    \  }\
    \};" :: (FileTypeRec -> FileType) -> [FileType] -> FileType -> FileType

  foreign import jsonParse
    "function jsonParse(def) {\
    \  return function(str) {\
    \    try {\
    \      return JSON.parse(str);\
    \    } catch (e) {\
    \      return def;\
    \    }\
    \  }\
    \}" :: forall r. { | r} -> String -> { | r}

  foreign import jsonStringify
    "function jsonStringify(o) {\
    \  return JSON.stringify(o);\
    \}" :: forall r. { | r} -> String

  foreign import unsafeCoerceJSON
    "function unsafeCoerceJSON(json) {\
    \  return json;\
    \}" :: forall r. JSON -> { | r}

  foreign import objectKeys
    "function objectKeys(obj) {\
    \  return Object.keys(obj);\
    \}" :: forall r. { | r} -> [String]

  -- At the moment, the c3 bindings don't allow us to easily do what we need to.
  foreign import createVisual
    "function createVisual(showData) {\
    \  return function(baseUrl) {\
    \    return function(selector) {\
    \      return function(data) {\
    \        return function() {\
    \          if (data.length === 0) {\
    \            return;\
    \          }\
    \          var chart = c3.generate({\
    \              bindto: '#' + selector,\
    \              data: {\
    \                  json: {},\
    \                  type: showData(data[0])\
    \              }\
    \          });\
    \          var jsons = {};\
    \          data.map(function(datum) {\
    \              oboe(baseUrl + datum.path).node('!', function(json) {\
    \                  datum.fields.map(function(field) {\
    \                      if (jsons[field] == null) {\
    \                          jsons[field] = [];\
    \                      }\
    \                      jsons[field].push(json[field]);\
    \                  });\
    \                  chart.load({json: jsons});\
    \              });\
    \          });\
    \        }\
    \      }\
    \    }\
    \  }\
    \}" :: forall eff
        .  (VisualData -> String)
        -> String
        -> String
        -> [VisualData]
        -> Eff (timer :: Timer, c3 :: DOM | eff) Unit

  showVisualType (VisualData v) = show v."type"

  -- SlamEngine currently barfs if you POST some JSON with the same _id.
  foreign import deleteID
    "function deleteID(notebook) {\
    \  delete notebook._id;\
    \  return notebook;\
    \}" :: NotebookRec -> NotebookRec
