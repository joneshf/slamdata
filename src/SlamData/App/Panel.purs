module SlamData.App.Panel (panel) where

  import React

  import SlamData.App.Panel.Widget

  import qualified React.DOM as D

  panel :: {widgets :: [Widget]} -> UI
  panel = mkUI spec do
    props <- getProps
    pure $ D.dl { className: "accordion"
                , "data-accordion": true
                } props.widgets
