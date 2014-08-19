module SlamData.NodeWebkit where

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
  import Control.Lens ((^.), (..), (.~))
  import Control.Monad.Eff (Eff(..))
  import Control.Monad.Identity (Identity())
  import Control.Monad.Cont.Trans (runContT)
  import Control.Monad.Eff.Exception (Error())

  import Data.Argonaut (decodeMaybe, encodeJson, jsonParser, printJson)
  import Data.Argonaut.Decode (DecodeJson)
  import Data.Argonaut.Encode (EncodeJson)
  import Data.Array (filter, head, length, snoc)
  import Data.Either (either, Either(..))
  import Data.Function (mkFn0, mkFn1, mkFn3, runFn1, Fn1())
  import Data.Maybe (Maybe(..))
  import Data.Maybe.Unsafe (fromJust)
  import Data.String (joinWith)
  import Data.Tuple (fst)

  import Debug.Trace (trace, print, Trace())

  import Network.Oboe (done, oboeGet, JSON())

  import Node.ChildProcess (defaultSpawnOptions, spawn, ChildProcess(..), Stream())
  import Node.ChildProcess.Signal (sigterm)
  import Node.Encoding (Encoding(UTF8))
  import Node.Events (emit, emitter, on, Event(..), EventEff(), EventEmitter)
  import Node.FS.Sync (writeTextFile)
  import Node.Path (join, FilePath())
  import Node.UUID (v4)
  import Node.Webkit
    ( closeWindow
    , get
    , ignore
    , nwShell
    , nwWindow
    , onClose
    , onNewWinPolicy
    , openExternal
    )

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
  import SlamData.Types.Workspace.Notebook.Block (Block(..), BlockID(..), BlockMode(..))
  import SlamData.Types.Workspace.FileSystem (FileType(..), FileTypeRec())
  import SlamData.Types.Workspace.Notebook (Notebook(..), NotebookID(..))
  import Text.Parsing.Parser (runParser)

  import qualified Data.Map as M

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
    let sdConfig = parseConfig sdConfigFile `getOrElse` defaultSDConfig
    let seConfig = parseConfig seConfigFile `getOrElse` defaultSEConfig
    let java = sdConfig^._sdConfigRec.._nodeWebkit.._sdConfigNodeWebkit.._java

    -- Start up SlamEngine.
    ChildProcess se <- spawn java ["-jar", seJar, seConfigFile] defaultSpawnOptions
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
      closeWindow win
      pure unit)

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
        let notebook = Notebook {ident: ident, blocks: [], name: name, path: path}
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
        let notebooks' = editBlock n.ident block' <$> state.notebooks
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

  editBlock :: NotebookID -> Block -> Notebook -> Notebook
  editBlock ident (Block b) (Notebook n@{ident = ident', blocks = blocks})
    | ident == ident' = Notebook n{blocks = go <$> blocks}
    where
      go (Block b') | b.ident == b'.ident = Block b
      go b'                               = b'
  editBlock _ _ nb = nb

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

  foreign import unsafeCoerceJSON
    "function unsafeCoerceJSON(json) {\
    \  return json;\
    \}" :: forall r. JSON -> { | r}

  foreign import objectKeys
    "function objectKeys(obj) {\
    \  return Object.keys(obj);\
    \}" :: forall r. { | r} -> [String]
