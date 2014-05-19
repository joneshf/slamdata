module SlamData.Helpers where

  import React
  import React.DOM

  -- | Foundation stuff.
  row :: [UI] -> UI
  row uis = div [ClassName "row" ] uis

  large :: String -> UI -> UI
  large size ui =
    div [ClassName $ "large-" ++ size ++ " columns" ] [ ui ]

  -- actionButton :: {name :: String, click :: EventHandler} -> UI
  actionButton props = li'
    [ a [ ClassName "tiny secondary button"
        , onClick $ \_ -> props.click
        ] [text props.name]
    ]
