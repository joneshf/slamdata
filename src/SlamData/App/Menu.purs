module SlamData.App.Menu (menu) where

  import Data.Array

  import React

  import qualified React.DOM as D

  menu :: UI
  menu = D.nav { className: "top-bar"
               }
    [ D.section { className: "top-bar-section" }
        [ D.ul { className: "title-area" }
            [ D.li {} [] ]
        , D.ul { className: "left" }
            [ fileMenu
            , command "Edit"
            , command "Code"
            , command "Collaborate"
            , command "Help"
            ]
        ]
    ]

  fileMenu :: UI
  fileMenu = D.li { className: "has-dropdown" }
    [ D.a {} [ D.text "File" ]
    , D.ul { className: "dropdown" } $
        command <$> [ "New"
                    , "Open..."
                    , "Open recent"
                    , "Revert to..."
                    , "Browse history..."
                    ]
    ]

  command :: String -> UI
  command name = D.li {}
    [ D.a {} [ D.text name ]
    ]
