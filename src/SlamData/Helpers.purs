module SlamData.Helpers where

  import Control.Monad.Eff

  import Data.Either
  import Data.Foldable
  import Data.Foreign
  import Data.Maybe

  import React

  import qualified Browser.WebStorage as WS
  import qualified Data.Array as A
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

  -- SlamData specific stuff.

  serverURI = "http://localhost:8080"

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
