module SlamData.App.Panel.Widget (widget, Widget()) where

  import Data.String

  import React

  import qualified React.DOM as D

  type Widget = UI

  widget :: { name :: String, content :: String } -> Widget
  widget = mkUI spec do
    props <- getProps
    pure $ D.dd {}
      [ D.a { href: "#" ++ widgetizeName props.name } [ D.text props.name ]
      , D.div { className: "content"
              , id: widgetizeName props.name
              }
              [ D.text props.content ]
      ]

  widgetizeName :: String -> String
  widgetizeName = ((++) "widget-") <<< unwords <<< words
    where
      words = split " "
      unwords = joinWith ""
