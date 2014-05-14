module SlamData.App.Panel (panel) where

  import Data.Array
  import Data.Tuple

  import React

  import SlamData.Helpers
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  panel :: [Tab] -> UI
  panel tabs = D.div { className: "slamdata-panel"
                     , "data-equalizer-watch": true
                     }
    [ D.dl { className: "tabs"
           , "data-tab": true
           }
           (tabName <$> tabs)
    , D.div { className: "tabs-content"} (concatMap tabToolCont tabs)
    ]

  tabName :: Tab -> UI
  tabName (Tab {name = n}) = n

  tabToolCont :: Tab -> [UI]
  tabToolCont (Tab {content = c, toolbar = t}) =
    [ D.div { className: "toolbar button-bar" }
        [ D.ul { className: "button-group" } t.external
        , D.ul { className: "button-group" } t.internal
        ]
    , c
    ]
