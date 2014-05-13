module SlamData.Helpers where

  import React
  import React.DOM

  -- | Foundation stuff.
  row :: [UI] -> UI
  row uis = div { className: "row" } uis

  large :: String -> UI -> UI
  large size ui =
    div { className: "large-" ++ size ++ " columns" } [ ui ]
