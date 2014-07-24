module SlamData.Helpers where

  import Control.Apply ((*>))
  import Control.Monad.Eff

  import Data.Either
  import Data.Foldable
  import Data.Foreign
  import Data.Maybe
  import Data.String
  import Data.Tuple

  import React

  import SlamData.Types (SlamDataConfig(), SlamEngineConfig())

  import Text.Parsing.Parser (Parser(), ParserT())
  import Text.Parsing.Parser.Combinators ((<?>), many, many1, optional, sepBy, try)
  import Text.Parsing.Parser.String (char, satisfy, string)

  import qualified Browser.WebStorage as WS
  import qualified Data.Array as A
  import qualified Data.Map as M
  import qualified Graphics.C3 as C3
  import qualified React.DOM as D

  -- Random purescript stuff.

  (..) :: Number -> Number -> [Number]
  (..) = A.range

  getOrElse :: forall a. Maybe a -> a -> a
  getOrElse = flip fromMaybe

  partition :: forall a. (a -> Boolean) -> [a] -> {fst :: [a], snd :: [a]}
  partition p = foldr (select p) {fst: [], snd: []}

  select :: forall a. (a -> Boolean) -> a -> {fst :: [a], snd :: [a]} -> {fst :: [a], snd :: [a]}
  select p x o | p x = o{fst = x:o.fst}
  select p x o       = o{snd = x:o.snd}

  guardMaybe :: forall a. Boolean -> Maybe a -> Maybe a
  guardMaybe true  m = m
  guardMaybe false _ = Nothing

  foreign import data Window :: *
  foreign import data Location :: *

  foreign import window :: Window

  foreign import location
    "function location(win) {\
    \  return win.location;\
    \}" :: Window -> Location

  foreign import search
    "function search(loc) {\
    \  return loc.search;\
    \}" :: Location -> String

  -- SlamData specific stuff.

  -- | Server stuff.

  defaultServerLocation = "http://localhost"
  defaultServerPort = "8080"
  defaultMountPath = "/"
  defaultMongoURI = "mongodb://localhost:27017"
  defaultMongoDatabase = "test"

  defaultServerURI :: String
  defaultServerURI = defaultServerLocation ++ ":" ++ defaultServerPort

  defaultSDConfig :: SlamDataConfig
  defaultSDConfig =
    { server: {location: defaultServerLocation, port: defaultServerPort}
    , nodeWebkit: {java: Nothing}
    }

  defaultSEConfig :: SlamEngineConfig
  defaultSEConfig =
    { server: {port: defaultServerPort}
    , mountings: M.singleton defaultMountPath
        {mongodb: { connectionURI: defaultMongoURI
                  , database: defaultMongoDatabase
                  }
        }
    }

  serverURI :: SlamDataConfig -> String
  serverURI {server = {location = l, port = p}} = l ++ ":" ++ p

  getServerURI :: QueryString -> String
  getServerURI qs = fromMaybe defaultServerURI do
    loc <- M.lookup "serverLocation" qs
    port <- M.lookup "serverPort" qs
    pure $ loc ++ ":" ++ port

  query2SDConfig :: QueryString -> SlamDataConfig
  query2SDConfig qs = fromMaybe defaultSDConfig do
    loc <- M.lookup "serverLocation" qs
    port <- M.lookup "serverPort" qs
    java <- M.lookup "javaLocation" qs
    pure {server: {location: loc, port: port}, nodeWebkit: {java: Just java}}

  query2SEConfig :: QueryString -> SlamEngineConfig
  query2SEConfig qs = fromMaybe defaultSEConfig do
    port <- M.lookup "sePort" qs
    path <- M.lookup "seMountPath" qs
    mongoURI <- M.lookup "seMongoURI" qs
    database <- M.lookup "seDatabase" qs
    pure { server: {port: port}
         , mountings: M.singleton path {mongodb: { connectionURI: mongoURI
                                                 , database: database
                                                 }
                                       }
         }

  actionButton :: forall eff props state result i. (Icon i)
               => { click :: EventHandlerContext eff props state result
                  , icon :: i
                  , tooltip :: Prim.String
                  }
               -> UI
  actionButton props = D.li'
    [D.a
        [ D.className "tiny secondary button has-tooltip"
        , D.onClick \_ -> props.click
        , D.titleProp props.tooltip
        , D.dataSet {tooltip: ""}
        ]
        [toUI props.icon]
    ]

  -- At least we can try to catch spelling mistakes.
  data LocalKey = Blocks
                | Notebooks
                | EvalSQLBlocks

  instance eqLocalKey :: Eq LocalKey where
    (==) Blocks        Blocks        = true
    (==) Notebooks     Notebooks     = true
    (==) EvalSQLBlocks EvalSQLBlocks = true
    (==) _             _             = false

    (/=) l l' = not (l == l')

  instance showLocalKey :: Show LocalKey where
    show Blocks    = "blocks"
    show Notebooks = "notebooks"
    show EvalSQLBlocks = "evalsqlblocks"

  localGet :: forall a. (ReadForeign a) => LocalKey -> [a]
  localGet key =
    maybe []
          (parseJSON >>> either (const []) id)
          (WS.getItem WS.localStorage $ show key)

  localSet :: forall a. (Show a) => LocalKey -> a -> WS.LocalStorage
  localSet key val = WS.setItem WS.localStorage (show key) (show val)

  type VisualType = C3.C3Type
  visualBar :: VisualType
  visualBar = C3.Bar
  visualLine :: VisualType
  visualLine = C3.Line
  visualPie :: VisualType
  visualPie = C3.Pie

  type FileType = {name :: String, "type" :: String}
  type FileSystemProps = {files :: [FileType]}

  -- | Foundation stuff.
  row :: [UI] -> UI
  row uis = D.div [D.className "row"] uis

  large :: String -> UI -> UI
  large size ui =
    D.div [D.className $ "large-" ++ size ++ " columns"] [ui]

  -- | Icon stuff.

  -- Let's try and make the icons easily replaceable.
  -- Hopefully we can get it to the point where we can mix and match icons
  -- from different sets.
  class Icon i where
    toUI :: i -> UI

  data FAIcon = FAIcon UI
  instance iconFA :: Icon FAIcon where
    toUI (FAIcon ui) = ui

  data EntypoIcon = EntypoIcon UI
  instance iconEntypo :: Icon EntypoIcon where
    toUI (EntypoIcon ui) = ui

  faIcon :: String -> FAIcon
  faIcon name = FAIcon $ D.i [D.className name] []
  entypoIcon :: String -> EntypoIcon
  entypoIcon name = EntypoIcon $ D.i [D.className name] []

  closeIcon :: {} -> FAIcon
  closeIcon {} = faIcon "fa fa-times"
  -- Notebook
  newIcon :: {} -> FAIcon
  newIcon {} = faIcon "fa fa-file"
  openIcon :: {} -> FAIcon
  openIcon {} = faIcon "fa fa-folder-open"
  saveIcon :: {} -> FAIcon
  saveIcon {} = faIcon "fa fa-save"
  publishIcon :: {} -> FAIcon
  publishIcon {} = faIcon "fa fa-book"
  -- Blocks
  markdownIcon :: {} -> FAIcon
  markdownIcon {} = faIcon "fa fa-file-text"
  sqlIcon :: {} -> FAIcon
  sqlIcon {} = faIcon "fa fa-database"
  visualIcon :: {} -> FAIcon
  visualIcon {} = faIcon "fa fa-bar-chart-o"
  -- FileSystem
  dirOpenIcon :: {} -> FAIcon
  dirOpenIcon {} = faIcon "fa fa-folder-open-o"
  dirClosedIcon :: {} -> FAIcon
  dirClosedIcon {} = faIcon "fa fa-folder-o"
  fileIcon :: {} -> FAIcon
  fileIcon {} = faIcon "fa fa-file-o"
  newNotebookIcon :: {} -> FAIcon
  newNotebookIcon {} = faIcon "fa fa-plus"
  loadingIcon :: {} -> FAIcon
  loadingIcon {} = faIcon "fa fa-circle-o-notch fa-spin"

  areaChartIcon :: {} -> EntypoIcon
  areaChartIcon {} = entypoIcon "icon-chart-area"
  barChartIcon :: {} -> EntypoIcon
  barChartIcon {} = entypoIcon "icon-chart-bar"
  lineChartIcon :: {} -> EntypoIcon
  lineChartIcon {} = entypoIcon "icon-chart-line"
  pieChartIcon :: {} -> EntypoIcon
  pieChartIcon {} = entypoIcon "icon-chart-pie"

  -- | Parsing stuff
  type Query = Tuple String String
  type QueryString = M.Map String String

  noneOf :: forall s m a. (Monad m) => [String] -> ParserT String m String
  noneOf ss = satisfy (flip notElem ss)

  parseQueryString :: Parser String QueryString
  parseQueryString = do
    optional $ string "?"
    queries <- parseQuery `sepBy` string "&"
    pure $ M.fromList queries

  parseQuery :: Parser String Query
  parseQuery = do
    key <- joinWith "" <$> many1 (try $ noneOf ["="])
    string "="
    val <- joinWith "" <$> many1 (try $ noneOf ["&"])
    pure $ Tuple key val

  -- TODO: Move these to purescript-react.

  type ReactStateRW state result =
    Eff (r :: ReadStateEff state, w :: WriteStateEff state) result

  type Component attrs values = { getDOMNode :: {} -> values | attrs }

  foreign import getDOMNode
    "function getDOMNode(x) {\
    \  return x.getDOMNode();\
    \}" :: forall attrs values. Component attrs values -> values

  foreign import focus
    "function focus(x) {\
    \  return x.focus();\
    \}" :: forall a b. a -> b
