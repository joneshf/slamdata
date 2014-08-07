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
  import Control.Lens ((^.), (..), lens, LensP())
  import Control.Monad (when)
  import Control.Monad.Eff (Eff(..))
  import Control.Monad.Identity (Identity())
  import Control.Monad.Cont.Trans (runContT, ContT(..))

  import Data.Argonaut.Encode
  import Data.Argonaut.Decode
  import Data.Argonaut.Parser
  import Data.Argonaut.Printer (printToString)
  import Data.Either (either, Either())
  import Data.Function (mkFn0, mkFn1, mkFn2, mkFn3, Fn0(), Fn1(), Fn2(), Fn3())
  import Data.Maybe (isJust, maybe, Maybe(..))
  import Data.Maybe.Unsafe (fromJust)

  import Debug.Trace (trace, print, Trace())

  import Global (Error())

  import Node.Encoding (Encoding(..))
  import Node.Events (on, Event(..), EventEff(), EventEmitter)
  import Node.FS (FS())
  import Node.FS.Sync (writeTextFile)
  import Node.Path (join, FilePath())
  import Node.Webkit
    ( closeWindow
    , guiShell
    , guiWindow
    , ignore
    , onClose
    , onNewWinPolicy
    , openExternal
    , NWGUI()
    )

  import SlamData (slamData)
  import SlamData.Lens
  import SlamData.Helpers (defaultSDConfig, defaultSEConfig, getOrElse)
  import SlamData.Types
    ( Mounting()
    , Settings()
    , SDConfig(..)
    , SEConfig(..)
    )

  import qualified Data.Map as M

  -- TODO: The majority of this needs to be moved to separate modules.
  -- There's about 200 lines of ffi boilerplate here.

  instance eventEmitterChildProcess :: EventEmitter ChildProcess
  instance eventEmitterStreamStdout :: EventEmitter (Stream Stdout)
  instance eventEmitterStreamStderr :: EventEmitter (Stream Stderr)

  foreign import data ChildProcess :: *
  foreign import data Spawn :: !
  foreign import data Signal :: !
  foreign import data Stream :: ! -> *
  foreign import data Stdout :: !
  foreign import data Stderr :: !
  foreign import data Window :: # *
  foreign import data WindowHistory :: *
  foreign import data WindowHistoryEff :: !

  foreign import child_process
    "var child_process = require('child_process');" :: ChildProcess
  foreign import gui "var gui = require('nw.gui');" :: NWGUI
  foreign import platform "var platform = process.platform;" :: String
  foreign import window :: {history :: WindowHistory}

  windowHistory :: WindowHistory
  windowHistory = window.history

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

  (</>) :: FilePath -> FilePath -> FilePath
  (</>) fp fp' = join [fp, fp']

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

  -- Finally, our actual logic!

  -- PS doesn't do well with instance inference.
  onData :: forall eff ioStream
         .  (EventEmitter (Stream ioStream))
         => Fn1 String (Eff eff Unit)
         -> Stream ioStream
         -> Eff (event :: EventEff | eff) (Stream ioStream)
  onData = on $ Event "data"

  foreign import stringify
    "function stringify(obj) {\
    \  return JSON.stringify(obj, null, 2);\
    \}" :: forall r. { | r} -> String

  foreign import requireConfig
    "function requireConfig(location) {\
    \  return require(location);\
    \}" :: forall r. FilePath -> { | r}

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

  config2String :: forall a. (EncodeJson Identity Identity a) => a -> String
  config2String = printToString <<< encodeIdentity

  showError :: forall eff. Either Error Unit -> Eff (trace :: Trace | eff) Unit
  showError = either print pure

  main = do
    let sdConfigStr = requireConfig sdConfigFile # stringify
    let sdConfigM = parseMaybe sdConfigStr >>= decodeMaybe
    let sdConfig = sdConfigM `getOrElse` defaultSDConfig

    let seConfigStr = requireConfig seConfigFile # stringify
    let seConfigM = parseMaybe seConfigStr >>= decodeMaybe
    let seConfig = seConfigM `getOrElse` defaultSEConfig

    let java = sdConfig^._sdConfigRec.._nodeWebkit.._java
    -- Start up SlamEngine.
    se <- spawn java ["-jar", seJar, seConfigFile]
    -- Log out things.
    stdout se # onData (mkFn1 \msg -> trace $ "stdout: " ++ msg)
    stderr se # onData (mkFn1 \msg -> trace $ "stderr: " ++ msg)

    win <- guiWindow gui
    -- Open links in the user's default method, e.g. in the browser.
    onNewWinPolicy (mkFn3 \_ url policy ->
      (guiShell gui >>= openExternal url) *>
      ignore policy) win
    -- Cleanup after ourselves.
    onClose (mkFn0 \_ -> kill se *> closeWindow win *> trace "gone") win
    -- Pass down the config  to the web page.
    runContT
      (slamData {sdConfig: sdConfig, seConfig: seConfig})
      \{sdConfig = sdC, seConfig = seC} -> do
        writeTextFile UTF8 sdConfigFile (config2String sdC) >>= showError
        writeTextFile UTF8 seConfigFile (config2String seC) >>= showError
