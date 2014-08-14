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

  import Control.Lens ((^.), (..))
  import Control.Monad.Eff (Eff(..))
  import Control.Monad.Identity (Identity())
  import Control.Monad.Cont.Trans (runContT)
  import Control.Monad.Eff.Exception (Error())

  import Data.Argonaut.Encode (encodeIdentity, EncodeJson)
  import Data.Argonaut.Decode (decodeMaybe, DecodeJson)
  import Data.Argonaut.Parser (parseMaybe)
  import Data.Argonaut.Printer (printToString)
  import Data.Either (either, Either())
  import Data.Function (mkFn0, mkFn1, mkFn3, runFn1, Fn1())
  import Data.Maybe (Maybe(..))
  import Data.Maybe.Unsafe (fromJust)

  import Debug.Trace (trace, print, Trace())

  import Node.ChildProcess (defaultSpawnOptions, spawn, ChildProcess(..), Stream())
  import Node.ChildProcess.Signal (sigterm)
  import Node.Encoding (Encoding(UTF8))
  import Node.Events (emit, emitter, on, Event(..), EventEff(), EventEmitter)
  import Node.FS.Sync (writeTextFile)
  import Node.Path (join, FilePath())
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
  import SlamData.Lens (_java, _nodeWebkit, _sdConfigRec)
  import SlamData.Helpers (defaultSDConfig, defaultSEConfig, getOrElse)
  import SlamData.Types (requestEvent, responseEvent, SlamDataEvent(..))

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

  showConfig :: forall a. (EncodeJson Identity Identity a) => a -> String
  showConfig = encodeIdentity >>> printToString

  parseConfig :: forall a. (DecodeJson Identity (Either String) a) => String -> Maybe a
  parseConfig config = parseMaybe (requireConfig config) >>= decodeMaybe

  showError :: forall eff. Either Error Unit -> Eff (trace :: Trace | eff) Unit
  showError = either print pure

  main = do
    let sdConfig = parseConfig sdConfigFile `getOrElse` defaultSDConfig
    let seConfig = parseConfig seConfigFile `getOrElse` defaultSEConfig
    let java = sdConfig^._sdConfigRec.._nodeWebkit.._java

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
    e # on requestEvent (\event -> case event of
      SaveSDConfig sdC ->
        writeTextFile UTF8 sdConfigFile (showConfig sdC) >>= showError
      SaveSEConfig seC ->
        writeTextFile UTF8 seConfigFile (showConfig seC) >>= showError
      _ -> (e # emit responseEvent "butts") >>= \_ -> trace "butts")

    -- Start up SlamData.
    slamData e {sdConfig: sdConfig, seConfig: seConfig}
