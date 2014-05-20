module SlamData.Helpers where

  import React
  import React.DOM

  -- | Foundation stuff.
  row :: [UI] -> UI
  row uis = div [ClassName "row" ] uis

  large :: String -> UI -> UI
  large size ui =
    div [ClassName $ "large-" ++ size ++ " columns" ] [ ui ]

  actionButton :: String -> UI
  actionButton name = li'
    [ a [ClassName "tiny secondary button" ] [text name]
    ]
