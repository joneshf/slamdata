module SlamData.App.Panel.Tab
  ( tab
  , Tab(..)
  , Action()
  ) where

  import Data.String
  import Data.Tuple

  import React

  import qualified React.DOM as D

  type Action = UI
  data Tab = Tab { name :: UI
                 , toolbar :: { external :: [Action]
                              , internal :: [Action]
                              }
                 , content :: UI
                 }

  tab :: { name :: String
         , external :: [Action]
         , internal :: [Action]
         , content :: [UI]
         , active :: Boolean
         }
      -> Tab
  tab props = Tab { name: tabName
                  , toolbar: { external: props.external
                             , internal: props.internal
                             }
                  , content: cont}
    where
      tabName = makeTabName props
      cont = makeCont props

  makeTabName :: forall p. { name :: String
                           , active :: Boolean
                           | p
                           }
              -> UI
  makeTabName props =
    D.dd [D.className $ activate "" props.active]
         [D.a [D.href $ "#" ++ tabizeName props.name] [D.text props.name]]
  makeCont :: forall p. { name :: String
                        , content :: [UI]
                        , active :: Boolean
                        , external :: [Action]
                        , internal :: [Action]
                        | p
                        }
           -> UI
  makeCont props = D.div
    [ D.className $ activate "content" props.active
    , D.idProp $ tabizeName props.name
    ] $
    [ D.div [D.className "toolbar button-bar"]
            [ D.ul [D.className "button-group"] props.external
            , D.ul [D.className "button-group"] props.internal
            ]
    , D.hr' []
    , D.div [D.className "actual-content"] props.content
    ]

  activate :: String -> Boolean -> String
  activate s true  = s ++ " active"
  activate s false = s

  tabizeName :: String -> String
  tabizeName = ((++) "tab-") <<< replace " " ""
