module SlamData.Helpers where

  import Control.Alternative (many)

  import Data.Array (head)
  import Data.Foldable (notElem)
  import Data.Maybe (fromMaybe, Maybe())
  import Data.Path (FilePath())
  import Data.String (indexOf, indexOf', joinWith, lastIndexOf, length, take)
  import Data.Tuple (fst, Tuple(..))
  import Data.Validation (runV)

  import Global (readInt)

  import React.Types (Element())

  import SlamData.Types
    ( Mounting(..)
    , MountingWrapper(..)
    , SDConfig(..)
    , SDConfigServer(..)
    , SEConfig(..)
    , SEConfigServer(..)
    , SlamDataState()
    , Validation()
    , ValidationTy(..)
    )
  import SlamData.Types.Workspace.FileSystem (FileType(..))
  import SlamData.Types.Workspace.Notebook (Notebook(..))

  import System.Path.Unix

  import Text.Parsing.Parser (Parser())
  import Text.Parsing.Parser.Combinators (optional, sepBy, try)
  import Text.Parsing.Parser.String (satisfy, string)

  import qualified Data.Map as M
  import qualified Data.StrMap as SM

  -- Random purescript stuff.

  getOrElse :: forall a. Maybe a -> a -> a
  getOrElse = flip fromMaybe

  endsWith :: String -> String -> Boolean
  endsWith str suffix =
    indexOf' suffix (length str - length suffix) str >= 0

  contains :: String -> String -> Boolean
  contains str str' = indexOf str' str >= 0

  -- SlamData specific stuff.

  activate :: forall a. (Eq a) => a -> a -> String
  activate x y | x == y = " active"
  activate _ _          = ""

  publish :: Notebook -> String
  publish (Notebook {published = true}) = " published"
  publish _                             = ""

  initialState :: SDConfig -> SEConfig -> SlamDataState
  initialState sdConfig seConfig =
    { files: FileType { name: mount seConfig
                      , "type": "directory"
                      , children: []
                      }
    , logs: []
    , notebooks: []
    , settings: {sdConfig: sdConfig, seConfig: seConfig}
    , showSettings: false
    , showConfig: false
    , validation: M.empty
    }

  defaultState :: SlamDataState
  defaultState = initialState defaultSDConfig defaultSEConfig

  runV' :: Validation -> ValidationTy -> String
  runV' v ty = runV id (const "") $ extractV v ty
    where
      extractV v ty = M.lookup ty v `getOrElse` pure unit

  formatNotebookName :: String -> String
  formatNotebookName name = case lastIndexOf ".nb" name of
    -1 -> name
    n  -> take n name

  -- | Server stuff.

  defaultServerLocation = "http://localhost"
  defaultServerPort = 20223
  defaultMountPath = "/"
  defaultMongoURI = "mongodb://localhost:27017"
  defaultMongoDatabase = "test"

  defaultServerURI :: String
  defaultServerURI = defaultServerLocation ++ ":" ++ show defaultServerPort

  defaultSDConfig :: SDConfig
  defaultSDConfig = SDConfig
    { server: SDConfigServer { location: defaultServerLocation
                             , port: defaultServerPort
                             }
    }

  defaultSEConfig :: SEConfig
  defaultSEConfig = SEConfig
    { server: SEConfigServer {port: defaultServerPort}
    , mountings: SM.singleton defaultMountPath $ MountMongo $
        MountingWrapper { connectionUri: defaultMongoURI
                    , database: defaultMongoDatabase
                    }
    }

  serverURI :: SDConfig -> String
  serverURI (SDConfig {server = SDConfigServer s}) =
    s.location ++ ":" ++ show s.port

  mount :: SEConfig -> String
  mount (SEConfig {mountings = m}) =
    (fst <$> head (SM.toList m)) `getOrElse` defaultMountPath

  dataUrl :: SDConfig -> FilePath
  dataUrl     = config2Url "data"
  metadataUrl :: SDConfig -> FilePath
  metadataUrl = config2Url "metadata"
  queryUrl :: SDConfig -> FilePath
  queryUrl    = config2Url "query"
  config2Url :: FilePath -> SDConfig -> FilePath
  config2Url p config = serverURI config </> p </> "fs"

  -- Parsing stuff
  type Query = Tuple String String
  type QueryString = SM.StrMap String

  noneOf :: [String] -> Parser String String
  noneOf ss = satisfy (flip notElem ss)

  parseQueryString :: Parser String QueryString
  parseQueryString = do
    optional $ string "?"
    queries <- parseQuery `sepBy` string "&"
    pure $ SM.fromList queries

  parseQuery :: Parser String Query
  parseQuery = do
    key <- (joinWith "" >>> decodeURIComponent) <$> many (try $ noneOf ["="])
    string "="
    val <- (joinWith "" >>> decodeURIComponent) <$> many (try $ noneOf ["&"])
    pure $ Tuple key val

  query2SDConfig :: QueryString -> SDConfig
  query2SDConfig qs = fromMaybe defaultSDConfig do
    loc  <- SM.lookup "serverLocation" qs
    port <- SM.lookup "serverPort"     qs
    java <- SM.lookup "javaLocation"   qs
    pure $ SDConfig
      {server: SDConfigServer {location: loc, port: readInt 10 port}}

  query2SEConfig :: QueryString -> SEConfig
  query2SEConfig qs = fromMaybe defaultSEConfig do
    port     <- SM.lookup "sePort"      qs
    path     <- SM.lookup "seMountPath" qs
    mongoURI <- SM.lookup "seMongoURI"  qs
    database <- SM.lookup "seDatabase"  qs
    pure $ SEConfig
      { server: SEConfigServer {port: readInt 10 port}
      , mountings: SM.singleton path $ MountMongo $ MountingWrapper
         { connectionUri: mongoURI
         , database: database
         }
      }

  -- FFI stuff

  foreign import decodeURIComponent :: String -> String

  foreign import checked
    "function checked(el) {\
    \  return el.checked;\
    \}" :: Element -> Boolean

  foreign import selectedOptgroup
    "function selectedOptgroup(el) {\
    \  return el.selectedOptions[0].parentNode.label;\
    \}" :: forall r. Element -> String

  foreign import value
    "function value(el) {\
    \  return el.value;\
    \}" :: Element -> String
