module SlamData.App.Panel (panel) where

  import Data.Array
  import Data.Foldable
  import Data.Maybe
  import Data.Tuple
  import Data.UUID

  import React

  import SlamData.Helpers
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  panel :: [TabSpec] -> UI
  panel tabs = panel' {tabs: tabs}

  panel' :: {tabs :: [TabSpec]} -> UI
  panel' = mkUI spec {getInitialState = pure {tabs: [], activeTab: Nothing}} do
    props <- getProps
    state <- readState
    let tabs = props.tabs
    let activeTab = state.activeTab
                <|> maybe Nothing (_ident >>> pure) (head tabs)
    Debug.Trace.print "render"
    pure $ D.div
      [ D.className "slamdata-panel"
      , D.dataSet {"equalizer-watch": ""}
      ]
      [ D.dl [ D.className "tabs"
             , D.dataSet {tab: ""}
             ]
             (injectMakeActive activeTab <$> tabs)
      , D.div [D.className "tabs-content"] $
              maybe []
                    (makeCont >>> pure)
                    (find (_ident >>> Just >>> ((==) activeTab)) tabs)
      ]

  _name :: forall r. {name :: String | r} -> String
  _name {name = n} = n
  _content :: forall r. {content :: [UI] | r} -> [UI]
  _content {content = c} = c
  _active :: forall r. {active :: Boolean | r} -> Boolean
  _active {active = a} = a
  _ident :: forall r. {ident :: UUID | r} -> UUID
  _ident {ident = a} = a

  injectMakeActive :: forall eff a. Maybe UUID -> TabSpec -> UI
  injectMakeActive uuid {name=n, external=e, internal=i, content=c, ident=id} =
    makeTabName { name: n
                , external: e
                , internal: i
                , content: c
                , active: uuid == Just id
                , ident: id
                , activate: deferred $ makeActive id
                }

  makeActive ident = do
    state <- readState
    pure $ writeState state{activeTab = Just ident}
