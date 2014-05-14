module SlamData.App.Panel.Widget (widget, Widget()) where

  import Data.String
  import Data.Tuple

  import React

  import qualified React.DOM as D

  -- This is a widget in the sense of a placeholder name, not a UI Widget
  -- It should probably be changed at some point.
  type Widget = Tuple UI UI

  widget :: { name :: String, content :: UI, active :: Boolean } -> Widget
  widget props = Tuple tab cont
    where
      tab = makeTab props
      cont = makeCont props

  makeTab :: { name :: String, content :: UI, active :: Boolean } -> UI
  makeTab props =
    D.dd { className: activate "" props.active }
         [ D.a { href: "#" ++ widgetizeName props.name } [ D.text props.name ] ]
  makeCont :: { name :: String, content :: UI, active :: Boolean } -> UI
  makeCont props =
    D.div { className: activate "content" props.active
          , id: widgetizeName props.name
          }
          [ props.content ]

  activate :: String -> Boolean -> String
  activate s true  = s ++ " active"
  activate s false = s

  widgetizeName :: String -> String
  widgetizeName = ((++) "widget-") <<< replace " " ""
    where
      words = split " "
      unwords = joinWith ""
