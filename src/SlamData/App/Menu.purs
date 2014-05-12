module SlamData.App.Menu (menu) where

  import React

  import qualified React.DOM as D

  menu :: UI
  menu = D.nav { className: "top-bar"
               , "data-options": "is_hover: false"
               }
    [ D.section { className: "top-bar-section" }
        [ D.ul { className: "left" }
            [ menuButton { name: "File" }
            , menuButton { name: "Edit" }
            , menuButton { name: "Code" }
            , menuButton { name: "Collaborate" }
            , menuButton { name: "Help" }
            ]
        ]
    ]

  menuButton :: {name :: String} -> UI
  menuButton = mkUI spec do
    props <- getProps
    pure $ D.li {} [ D.a {} [ D.text props.name ] ]
