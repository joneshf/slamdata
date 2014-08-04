module SlamData.App.Menu (menu) where

  import Data.Array
  import Data.Maybe

  import React

  import qualified React.DOM as D

  type Command eff props state result =
    { name :: String
    , action :: Maybe (EventHandlerContext eff props state result)
    }

  menu :: forall eff props state result
       .  {showSettings :: EventHandlerContext eff props state result}
       -> UI
  menu = mkUI spec do
    props <- getProps
    pure $ D.nav
      [ D.className "top-bar"
      , D.Data {options: "is_hover: false", topbar: true}
      ]
      [ D.ul [D.className "title-area"]
              [ D.li' [] ]
      , D.section [D.className "top-bar-section"]
          [ D.ul [D.className "left"]
              [ editMenu props.showSettings
              , command2UI {name: "divider", action: Nothing}
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
    [ {name: "New",               action: Nothing}
    , {name: "Open...",           action: Nothing}
    , {name: "Open recent",       action: Nothing}
    , {name: "Revert to...",      action: Nothing}
    , {name: "Browse history...", action: Nothing}
    , {name: "divider",           action: Nothing}
    , {name: "Import...",         action: Nothing}
    , {name: "Export...",         action: Nothing}
    , {name: "divider",           action: Nothing}
    , {name: "Close",             action: Nothing}
    , {name: "Save as...",        action: Nothing}
    , {name: "Save a copy as...", action: Nothing}
    , {name: "divider",           action: Nothing}
    , {name: "Print",             action: Nothing}
    ]

  editMenu :: forall eff props state result
           .  EventHandlerContext eff props state result
           -> UI
  editMenu showSettings = menuButton "Edit"
    [ {name: "Settings", action: Just showSettings}
    ]

  helpMenu :: UI
  helpMenu = menuButton "Help"
    [ {name: "Lookup symbol...", action: Nothing}
    , {name: "divider",          action: Nothing}
    , {name: "Support forum",    action: Nothing}
    , {name: "Support email",    action: Nothing}
    ]

  menuButton :: forall eff props state result. String -> [Command eff props state result] -> UI
  menuButton name commands = D.li
    [D.className "has-dropdown"]
    [ D.a [D.idProp $ "menu-button-" ++ name] [D.text name]
    , D.ul [D.className "dropdown"] (command2UI <$> commands)
    ]

  command2UI :: forall eff props state result. Command eff props state result -> UI
  command2UI {name = "divider"}               = D.li [D.className "divider"] []
  command2UI {name = name, action = Nothing}  = D.li'
    [D.a
        [D.idProp $ "menu-command-" ++ name]
        [D.text name]
    ]
  command2UI {name = name, action = Just act} =
    D.li'
      [D.a
          [ D.idProp $ "menu-command-" ++ name
          , D.onClick \_ -> act
          ]
          [D.text name]
      ]
