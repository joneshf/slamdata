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
    ( SlamDataEvent(..)
    , SlamDataEventTy()
    , SlamDataRequest()
    , SlamDataState()
    , requestEvent
    , responseEvent
    )

  slamData :: forall eff
           .  Emitter
           -> SlamDataState
           -> Eff (dom :: DOM, event :: EventEff, react :: React, timer :: Timer | eff) Unit
  slamData emitter state = do
    renderComponentById (app {request: request emitter state, state: state} []) "content"
    emitter # on responseEvent (\state ->
      renderComponentById (app {request: request emitter state, state: state} []) "content")
    pure unit

  request :: forall eff
          .  Emitter
          -> SlamDataState
          -> SlamDataRequest eff
  request emitter state ty = do
    emit requestEvent (SlamDataEvent {state: state, event: ty}) emitter
    pure unit
