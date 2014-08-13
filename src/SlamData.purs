module SlamData where

  import Control.Monad.Eff (Eff())
  import Control.Monad.Cont.Trans (ContT(..))
  import Control.Reactive.Timer (Timer())

  import Data.Maybe (Maybe())

  import DOM (DOM())

  import Node.Events (Emitter(), EventEff(), emit, on)

  import React (renderComponentById)
  import React.Types (Component(), React())

  import SlamData.App (app)
  import SlamData.Types
    ( SlamDataState()
    , SaveSettings()
    , Settings()
    , SlamDataEvent()
    , requestEvent
    , responseEvent
    )

  slamData :: forall eff
           .  Emitter
           -> Settings
           -> Eff (dom :: DOM, event :: EventEff, react :: React, timer :: Timer | eff) Unit
  slamData emitter settings = do
    let request = \event -> emit requestEvent event emitter
    let component = app {files: [], request: request, settings: settings} []
    component' <- renderComponentById component "content"
    on responseEvent (\settings -> setProps {settings: settings} component') emitter
    pure unit

  foreign import setProps
    "function setProps(props) {\
    \  return function(component) {\
    \    return function() {\
    \      component.setProps(props);\
    \    }\
    \  }\
    \}" :: forall props eff. props -> Component -> Eff (react :: React | eff) Unit
