module SlamData.App.Panel (panel) where

  import Data.Tuple

  import React

  import SlamData.Helpers
  import SlamData.App.Panel.Widget

  import qualified React.DOM as D

  panel :: { widgets :: [Widget]
           , actions :: { external :: [UI], internal :: [UI] }
           }
        -> UI
  panel = mkUI spec do
    props <- getProps
    pure $ widgets2UI props.widgets props.actions

  widgets2UI :: [Widget]
             -> { external :: [UI], internal :: [UI] }
             -> UI
  widgets2UI ws actions = case unzip ws of
    Tuple tabs conts -> D.div { className: "slamdata-panel"
                              , "data-equalizer-watch": true
                              }
      [ D.dl { className: "tabs"
             , "data-tab": true
             }
             tabs
      , D.div { className: "toolbar button-bar" }
          [ D.ul { className: "button-group" } actions.external
          , D.ul { className: "button-group" } actions.internal
          ]
      , D.div { className: "tabs-content"} conts
      ]
