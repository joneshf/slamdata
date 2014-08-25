module SlamData.NodeWebKit where

  -- |  This is the Node-Webkit runner for SlamData.
  --    You will need to have the SlamData lib available (ps or js + externs).
  --    It also expects a config file to exist for both SlamData and SlamEngine.
  --    The config files should be named `slamdata-config.json` and
  --    `slamengine-config.json` respectively.
  --    It also requires a SlamEngine server jar located at
  --    `./jar/slamengine_2.10-0.1-SNAPSHOT-one-jar.jar`

  --    The way it works is that it spins up the SlamEngine server and
  --    then starts SlamData.

  import Control.Alt ((<|>))
  import Control.Apply ((*>))
  import Control.Lens ((^.), (..), (.~), (~))
  import Control.Monad.Eff (Eff(..))
  import Control.Monad.Identity (Identity())
  import Control.Monad.Cont.Trans (runContT)
  import Control.Monad.Eff.Exception (Error())
  import Control.Reactive.Timer (timeout, Timer())

  import Data.Argonaut (decodeMaybe, encodeJson, jsonParser, printJson)
  import Data.Argonaut.Decode (DecodeJson)
  import Data.Argonaut.Encode (EncodeJson)
  import Data.Array (filter, head, last, length, nubBy, snoc)
  import Data.Either (either, Either(..))
  import Data.Function (mkFn0, mkFn1, mkFn3, runFn1, Fn1())
  import Data.Maybe (Maybe(..))
  import Data.Maybe.Unsafe (fromJust)
  import Data.String (joinWith, split, trim)
  import Data.Tuple (fst)

  import Debug.Trace (trace, print, Trace())

  import DOM (DOM())

  import Network.HTTP (Verb(..))
  import Network.Oboe (done, oboe, oboeGet, oboeOptions, JSON())

  import Node.ChildProcess (defaultSpawnOptions, spawn, ChildProcess(..), Stream())
  import Node.ChildProcess.Signal (sigterm)
  import Node.Domain (create, run)
  import Node.Encoding (Encoding(UTF8))
  import Node.Events (emit, emitter, on, Event(..), EventEff(), EventEmitter)
  import Node.FS.Sync (writeTextFile)
  import Node.Path (basename, join, FilePath())
  import Node.UUID (runUUID, v4)
  import Node.WebKit
    ( nwShell
    , openExternal
    )
  import Node.WebKit.Menu
    ( append
    , createMacBuiltin
    , defaultMacOptions
    , nwMenu
    , nwWindowMenu
    , setWindowMenu
    )
  import Node.WebKit.MenuItem
    ( defaultMenuItemOptions
    , nwMenuItem
    , onClick
    )
  import Node.WebKit.Types
    ( nwMenuItemModCmd
    , nwMenuItemModCtrl
    )
  import Node.WebKit.Window
    ( closeWindow
    , get
    , ignore
    , nwWindow
    , onClose
    , onNewWinPolicy
    )

  import Showdown (makeHtml)

  import SlamData (slamData)
  import SlamData.Lens
    ( _children
    , _fileTypeRec
    , _files
    , _java
    , _mountings
    , _nodeWebkit
    , _sdConfigNodeWebkit
    , _sdConfigRec
    , _seConfigRec
    )
  import SlamData.Helpers
    ( defaultMountPath
    , defaultSDConfig
    , defaultSEConfig
    , getOrElse
    , serverURI

    )
  import SlamData.Types
    ( requestEvent
    , responseEvent
    , SlamDataEventTy(..)
    , SEConfig(..)
    )
  import SlamData.Types.Workspace.Notebook.Block
    ( Block(..)
    , BlockID(..)
    , BlockMode(..)
    , BlockType(..)
    )
  import SlamData.Types.Workspace.Notebook.Block.Visual (VisualData(..))
  import SlamData.Types.Workspace.FileSystem (FileType(..), FileTypeRec())
  import SlamData.Types.Workspace.Notebook
    ( Notebook(..)
    , NotebookID(..)
    , NotebookRec(..)
    )
  import Text.Parsing.Parser (runParser)

  import qualified Data.Map as M
  import qualified Network.XHR as X
  import qualified Network.XHR.Types as XT

  foreign import platform "var platform = process.platform;" :: String

  foreign import unsafeEnv
    "function unsafeEnv(nothing) {\
    \  return function(just) {\
    \    return function(key) {\
    \      var val = process.env[key];\
    \      return val == null ? nothing : just(val);\
    \    }\
    \  }\
    \}" :: Maybe String -> (String -> Maybe String) -> String -> Maybe String

  env :: String -> Maybe String
  env = unsafeEnv Nothing Just

  (</>) :: FilePath -> FilePath -> FilePath
  (</>) fp fp' = join [fp, fp']

  -- PS doesn't do well with instance inference.
  onData :: forall eff ioStream
         .  (EventEmitter (Stream ioStream))
         => Fn1 String (Eff eff Unit)
         -> Stream ioStream
         -> Eff (event :: EventEff | eff) (Stream ioStream)
  onData = on $ Event "data"

  foreign import requireConfig
    "function requireConfig(location) {\
    \  return JSON.stringify(require(location));\
    \}" :: forall r. FilePath -> String

  linuxConfigHome :: Maybe FilePath
  linuxConfigHome = env "XDG_CONFIG_HOME"
                <|> (\home -> home </> ".config") <$> env "HOME"

  resolveConfigDir :: FilePath
  resolveConfigDir = case platform of
    "darwin" -> fromJust $
      env "HOME" </> "Library" </> "Application Support" </> "slamdata"
    "linux"  -> fromJust linuxConfigHome </> "slamdata"
    "win32"  -> fromJust $ env "LOCALAPPDATA" </> "slamdata"

  sdConfigFile :: FilePath
  sdConfigFile = resolveConfigDir </> "slamdata-config.json"
  seConfigFile :: FilePath
  seConfigFile = resolveConfigDir </> "slamengine-config.json"
  seJar :: FilePath
  seJar = "jar" </> "slamengine_2.10-0.1-SNAPSHOT-one-jar.jar"

  showConfig :: forall a. (EncodeJson a) => a -> String
  showConfig = encodeJson >>> printJson

  parseConfig :: forall a. (DecodeJson a) => String -> Maybe a
  parseConfig config = case runParser (requireConfig config) jsonParser of
    Left err -> Nothing
    Right config -> decodeMaybe config

  showError :: forall eff. Either Error Unit -> Eff (trace :: Trace | eff) Unit
  showError = either print pure

  mount :: SEConfig -> String
  mount (SEConfig {mountings = m}) =
    (fst <$> head (M.toList m)) `getOrElse` defaultMountPath

  main = do
    domain <- create
    -- We're just logging to the console,
    -- but we should actually send these errors somewhere.
    -- Either user facing, or back to us to aggregate/deal with.
    domain # on (Event "error") (\err -> trace $ "stderr: " ++ err.message)
    domain # run do
      let sdConfig = parseConfig sdConfigFile `getOrElse` defaultSDConfig
      let seConfig = parseConfig seConfigFile `getOrElse` defaultSEConfig
      let java = sdConfig^._sdConfigRec.._nodeWebkit.._sdConfigNodeWebkit.._java

      -- Start up SlamEngine.
      ChildProcess se <- spawn "java" ["-jar", seJar, seConfigFile] defaultSpawnOptions
      -- Log out things.
      se.stdout # onData (mkFn1 \msg -> trace $ "stdout: " ++ msg)
      se.stderr # onData (mkFn1 \msg -> trace $ "stderr: " ++ msg)

      win <- nwWindow >>= get
      -- Open links in the user's default method, e.g. in the browser.
      win # onNewWinPolicy (mkFn3 \_ url policy -> do
        nwShell >>= openExternal url
        ignore policy)

      -- Cleanup after ourselves.
      win # onClose (mkFn0 \_ -> do
        pure $ runFn1 se.kill sigterm
        closeWindow true win
        pure unit)

      -- Make the menubar.
      -- We only need to make a File menu for linux/win.
      menu <- if platform == "darwin" then
          nwWindowMenu >>= createMacBuiltin "SlamData" defaultMacOptions
        else do
          quitItem <- nwMenuItem defaultMenuItemOptions
            { label = "Quit"
            , click = closeWindow false win
            , key = "Q"
            , modifiers = nwMenuItemModCtrl
            }
          fileMenuItems <- nwMenu >>= append quitItem
          fileMenu <- nwMenuItem defaultMenuItemOptions
            { label = "File"
            , submenu = Just fileMenuItems
            }
          nwWindowMenu >>= append fileMenu
      setWindowMenu menu win

      -- Make an emitter.
      e <- emitter
      let respond d = e # emit responseEvent d
      e # on requestEvent (\{event = event, state = state} -> case event of
        SaveSDConfig sdC ->
          writeTextFile UTF8 sdConfigFile (showConfig sdC)
        SaveSEConfig seC ->
          writeTextFile UTF8 seConfigFile (showConfig seC)
        ReadFileSystem paths -> do
          let path = join paths
          let fs = serverURI state.settings.sdConfig ++ "/metadata/fs" ++ path
          o <- oboeGet fs
          done o (\json ->
            let children = (unsafeCoerceJSON json).children
                files' = insertChildren paths [state.files] children
            in e # emit responseEvent state{files = files'})
          pure unit
        ReadFields paths -> do
          let path = join paths
          let fs = serverURI state.settings.sdConfig ++ "/data/fs" ++ path ++ "?limit=1"
          o <- oboeGet fs
          done o (\json ->
            let fields = objectKeys $ unsafeCoerceJSON json
                files' = insertFields paths [state.files] fields
            in e # emit responseEvent state{files = files'})
          pure unit
        CreateNotebook -> do
          ident <- NotebookID <$> v4
          let name = "Untitled" ++ show (length state.notebooks + 1)
          let path = mount state.settings.seConfig
          let notebook = Notebook {ident: ident, blocks: [], name: name, path: path, published: false}
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
        CreateBlock ident ty -> do
          ident' <- BlockID <$> v4
          let block = Block { ident: ident'
                            , blockType: ty
                            , blockMode: BlockMode "Edit"
                            , editContent: ""
                            , evalContent: ""
                            , label: ""
                            }
          let notebooks' = createBlock ident block <$> state.notebooks
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
          let blockName = "out" ++ show (countOut n)
          let queryUrl = serverURI state.settings.sdConfig ++ "/query/fs" ++ n.path
          let dataUrl = serverURI state.settings.sdConfig ++ "/data/fs"
          let out = n.name ++ "/" ++ blockName ++ ".json"
          X.post X.defaultAjaxOptions
            { onReadyStateChange = X.onDone \res -> do
              out' <- jsonParse {out: ""} <$> X.getResponseText res
              X.get X.defaultAjaxOptions
                { headers = ["Content-Type" ~ "text/plain"]
                , onLoad = \res -> do
                  content <- X.getResponseText res
                  let block'' = Block b{ blockMode = BlockMode "Eval"
                                       , evalContent = content
                                       , label = blockName
                                       }
                  let notebooks' = updateBlock n.ident block'' <$> state.notebooks
                  e # emit responseEvent state{notebooks = notebooks'}
                  pure unit
                } (dataUrl ++ out'.out) {limit: 20}
              pure unit
            } queryUrl {out: out} (XT.Multipart b.editContent)
          pure unit
        EvalVisual (Notebook n) (Block b@{blockType = BlockType "Visual"}) ds -> do
          let selector = "chart-" ++ show b.ident
          let dataUrl = serverURI state.settings.sdConfig ++ "/data/fs"
          let block' = Block b{ blockMode = BlockMode "Eval"
                              , evalContent = selector
                              }
          let notebooks' = updateBlock n.ident block' <$> state.notebooks
          e # emit responseEvent state{notebooks = notebooks'}
          -- Give it a small amount of time to create the selector.
          timeout 1000 $ createVisual showVisualType dataUrl selector ds
          pure unit
        SaveNotebook (Notebook n) -> do
          let dataUrl = serverURI state.settings.sdConfig ++ "/data/fs"
          let url = dataUrl ++ n.path ++ n.name ++ "/index.nb"
          let n' = deleteID n
          X.post X.defaultAjaxOptions
            { onReadyStateChange = X.onDone \_ ->
              (e # emit responseEvent state) *> pure unit
            } url {} (XT.UrlEncoded $ jsonStringify n')
          pure unit
        OpenNotebook path -> do
          let dataUrl = serverURI state.settings.sdConfig ++ "/data/fs"
          let url = dataUrl ++ (path </> "index.nb")
          let name = basename path
          X.get X.defaultAjaxOptions
            {onLoad = \res -> do
              revisions <- trim >>> split "\n" <$> X.getResponseText res
              case last revisions of
                Nothing -> pure unit
                Just revision -> do
                  i <- NotebookID <$> v4
                  let default = {ident: i, blocks: [], name: name, path: path, published: false}
                  let nb = jsonParse default revision
                  let notebook' = Notebook nb{name = name}
                  let notebooks' = state.notebooks `snoc` notebook'
                  let notebooks'' = nubBy uniqueNotebooks notebooks'
                  e # emit responseEvent state{notebooks = notebooks''}
                  pure unit
            } url {}
          pure unit
        RenameNotebook (Notebook n) path -> do
          let dataUrl = serverURI state.settings.sdConfig ++ "/data/fs"
          let url = dataUrl </> n.path </> n.name </> "index.nb"
          let base = basename path
          let fs = mount state.settings.seConfig
          X.ajax X.defaultAjaxOptions
            { method = "MOVE"
            , url = url
            , headers = ["Destination" ~ (fs </> path </> "index.nb")]
            , onLoad = \_ -> do
              let notebook' = Notebook n{name = base}
              let notebooks' = replaceNotebook notebook' <$> state.notebooks
              e # emit responseEvent state{notebooks = notebooks'}
              pure unit
            } {} XT.NoBody
          pure unit
        TogglePublish (Notebook n) -> do
          let dataUrl = serverURI state.settings.sdConfig ++ "/data/fs"
          let url = dataUrl </> n.path </> n.name </> "index.nb"
          let n' = deleteID n
          let notebook' = Notebook n'{published = not n.published}
          let notebooks' = replaceNotebook notebook' <$> state.notebooks
          e # emit responseEvent state{notebooks = notebooks'}
          pure unit
        _ -> (e # emit responseEvent state) *> pure unit)

      -- Start up SlamData.
      slamData e { files: FileType { name: mount seConfig
                                   , "type": "directory"
                                   , children: []
                                   }
                 , notebooks: []
                 , settings: {sdConfig: sdConfig, seConfig: seConfig}
                 , showSettings: false
                 }

  uniqueNotebooks :: Notebook -> Notebook -> Boolean
  uniqueNotebooks (Notebook nb) (Notebook nb') = nb.ident == nb'.ident

  replaceNotebook :: Notebook -> Notebook -> Notebook
  replaceNotebook n@(Notebook nb) (Notebook nb')
    | nb.ident == nb'.ident = n
  replaceNotebook _ n = n

  countOut :: NotebookRec -> Number
  countOut {blocks = bs} = length $ filter go bs
    where
      go (Block b) =
        b.blockType == BlockType "SQL" && b.blockMode == BlockMode "Eval"

  createBlock :: NotebookID -> Block -> Notebook -> Notebook
  createBlock ident block (Notebook n@{ident = ident', blocks = blocks})
    | ident == ident' = Notebook n{blocks = blocks `snoc` block}
  createBlock _ _ nb = nb

  deleteBlock :: NotebookID -> BlockID -> Notebook -> Notebook
  deleteBlock nID bID (Notebook n@{ident = nID', blocks = blocks})
    | nID == nID' = Notebook n{blocks = filter go blocks}
    where
      go (Block b) = b.ident /= bID
  deleteBlock _ _ nb = nb

  updateBlock :: NotebookID -> Block -> Notebook -> Notebook
  updateBlock ident (Block b) (Notebook n@{ident = ident', blocks = blocks})
    | ident == ident' = Notebook n{blocks = go <$> blocks}
    where
      go (Block b') | b.ident == b'.ident = Block b
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
  mergeKids (FileType f) kids = let kids' = unsafeMerge FileType f.children <$> kids in
    FileType f{children = kids'}

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
    \}" :: forall eff. (VisualData -> String) -> String -> String -> [VisualData] -> Eff (timer :: Timer, c3 :: DOM | eff) Unit

  showVisualType (VisualData v) = show v."type"

  -- SlamEngine currently barfs if you POST some JSON with the same _id.
  foreign import deleteID
    "function deleteID(notebook) {\
    \  delete notebook._id;\
    \  return notebook;\
    \}" :: NotebookRec -> NotebookRec
