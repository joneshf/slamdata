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
  import Control.Events (Event(..), EventEff(), EventEmitter)
  import Control.Lens ((^.), (..), (.~), (%~))
  import Control.Monad.Eff (Eff())
  import Control.Monad.Eff.Exception
    ( catchException
    , message
    , Error()
    , Exception()
    )
  import Control.Reactive.Timer (Timer())
  import Control.Monad.ST
    ( modifySTRef
    , newSTRef
    , readSTRef
    , runST
    , writeSTRef
    , ST()
    , STRef()
    )

  import Data.Argonaut (decodeMaybe, encodeJson, jsonParser, printJson)
  import Data.Argonaut.Decode (DecodeJson)
  import Data.Argonaut.Encode (EncodeJson)
  import Data.Array (snoc)
  import Data.Either (either, Either(..))
  import Data.Function (mkFn0, mkFn1, mkFn3, runFn1, Fn1())
  import Data.Maybe (maybe, Maybe(..))
  import Data.Maybe.Unsafe (fromJust)
  import Data.Moment (now, Now())

  import Debug.Trace (trace, print, Trace())

  import DOM (DOM())

  import Node.ChildProcess (defaultSpawnOptions, spawn, ChildProcess(..), Spawn(), Stream())
  import Node.ChildProcess.Signal (sigterm)
  import Node.Domain (create, run, Domain(), DomainEff())
  import Node.Encoding (Encoding(UTF8))
  import Node.Events
    ( emit
    , emitter
    , on
    , Emitter()
    )
  import Node.FS (FS())
  import Node.FS.Sync (exists, readTextFile, writeTextFile)
  import Node.Path (join, FilePath())
  import Node.WebKit
    ( nwShell
    , openExternal
    )
  import Node.WebKit.Menu (setWindowMenu)
  import Node.WebKit.Types
    ( NW()
    , NWWindow()
    , WindowPolicyEff()
    )
  import Node.WebKit.Window
    ( closeWindow
    , get
    , ignore
    , nwWindow
    , onClose
    , onNewWinPolicy
    )

  import React.Types (React())

  import SlamData (slamData)
  import SlamData.App.Events (handleRequest)
  import SlamData.Helpers
    ( defaultSDConfig
    , defaultSEConfig
    , getOrElse
    , initialState
    , mount
    )
  import SlamData.Lens
    ( _logs
    , _sdConfig
    , _sdConfigRec
    , _seConfig
    , _settings
    )
  import SlamData.NodeWebKit.Menu (menu)
  import SlamData.Types
    ( requestEvent
    , responseEvent
    , Log(..)
    , SlamDataEvent(..)
    , SlamDataEventTy(..)
    , SlamDataState()
    , SDConfig()
    , SEConfig(..)
    )
  import SlamData.Types.Workspace.FileSystem (FileType(..))

  import System.Path.Unix ((</>), joinPath, normalize, win2Unix)

  import qualified Data.Map as M

  foreign import data Process :: !

  foreign import platform "var platform = process.platform;" :: String

  foreign import execPath """
    function execPath() {
      return process.execPath;
    }
  """ :: forall eff. Eff (process :: Process | eff) FilePath

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

  linuxConfigHome :: Maybe FilePath
  linuxConfigHome = env "XDG_CONFIG_HOME"
                <|> (\home -> join [home, ".config"]) <$> env "HOME"

  resolveConfigDir :: FilePath
  resolveConfigDir = join case platform of
    "darwin" -> [fromJust $ env "HOME", "Library", "Application Support", "SlamData"]
    "linux"  -> [fromJust linuxConfigHome, "SlamData"]
    "win32"  -> [fromJust $ env "LOCALAPPDATA", "SlamData"]

  sdConfigFile :: FilePath
  sdConfigFile = join [resolveConfigDir, "slamdata-config.json"]
  seConfigFile :: FilePath
  seConfigFile = join [resolveConfigDir, "slamengine-config.json"]
  seJar :: FilePath
  seJar = join ["jar", "slamengine.jar"]

  showConfig :: forall a. (EncodeJson a) => a -> String
  showConfig = encodeJson >>> printJson

  parseConfig :: forall a. (DecodeJson a) => String -> Maybe a
  parseConfig config = case jsonParser config  of
    Left err -> Nothing
    Right config -> decodeMaybe config

  showError :: forall eff. Either Error Unit -> Eff (trace :: Trace | eff) Unit
  showError = either print pure

  catchRead :: forall eff
            .  String
            -> Emitter
            -> Eff ( err :: Exception
                   , event :: EventEff
                   , fs :: FS
                   , now :: Now
                   , trace :: Trace
                   | eff) String
            -> Eff ( event :: EventEff
                   , fs :: FS
                   , now :: Now
                   , trace :: Trace
                   | eff) String
  catchRead def e = catchException \err -> do
    m <- now
    let log = LogError m $ "Error reading file\n" ++ message err ++ "\ndefaulting."
    e # emit requestEvent (SlamDataEvent {event: LogMessage log})
    pure def

  javaBinary :: forall eff. Eff (process :: Process | eff) FilePath
  javaBinary = do
    ep <- execPath
    pure $ case platform of
      "win32"  -> normalize $ joinPath [win2Unix ep, "..", "jre", "bin", "java.exe"]
      "linux"  -> normalize $ joinPath [ep, "..", "jre", "bin", "java"]
      "darwin" -> normalize $ joinPath [ep, "..", "..", "..", "..", "..", "Resources", "jre", "bin", "java"]

  startSlamEngine :: forall eff h
                  .  NWWindow
                  -> Maybe ChildProcess
                  -> Emitter
                  -> STRef h SlamDataState
                  -> Eff ( event   :: EventEff
                         , fs      :: FS
                         , now     :: Now
                         , nw      :: NW
                         , process :: Process
                         , spawn   :: Spawn
                         , st      :: ST h
                         , trace   :: Trace
                         | eff
                         ) (Maybe ChildProcess)
  startSlamEngine win cp e stState = do
    maybe (pure unit) (\(ChildProcess se) -> pure (runFn1 se.kill sigterm) *> pure unit) cp
    java <- javaBinary
    sdConfigStr <- catchRead "" e $ readTextFile UTF8 sdConfigFile
    seConfigStr <- catchRead "" e $ readTextFile UTF8 seConfigFile
    let sdConfig = parseConfig sdConfigStr `getOrElse` defaultSDConfig
    let seConfig = parseConfig seConfigStr `getOrElse` defaultSEConfig
    modifySTRef stState $ (_settings.._sdConfig.~sdConfig) .. (_settings.._seConfig.~seConfig)

    -- Start up SlamEngine.
    ChildProcess se <- spawn java ["-jar", seJar, seConfigFile] defaultSpawnOptions
    -- Log out things.
    se.stdout # on (Event "data") (mkFn1 \msg -> do
      m <- now
      let log = LogInfo m $ "" ++ msg
      e # emit requestEvent (SlamDataEvent {event: LogMessage log})
      pure unit)
    se.stderr # on (Event "data") (mkFn1 \msg -> do
      m <- now
      let log = LogError m $ "" ++ msg
      e # emit requestEvent (SlamDataEvent {event: LogMessage log})
      pure unit)
    -- Cleanup after ourselves.
    win # onClose (mkFn0 \_ -> do
      pure $ runFn1 se.kill sigterm
      closeWindow true win
      pure unit)
    pure $ Just $ ChildProcess se

  main :: forall h. Eff ( domain  :: DomainEff
                        , dom     :: DOM
                        , event   :: EventEff
                        , fs      :: FS
                        , now     :: Now
                        , nw      :: NW
                        , policy  :: WindowPolicyEff
                        , process :: Process
                        , react   :: React
                        , spawn   :: Spawn
                        , timer   :: Timer
                        , trace   :: Trace
                        ) Domain
  main = runST do
    e <- emitter
    domain <- create
    -- We're just logging to the console,
    -- but we should actually send these errors somewhere.
    -- Either user facing, or back to us to aggregate/deal with.
    domain # on (Event "error") (\err -> do
      m <- now
      let log = LogError m $ "Error: " ++ err.message
      e # emit requestEvent (SlamDataEvent {event: LogMessage log}))
    domain # run do
      stState <- newSTRef $ initialState defaultSDConfig defaultSEConfig
      win <- nwWindow >>= get

      -- Open links in the user's default method, e.g. in the browser.
      win # onNewWinPolicy (mkFn3 \_ url policy -> do
        nwShell >>= openExternal url
        ignore policy)

      configExists <- (&&) <$> exists sdConfigFile <*> exists seConfigFile
      se <- if configExists
        then startSlamEngine win Nothing e stState
        else pure Nothing
      -- FIXME: It'd be nice to not have to use `ST`.
      -- Might be able to get away from this if we move this blob of stuff out into its own function.
      -- Then we can use `State`, though, does it really make a difference?
      stSE <- newSTRef se
      -- Set the menubar.
      menu win e >>= flip setWindowMenu win

      -- Handle all of the normal events.
      e # on requestEvent (handleRequest e stState)
      -- Handle node-webkit specific events.
      e # on requestEvent \{event = event} -> case event of
        SaveSDConfig sdC -> do
          writeTextFile UTF8 sdConfigFile (showConfig sdC)
          state <- modifySTRef stState $ _settings.._sdConfig .~ sdC
          se <- readSTRef stSE
          se' <- startSlamEngine win se e stState
          writeSTRef stSE se'
          e # emit responseEvent state
          pure unit
        SaveSEConfig seC -> do
          writeTextFile UTF8 seConfigFile (showConfig seC)
          state <- modifySTRef stState $ _settings.._seConfig .~ seC
          se <- readSTRef stSE
          se' <- startSlamEngine win se e stState
          writeSTRef stSE se'
          e # emit responseEvent state
          pure unit
        _ -> pure unit

      -- Start up SlamData.
      state <- readSTRef stState
      slamData e state
