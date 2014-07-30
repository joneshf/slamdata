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

  import Control.Apply ((*>))
  import Control.Monad (when)
  import Control.Monad.Eff (Eff(..))
  import Control.Monad.Cont.Trans (runContT, ContT(..))

  import Data.Function (mkFn0, mkFn1, mkFn2, mkFn3, Fn0(), Fn1(), Fn2(), Fn3())
  import Data.Maybe (isJust, Maybe(..))
  import Data.Maybe.Unsafe (fromJust)

  import Debug.Trace (trace)

  -- We need to explicitly import prelude stuff
  -- and run psc with --no-prelude
  -- because slamdata.js comes with prelude,
  -- and psc doesn't want to play nice without this.
  import Prelude
    ( ($)
    , (#)
    , (<>)
    , (>>=)
    , (<<<)
    , (<$>)
    , (<|>)
    , pure
    , unit
    , Unit()
    )

  import SlamData (slamData)
  import SlamData.Types (FilePath(), FS(), FSWrite(), Mounting())

  import qualified Data.Map as M

  -- TODO: The majority of this needs to be moved to separate modules.
  -- There's about 200 lines of ffi boilerplate here.

  class EventEmitter e

  instance eventEmitterChildProcess :: EventEmitter ChildProcess
  instance eventEmitterNWWindow :: EventEmitter NWWindow
  instance eventEmitterStreamStdout :: EventEmitter (Stream Stdout)
  instance eventEmitterStreamStderr :: EventEmitter (Stream Stderr)

  class Variadic func ret

  instance variadicFn0 :: Variadic (Fn0 a) a
  instance variadicFn1 :: Variadic (Fn1 a b) b
  instance variadicFn2 :: Variadic (Fn2 a b c) c
  instance variadicFn3 :: Variadic (Fn3 a b c d) d

  foreign import data ChildProcess :: *
  foreign import data IFrame :: *
  foreign import data NWGUI :: *
  foreign import data NWShell :: *
  foreign import data NWWindow :: *
  foreign import data NW :: !
  foreign import data Path :: *
  foreign import data Process :: *
  foreign import data Spawn :: !
  foreign import data Signal :: !
  foreign import data Stream :: ! -> *
  foreign import data Stdout :: !
  foreign import data Stderr :: !
  foreign import data Window :: # *
  foreign import data WindowHistory :: *
  foreign import data WindowPolicy :: *
  foreign import data WindowHistoryEff :: !
  foreign import data WindowPolicyEff :: !

  foreign import child_process
    "var child_process = require('child_process');" :: ChildProcess
  foreign import fs "var fs = require('fs');" :: FS
  foreign import gui "var gui = require('nw.gui');" :: NWGUI
  foreign import path "var path = require('path');" :: Path
  foreign import platform "var platform = process.platform;" :: String
  foreign import process :: Process
  foreign import window :: {history :: WindowHistory}

  windowHistory :: WindowHistory
  windowHistory = window.history

  foreign import writeFileSync
    "function writeFileSync(path) {\
    \  return function(data) {\
    \    return function() {\
    \      fs.writeFileSync(path, data);\
    \    }\
    \  }\
    \}" :: forall eff. FilePath -> String -> Eff (fsWrite :: FSWrite | eff) Unit

  foreign import replaceState
    "function replaceState(state) {\
    \  return function(title) {\
    \    return function(url) {\
    \      return function() {\
    \        window.history.replaceState(state, title, url);\
    \      }\
    \    }\
    \  }\
    \}" :: forall eff r
        .  { | r}
        -> String
        -> String
        -> Eff (windowHistory :: WindowHistoryEff | eff) Unit

  foreign import unsafeEnv
    "function unsafeEnv(nothing) {\
    \  return function(just) {\
    \    return function(key) {\
    \      var val = process.env[key];\
    \      return val === null || val === undefined ? nothing : just(val);\
    \    }\
    \  }\
    \}" :: Maybe String -> (String -> Maybe String) -> String -> Maybe String

  env :: String -> Maybe String
  env = unsafeEnv Nothing Just

  foreign import spawn
    "function spawn(proc) {\
    \  return function(args) {\
    \    return function() {\
    \      return child_process.spawn(proc, args);\
    \    }\
    \  }\
    \}" :: forall eff
        .  String
        -> [String]
        -> Eff (spawn :: Spawn | eff) ChildProcess

  foreign import joinPath
    "function joinPath(paths) {\
    \  return path.join.apply(null, paths);\
    \}" :: [String] -> String

  (</>) :: FilePath -> FilePath -> FilePath
  (</>) fp fp' = joinPath [fp, fp']

  foreign import guiShell
    "function guiShell(gui) {\
    \  return function() {\
    \    return gui.Shell;\
    \  }\
    \}" :: forall eff. NWGUI -> Eff (nw :: NW | eff) NWShell

  foreign import guiWindow
    "function guiWindow(gui) {\
    \  return function() {\
    \    return gui.Window.get();\
    \  }\
    \}" :: forall eff. NWGUI -> Eff (nw :: NW | eff) NWWindow

  foreign import openExternal
    "function openExternal(url) {\
    \  return function(shell) {\
    \    return function() {\
    \      return shell.openExternal(url);\
    \    }\
    \  }\
    \}" :: forall eff. String -> NWShell -> Eff (nw :: NW | eff) NWShell

  foreign import showDevTools
    "function showDevTools(win) {\
    \  return function() {\
    \    return win.showDevTools();\
    \  }\
    \}" :: forall eff. NWWindow -> Eff (nw :: NW | eff) NWWindow

  foreign import closeWindow
    "function closeWindow(win) {\
    \  return function() {\
    \    return win.close(true);\
    \  }\
    \}" :: forall eff. NWWindow -> Eff (nw :: NW | eff) NWWindow

  foreign import kill
    "function kill(child) {\
    \  return function() {\
    \    return child.kill();\
    \  }\
    \}" :: forall eff. ChildProcess -> Eff (signal :: Signal | eff) Unit

  foreign import stdout
    "function stdout(child) {\
    \  return child.stdout;\
    \}" :: ChildProcess -> Stream Stdout

  foreign import stderr
    "function stderr(child) {\
    \  return child.stderr;\
    \}" :: ChildProcess -> Stream Stderr

  foreign import windowPolicy
    "function windowPolicy(method) {\
    \  return function(policy) {\
    \    return function() {\
    \      return policy[method]();\
    \    }\
    \  }\
    \}" :: forall eff
        .  String
        -> WindowPolicy
        -> Eff (policy :: WindowPolicyEff | eff) Unit

  ignore         :: forall e. WindowPolicy -> Eff (policy :: WindowPolicyEff | e) Unit
  ignore         = windowPolicy "ignore"
  forceCurrent   :: forall e. WindowPolicy -> Eff (policy :: WindowPolicyEff | e) Unit
  forceCurrent   = windowPolicy "forceCurrent"
  forceDownload  :: forall e. WindowPolicy -> Eff (policy :: WindowPolicyEff | e) Unit
  forceDownload  = windowPolicy "forceDownload"
  forceNewWindow :: forall e. WindowPolicy -> Eff (policy :: WindowPolicyEff | e) Unit
  forceNewWindow = windowPolicy "forceNewWindow"
  forceNewPopup  :: forall e. WindowPolicy -> Eff (policy :: WindowPolicyEff | e) Unit
  forceNewPopup  = windowPolicy "forceNewPopup"

  foreign import onEvent
    "function onEvent(__emitter) {\
    \  return function(__variadic) {\
    \    return function(event) {\
    \      return function(cb) {\
    \        return function(child) {\
    \          return function() {\
    \            return child.on(event, function () {\
    \              return cb.apply(this, arguments)();\
    \            }.bind(this));\
    \          }\
    \        }\
    \      }\
    \    }\
    \  }\
    \}" :: forall eff emitter fn
        .  (EventEmitter emitter, Variadic fn (Eff eff Unit))
        => String
        -> fn
        -> emitter
        -> Eff eff emitter

  onData :: forall eff ioStream
         .  (EventEmitter (Stream ioStream))
         => (String -> Eff eff Unit)
         -> Stream ioStream
         -> Eff eff (Stream ioStream)
  onData = onEvent "data" <<< mkFn1

  onCloseNWWindow :: forall eff
          .  (Unit -> Eff eff Unit)
          -> NWWindow
          -> Eff eff NWWindow
  onCloseNWWindow = onEvent "close" <<< mkFn0

  onNewWinPolicy :: forall eff
          .  (Maybe IFrame -> String -> WindowPolicy -> Eff eff Unit)
          -> NWWindow
          -> Eff eff NWWindow
  onNewWinPolicy = onEvent "new-win-policy" <<< mkFn3

  mEmpty_ :: M.Map String Mounting
  mEmpty_ = M.empty

  mInsert :: String -> Mounting -> M.Map String Mounting -> M.Map String Mounting
  mInsert = M.insert

  -- Finally, our actual logic!

  foreign import stringify
    "function stringify(obj) {\
    \  return JSON.stringify(obj, null, 2);\
    \}" :: forall r. { | r} -> String

  foreign import requireConfig
    "function requireConfig(location) {\
    \  return require(location);\
    \}" :: forall r. FilePath -> { | r}

  foreign import rawMountings2Mountings
    "function rawMountings2Mountings(raw) {\
    \  var mountings = mEmpty_;\
    \  for (var path in raw) {\
    \    mountings = mInsert(path)(raw[path])(mountings);\
    \  }\
    \  return mountings;\
    \}" :: forall r. { | r} -> M.Map String Mounting

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

  main = do
    let sdConfig = requireConfig sdConfigFile
    let seConfig = requireConfig seConfigFile
    let sdServer = sdConfig.server
    -- Start up SlamEngine.
    se <- spawn sdConfig.nodeWebkit.java ["-jar", seJar, seConfigFile]
    -- Log out things.
    stdout se # onData (trace <<< (<>) "stdout: ")
    stderr se # onData (trace <<< (<>) "stderr: ")

    win <- guiWindow gui
    -- Open links in the user's default method, e.g. in the browser.
    onNewWinPolicy (\_ url policy ->
      (guiShell gui >>= openExternal url) *>
      ignore policy) win
    -- Cleanup after ourselves.
    onCloseNWWindow (\_ -> kill se *> closeWindow win *> trace "gone") win
    -- Pass down the config  to the web page.
    runContT (slamData
             { sdConfig: { server: {location: sdServer.location, port: sdServer.port}
                         , nodeWebkit: {java: Just sdConfig.nodeWebkit.java}
                         }
             , seConfig: Just { server: {port: seConfig.server.port}
                              , mountings: rawMountings2Mountings seConfig.mountings
                              }
             })
             \{sdConfig = sdC, seConfig = seC} -> do
                writeFileSync sdConfigFile (stringify sdC)
                when (isJust seC) $
                  writeFileSync seConfigFile $ stringify $ fromJust seC
