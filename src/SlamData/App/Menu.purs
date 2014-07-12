module SlamData.App.Menu (menu) where

  import Data.Array

  import React

  import qualified React.DOM as D

  type Command = String

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
                  , command "divider"
                  , editMenu
                  , command "divider"
                  , helpMenu
                  , command "divider"
                  ]
              , D.ul
                  [D.className "right"]
                  [D.li'
                    [D.a
                        [ D.href "http://slamdata.com/"
                        , D.idProp "slamdata-logo"
                        , D.target "_blank"
                        ]
                        [D.img
                            [ D.alt "SlamData home page"
                            , D.src "imgs/slamdata-logo.png"
                            ]
                            []
                        ]
                    ]
                  ]
              ]
          ]

  fileMenu :: UI
  fileMenu = menuButton "File"
    [ "New"
    , "Open..."
    , "Open recent"
    , "Revert to..."
    , "Browse history..."
    , "divider"
    , "Import..."
    , "Export..."
    , "divider"
    , "Close"
    , "Save as..."
    , "Save a copy as..."
    , "divider"
    , "Print"
    ]

  editMenu :: UI
  editMenu = menuButton "Edit"
    [ "Undo"
    , "Redo"
    , "divider"
    , "Copy"
    , "Cut"
    , "Paste"
    , "Paste as data"
    , "Paste and indent"
    , "divider"
    , "Find and replace..."
    , "Find in folders..."
    ]

  helpMenu :: UI
  helpMenu = menuButton "Help"
    [ "Lookup symbol..."
    , "divider"
    , "Support forum"
    , "Support email"
    ]

  menuButton :: String -> [Command] -> UI
  menuButton name commands = D.li [D.ClassName "has-dropdown"]
    [ D.a' [ D.text name ]
    , D.ul [D.ClassName "dropdown"] (command <$> commands)
    ]

  command :: String -> UI
  command "divider" = D.li [D.ClassName "divider"] []
  command name = D.li'
    [ D.a' [ D.text name ]
    ]
