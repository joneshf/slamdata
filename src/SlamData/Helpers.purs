module SlamData.Helpers where

  import Control.Monad.Eff

  import Data.Either
  import Data.Foldable
  import Data.Foreign
  import Data.Maybe

  import React

  import qualified Browser.WebStorage as WS
  import qualified Data.Array as A
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

  -- SlamData specific stuff.

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

  instance eqLocalKey :: Eq LocalKey where
    (==) Blocks    Blocks    = true
    (==) Notebooks Notebooks = true
    (==) _         _         = false

    (/=) l         l'        = not (l == l')

  instance showLocalKey :: Show LocalKey where
    show Blocks    = "blocks"
    show Notebooks = "notebooks"

  localGet :: forall a. (ReadForeign a) => LocalKey -> [a]
  localGet key =
    maybe []
          (parseJSON >>> either (const []) id)
          (WS.getItem WS.localStorage $ show key)

  localSet :: forall a. (Show a) => LocalKey -> a -> WS.LocalStorage
  localSet key val = WS.setItem WS.localStorage (show key) (show val)

  -- | Foundation stuff.
  row :: [UI] -> UI
  row uis = D.div [D.className "row"] uis

  large :: String -> UI -> UI
  large size ui =
    D.div [D.className $ "large-" ++ size ++ " columns"] [ui]

  -- | FontAwesome stuff.

  -- Let's try and make the icons easily replaceable.
  -- Hopefully we can get it to the point where we can mix and match icons
  -- from different sets.
  class Icon i where
    toUI :: i -> UI

  data FAIcon = FAIcon UI
  instance iconFA :: Icon FAIcon where
    toUI (FAIcon ui) = ui

  faIcon :: String -> FAIcon
  faIcon name = FAIcon $ D.i [D.className name] []

  closeIcon :: {} -> FAIcon
  closeIcon {} = faIcon "fa fa-times"
  newIcon :: {} -> FAIcon
  newIcon {} = faIcon "fa fa-file"
  openIcon :: {} -> FAIcon
  openIcon {} = faIcon "fa fa-folder-open"
  saveIcon :: {} -> FAIcon
  saveIcon {} = faIcon "fa fa-save"
  publishIcon :: {} -> FAIcon
  publishIcon {} = faIcon "fa fa-book"
  markdownIcon :: {} -> FAIcon
  markdownIcon {} = faIcon "fa fa-file-text"
  sqlIcon :: {} -> FAIcon
  sqlIcon {} = faIcon "fa fa-database"
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
