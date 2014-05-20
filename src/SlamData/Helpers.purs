module SlamData.Helpers where

  import Control.Monad.Eff

  import React
  import React.DOM

  actionButton :: forall eff props state result.
    { name :: Prim.String
    , click :: EventHandlerContext eff props state result
    } -> UI
  actionButton props = li'
    [ a [ ClassName "tiny secondary button"
        , onClick \_ -> props.click
        ] [text props.name]
    ]

  -- | Foundation stuff.
  row :: [UI] -> UI
  row uis = div [ClassName "row" ] uis

  large :: String -> UI -> UI
  large size ui =
    div [ClassName $ "large-" ++ size ++ " columns" ] [ ui ]

  -- TODO: Move these to purescript-react.

  type ReactStateRW state result =
    Eff (r :: ReadStateEff state, w :: WriteStateEff state) result

  type Component attrs values = { getDOMNode :: {} -> values | attrs }

  foreign import getDOMNode
    "function getDOMNode(x) {\
    \  return x.getDOMNode();\
    \}" :: forall attrs values. Component attrs values -> values
