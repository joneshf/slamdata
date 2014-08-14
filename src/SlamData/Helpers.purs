module SlamData.Helpers where

--   import Control.Apply ((*>))
--   import Control.Monad.Eff

--   import Data.Either
--   import Data.Foldable
--   import Data.Foreign
--   import Data.Function
  import Data.Maybe (fromMaybe, Maybe())
--   import Data.String
--   import Data.Tuple

--   import React

  import SlamData.Types
    ( Mounting(..)
    , MountingWrapper(..)
    , SDConfig(..)
    , SDConfigNodeWebkit(..)
    , SDConfigServer(..)
    , SEConfig(..)
    , SEConfigServer(..)
    )

--   import Text.Parsing.Parser (Parser(), ParserT())
--   import Text.Parsing.Parser.Combinators ((<?>), many, many1, optional, sepBy, try)
--   import Text.Parsing.Parser.String (char, satisfy, string)

--   import qualified Browser.WebStorage as WS
--   import qualified Data.Array as A
  import qualified Data.Map as M
--   import qualified Graphics.C3 as C3
--   import qualified React.DOM as D

--   -- Random purescript stuff.

--   (..) :: Number -> Number -> [Number]
--   (..) = A.range

  getOrElse :: forall a. Maybe a -> a -> a
  getOrElse = flip fromMaybe

--   partition :: forall a. (a -> Boolean) -> [a] -> {fst :: [a], snd :: [a]}
--   partition p = foldr (select p) {fst: [], snd: []}

--   select :: forall a. (a -> Boolean) -> a -> {fst :: [a], snd :: [a]} -> {fst :: [a], snd :: [a]}
--   select p x o | p x = o{fst = x:o.fst}
--   select p x o       = o{snd = x:o.snd}

--   guardMaybe :: forall a. Boolean -> Maybe a -> Maybe a
--   guardMaybe true  m = m
--   guardMaybe false _ = Nothing

--   foreign import data Window :: *
--   foreign import data Location :: *

--   foreign import window :: Window

--   foreign import location
--     "function location(win) {\
--     \  return win.location;\
--     \}" :: Window -> Location

--   foreign import search
--     "function search(loc) {\
--     \  return loc.search;\
--     \}" :: Location -> String

  -- SlamData specific stuff.

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

--   foreign import parseInt :: Fn2 String Number Number

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

--   actionButton :: forall eff props state result i. (Icon i)
--                => { click :: EventHandlerContext eff props state result
--                   , icon :: i
--                   , tooltip :: Prim.String
--                   }
--                -> UI
--   actionButton props = D.li'
--     [D.a
--         [ D.className "tiny secondary button has-tooltip"
--         , D.onClick \_ -> props.click
--         , D.titleProp props.tooltip
--         , D.dataSet {tooltip: ""}
--         ]
--         [toUI props.icon]
--     ]

--   -- At least we can try to catch spelling mistakes.
--   data LocalKey = Blocks
--                 | Notebooks
--                 | EvalSQLBlocks

--   instance eqLocalKey :: Eq LocalKey where
--     (==) Blocks        Blocks        = true
--     (==) Notebooks     Notebooks     = true
--     (==) EvalSQLBlocks EvalSQLBlocks = true
--     (==) _             _             = false

--     (/=) l l' = not (l == l')

--   instance showLocalKey :: Show LocalKey where
--     show Blocks    = "blocks"
--     show Notebooks = "notebooks"
--     show EvalSQLBlocks = "evalsqlblocks"

--   localGet :: forall a. (ReadForeign a) => LocalKey -> [a]
--   localGet key =
--     maybe []
--           (parseJSON >>> either (const []) id)
--           (WS.getItem WS.localStorage $ show key)

--   localSet :: forall a. (Show a) => LocalKey -> a -> WS.LocalStorage
--   localSet key val = WS.setItem WS.localStorage (show key) (show val)

--   type VisualType = C3.C3Type
--   visualBar :: VisualType
--   visualBar = C3.Bar
--   visualLine :: VisualType
--   visualLine = C3.Line
--   visualPie :: VisualType
--   visualPie = C3.Pie

--   -- | Foundation stuff.
--   row :: [UI] -> UI
--   row uis = D.div [D.className "row"] uis

--   large :: String -> UI -> UI
--   large size ui =
--     D.div [D.className $ "large-" ++ size ++ " columns"] [ui]

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

--   foreign import decodeURIComponent :: String -> String
