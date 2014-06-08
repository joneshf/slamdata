module SlamData.App.Panel (panel) where

  import Data.Array
  import Data.Tuple

  import React

  import SlamData.Helpers
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  panel :: [Tab] -> UI
  panel tabs = D.div [ D.className "slamdata-panel"
                     , D.dataSet {"equalizer-watch": ""}
                     ]
    [ D.dl [ D.className "tabs"
           , D.dataSet {tab: ""}
           ]
           (tabName <$> tabs)
    , D.div [D.className "tabs-content"] ((\(Tab t) -> t.content) <$> tabs)
    ]

  tabName :: Tab -> UI
  tabName (Tab {name = n}) = n

  tabToolCont :: Tab -> [UI]
  tabToolCont (Tab {content = c, toolbar = t}) =
    [ D.div [D.className "toolbar button-bar"]
        [ D.ul [D.className "button-group"] t.external
        , D.ul [D.className "button-group"] t.internal
        ]
    , c
    ]
