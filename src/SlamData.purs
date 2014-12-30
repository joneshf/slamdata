module SlamData (slamData) where

  import Control.Events (EventEff(), EventEmitter)
  import Control.Events.TinyEmitter (emit, on)
  import Control.Monad.Eff (Eff())
  import Control.Monad.Cont.Trans (ContT(..))
  import Control.Reactive.Timer (Timer())

  import Data.Maybe (Maybe())

  import DOM (DOM())


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

  slamData :: forall eff e
           .  (EventEmitter e)
           => e
           -> SlamDataState
           -> Eff (dom :: DOM, event :: EventEff, react :: React, timer :: Timer | eff) Unit
  slamData emitter state = do
    renderComponentById (app {request: request emitter state, state: state} []) "content"
    emitter # on responseEvent (\state ->
      renderComponentById (app {request: request emitter state, state: state} []) "content")
    pure unit

  request :: forall eff e
          .  (EventEmitter e)
          => e
          -> SlamDataState
          -> SlamDataRequest eff
  request emitter state ty = do
    emit requestEvent (SlamDataEvent {event: ty}) emitter
    pure unit
