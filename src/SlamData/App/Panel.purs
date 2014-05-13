module SlamData.App.Panel (panel) where

  import Data.Tuple

  import React

  import SlamData.App.Panel.Widget

  import qualified React.DOM as D

  panel :: {widgets :: [Widget]} -> UI
  panel = mkUI spec do
    props <- getProps
    pure $ widgets2UI props.widgets

  widgets2UI :: [Widget] -> UI
  widgets2UI ws = case unzip ws of
    Tuple tabs conts -> D.div { className: "slamdata-panel"
                              , "data-equalizer-watch": true
                              }
      [ D.dl { className: "tabs"
             , "data-tab": true
             }
             tabs
      , D.div { className: "tabs-content"} conts
      ]
