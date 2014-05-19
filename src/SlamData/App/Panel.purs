module SlamData.App.Panel (panel) where

  import Data.Array
  import Data.Tuple

  import React

  import SlamData.Helpers
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  panel :: [Tab] -> UI
  panel tabs = D.div [ D.ClassName "slamdata-panel"
                     , D.dataSet {"equalizer-watch": true}
                     ]
    [ D.dl [D.ClassName "tabs"
           , D.dataSet {"tab": true}
           ]
           (tabName <$> tabs)
    , D.div [D.ClassName "tabs-content"] (concatMap tabToolCont tabs)
    ]

  tabName :: Tab -> UI
  tabName (Tab {name = n}) = n

  tabToolCont :: Tab -> [UI]
  tabToolCont (Tab {content = c, toolbar = t}) =
    [ D.div [D.ClassName "toolbar button-bar" ]
        [ D.ul [D.ClassName "button-group" ] t.external
        , D.ul [D.ClassName "button-group" ] t.internal
        ]
    , c
    ]
