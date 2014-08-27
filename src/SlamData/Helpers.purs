module SlamData.Helpers where

  import Data.Maybe (fromMaybe, Maybe())
  import Data.String (indexOf', length)

  import React.Types (Element())

  import SlamData.Types
    ( Mounting(..)
    , MountingWrapper(..)
    , SDConfig(..)
    , SDConfigNodeWebkit(..)
    , SDConfigServer(..)
    , SEConfig(..)
    , SEConfigServer(..)
    )
  import SlamData.Types.Workspace.Notebook (Notebook(..))

  import qualified Data.Map as M

--   -- Random purescript stuff.

  getOrElse :: forall a. Maybe a -> a -> a
  getOrElse = flip fromMaybe

  endsWith :: String -> String -> Boolean
  endsWith str suffix =
    indexOf' suffix (length str - length suffix) str /= -1

--   partition :: forall a. (a -> Boolean) -> [a] -> {fst :: [a], snd :: [a]}
--   partition p = foldr (select p) {fst: [], snd: []}

--   select :: forall a. (a -> Boolean) -> a -> {fst :: [a], snd :: [a]} -> {fst :: [a], snd :: [a]}
--   select p x o | p x = o{fst = x:o.fst}
--   select p x o       = o{snd = x:o.snd}

  -- SlamData specific stuff.

  activate :: forall a. (Eq a) => a -> a -> String
  activate x y | x == y = " active"
  activate _ _          = ""

  publish :: Notebook -> String
  publish (Notebook {published = true}) = " published"
  publish _                             = ""

  -- | Server stuff.

  defaultServerLocation = "http://localhost"
  defaultServerPort = 8080
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
    , nodeWebkit: SDConfigNodeWebkit {java: "java"}
    }

  defaultSEConfig :: SEConfig
  defaultSEConfig = SEConfig
    { server: SEConfigServer {port: defaultServerPort}
    , mountings: M.singleton defaultMountPath $ MountMongo $
        MountingWrapper { connectionUri: defaultMongoURI
                    , database: defaultMongoDatabase
                    }
    }

  serverURI :: SDConfig -> String
  serverURI (SDConfig {server = SDConfigServer s}) =
    s.location ++ ":" ++ show s.port

--   getServerURI :: QueryString -> String
--   getServerURI qs = fromMaybe defaultServerURI do
--     loc <- M.lookup "serverLocation" qs
--     port <- M.lookup "serverPort" qs
--     pure $ loc ++ ":" ++ port

--   query2SDConfig :: QueryString -> SDConfig
--   query2SDConfig qs = fromMaybe defaultSDConfig do
--     loc <- M.lookup "serverLocation" qs
--     port <- M.lookup "serverPort" qs
--     java <- M.lookup "javaLocation" qs
--     pure $ SDConfig
--       { server: {location: loc, port: runFn2 parseInt port 10}
--       , nodeWebkit: {java: java}
--       }

--   query2SEConfig :: QueryString -> SEConfig
--   query2SEConfig qs = fromMaybe defaultSEConfig do
--     port <- M.lookup "sePort" qs
--     path <- M.lookup "seMountPath" qs
--     mongoURI <- M.lookup "seMongoURI" qs
--     database <- M.lookup "seDatabase" qs
--     pure $ SEConfig
--       { server: {port: runFn2 parseInt port 10}
--       , mountings: M.singleton path $ MountMongo
--          { connectionUri: mongoURI
--          , database: database
--          }
--       }

--   type VisualType = C3.C3Type
--   visualBar :: VisualType
--   visualBar = C3.Bar
--   visualLine :: VisualType
--   visualLine = C3.Line
--   visualPie :: VisualType
--   visualPie = C3.Pie

--   -- | Parsing stuff
--   type Query = Tuple String String
--   type QueryString = M.Map String String

--   noneOf :: forall s m a. (Monad m) => [String] -> ParserT String m String
--   noneOf ss = satisfy (flip notElem ss)

--   parseQueryString :: Parser String QueryString
--   parseQueryString = do
--     optional $ string "?"
--     queries <- parseQuery `sepBy` string "&"
--     pure $ M.fromList queries

--   parseQuery :: Parser String Query
--   parseQuery = do
--     key <- (joinWith "" >>> decodeURIComponent) <$> many1 (try $ noneOf ["="])
--     string "="
--     val <- (joinWith "" >>> decodeURIComponent) <$> many1 (try $ noneOf ["&"])
--     pure $ Tuple key val

  -- FFI stuff

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
