module SlamData.App.Notebook.Block (block) where

  import Data.Tuple

  import React
  import Showdown

  import SlamData.Helpers
  import SlamData.App.Panel
  import SlamData.App.Panel.Widget

  import qualified React.DOM as D

  block :: UI
  block = D.div {}
    [ D.div {}
        [ large "2" selectType
        , large "10" toolbar
        ]
    , blockEditor
    ]

  selectType :: UI
  selectType = D.div {}
    [ D.a { className: "tiny secondary button"
          , "data-dropdown": "blockType"
          }
          [ D.text "Choose type..." ]
    , D.ul { id: "blockType"
           , className: "f-dropdown"
           , "data-dropdown-content": true
           }
           [ D.li {}
              [ D.a {} [ D.text "markdown" ]
              ]
           , D.li {}
              [ D.a {} [ D.text "SQL" ]
              ]
           ]
    ]

  toolbar :: UI
  toolbar = D.div { className: "button-bar" }
    [ D.ul { className: "left button-group" }
        [ action "Preview"
        ]
    , D.ul { className: "right button-group" }
        [ action "X"
        ]
    ]

  action :: String -> UI
  action name =  D.li {}
    [ D.a { className: "tiny secondary button" }
          [ D.text name ]
    ]

  blockEditor :: UI
  blockEditor = D.div {}
    [ D.textarea { className: "block-editor" } []
    ]
