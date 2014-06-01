module SlamData.Helpers where

  import Control.Monad.Eff

  import React
  import React.DOM

  actionButton :: forall eff props state result i. (Icon i) =>
    { click :: EventHandlerContext eff props state result
    , icon :: i
    , tooltip :: Prim.String
    } -> UI
  actionButton props = li'
    [ a [ ClassName "tiny secondary button has-tooltip"
        , onClick \_ -> props.click
        , titleProp props.tooltip
        , dataSet {tooltip: ""}
        ] [toUI props.icon]
    ]

  -- | Foundation stuff.
  row :: [UI] -> UI
  row uis = div [ClassName "row" ] uis

  large :: String -> UI -> UI
  large size ui =
    div [ClassName $ "large-" ++ size ++ " columns" ] [ ui ]

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
  faIcon name = FAIcon $ i [className name] []

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

  -- TODO: Move these to purescript-react.

  type ReactStateRW state result =
    Eff (r :: ReadStateEff state, w :: WriteStateEff state) result

  type Component attrs values = { getDOMNode :: {} -> values | attrs }

  foreign import getDOMNode
    "function getDOMNode(x) {\
    \  return x.getDOMNode();\
    \}" :: forall attrs values. Component attrs values -> values
