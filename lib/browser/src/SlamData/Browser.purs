module SlamData.Browser where

  -- |  This is the Browser runner for SlamData
  --    that uses the query string for config options.
  --    You will need to have the SlamData lib available (ps or js + externs).
  --    It also expects the configuration to come down as a query string.
  --    The keys are available in `SlamData.Helpers`,
  --    though this should be referenced in this file somewhere.
  --    This query string business might also need to be replaced.
  --    You should be running slamengine somewhere.

  import Control.Events.TinyEmitter (emitter, on)
  import Control.Monad.Eff (Eff())
  import Control.Monad.ST (newSTRef, readSTRef, runST)

  import Data.Either (either)

  import DOM (DOM())

  import SlamData (slamData)
  import SlamData.App.Events (handleRequest)
  import SlamData.Helpers
    ( defaultSDConfig
    , defaultSEConfig
    , initialState
    , parseQueryString
    , query2SDConfig
    , query2SEConfig
    )
  import SlamData.Types (requestEvent)

  import Text.Parsing.Parser (runParser)

  -- main :: Eff (dom :: DOM) Unit
  main = runST do
    loc <- windowLocation
    let rawQueries = runParser loc.search parseQueryString
    let sdConfig = either (const defaultSDConfig) query2SDConfig rawQueries
    let seConfig = either (const defaultSEConfig) query2SEConfig rawQueries
    initialState' <- newSTRef $ initialState sdConfig seConfig
    e <- emitter
    e # on requestEvent (handleRequest e initialState')
    state <- readSTRef initialState'
    slamData e state

  foreign import windowLocation """
    function windowLocation() {
      return window.location;
    }
  """ :: forall eff. Eff eff {search :: String}
