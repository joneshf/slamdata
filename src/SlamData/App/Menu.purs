module SlamData.App.Menu (menu) where

  import Control.Lens ((..), (.~), lens, LensP())
  import Control.Monad.Eff (Eff())

  import Data.Array ()
  import Data.Maybe (Maybe(..))

  import React (createClass, eventHandler, spec)
  import React.Types (Component(), ComponentClass())

  import SlamData.Types (SlamDataState())

  import qualified React.DOM as D

  type Command eff a = {name :: String, action :: Maybe (Unit -> Eff eff a)}

  menu :: forall eff. (Boolean -> Eff eff Unit) -> Component
  menu showSettings = D.nav
    { className: "top-bar"
    , "data-options": "is_hover: false"
    , "data-topbar": true
    }
    [menuBar showSettings]

  menuBar :: forall eff. (Boolean -> Eff eff Unit) -> Component
  menuBar showSettings = D.section {className: "top-bar-section"}
    [ leftSide {extra: [divider]} [editMenu showSettings]
    , rightSide {extra: []} [logo]
    ]

  leftSide :: ComponentClass {extra :: [Component]} {}
  leftSide = menuSide "left"
  rightSide :: ComponentClass {extra :: [Component]} {}
  rightSide = menuSide "right"

  menuSide :: String -> ComponentClass {extra :: [Component]} {}
  menuSide name = createClass spec
    { displayName = "MenuSide"
    , render = \this -> pure $ D.ul {className: name}
      (intersperse divider this.props.children ++ this.props.extra)
    }

  editMenu :: forall eff. (Boolean -> Eff eff Unit) -> Component
  editMenu showSettings = menuButton
    { name: "Edit"
    , commands: [{name: "Settings", action: Just $ \_ -> showSettings true}]
    }
    []

  menuButton :: forall eff a
             .  ComponentClass {name :: String, commands :: [Command eff a]} {}
  menuButton = createClass spec
    { displayName = "MenuButton"
    , render = \this -> pure $ D.li {className: "has-dropdown"}
      [ D.a {id: "menu-button-" ++ this.props.name} [D.rawText this.props.name]
      , D.ul {className: "dropdown"}
        (command <$> this.props.commands)
      ]
    }

  command :: forall eff a. Command eff a -> Component
  command {name = name, action = Nothing} = D.li {}
    [D.a {id: "menu-command-" ++ name} [D.rawText name]]
  command {name = name, action = Just action} = D.li {}
    [D.a {id: "menu-command-" ++ name, onClick: action} [D.rawText name]]

  logo :: Component
  logo = D.li {}
    [D.a {href: "http://slamdata.com/", id: "slamdata-logo", target: "_blank"}
      [D.img {alt: "SlamData home page", src: "imgs/slamdata-logo.png"} []]
    ]

  divider :: Component
  divider = D.li {className: "divider"} []

  intersperse :: forall a. a -> [a] -> [a]
  intersperse _ []     = []
  intersperse _ [x]    = [x]
  intersperse y (x:xs) = x:y:intersperse y xs
