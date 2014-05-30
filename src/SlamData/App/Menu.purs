module SlamData.App.Menu (menu) where

  import Data.Array

  import React

  import qualified React.DOM as D

  menu :: UI
  menu =
    D.nav [ D.ClassName "top-bar"
          , D.Data {options: "is_hover: false", topbar: true}
          ]
          [ D.ul [D.ClassName "title-area"]
                  [ D.li' [] ]
          , D.section [D.ClassName "top-bar-section"]
              [ D.ul [D.ClassName "left"]
                  [ fileMenu
                  , command "Edit"
                  , command "Code"
                  , command "Collaborate"
                  , command "Help"
                  ]
              ]
          ]

  fileMenu :: UI
  fileMenu = D.li [D.ClassName "has-dropdown"]
    [ D.a' [ D.text "File" ]
    , D.ul [D.ClassName "dropdown"] $
        command <$> [ "New"
                    , "Open..."
                    , "Open recent"
                    , "Revert to..."
                    , "Browse history..."
                    ]
    ]

  command :: String -> UI
  command name = D.li'
    [ D.a' [ D.text name ]
    ]
