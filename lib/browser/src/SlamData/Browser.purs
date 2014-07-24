module SlamData.Browser where

  -- |  This is the Browser runner for SlamData
  --    that uses the query string for config options.
  --    You will need to have the SlamData lib available (ps or js + externs).
  --    It also expects the configuration to come down as a query string.
  --    The keys are available in `SlamData.Helpers`,
  --    though this should be referenced in this file somewhere.
  --    This query string business might also need to be replaced.
  --    You should be running slamengine somewhere.

  import Control.Monad.Eff (Eff())

  import Data.Either (either)

  import DOM (DOM())

  -- We need to explicitly import prelude stuff
  -- and run psc with --no-prelude
  -- because slamdata.js comes with prelude,
  -- and psc doesn't want to play nice without this.
  import Prelude ((#), const)

  import React (UI())

  import SlamData (slamData)
  import SlamData.App (app)
  import SlamData.Helpers
    ( defaultSDConfig
    , defaultSEConfig
    , location
    , parseQueryString
    , query2SDConfig
    , query2SEConfig
    , search
    , window
    )

  import Text.Parsing.Parser (runParser)

  main :: forall eff. Eff (dom :: DOM | eff) UI
  main = do
    let search' = window # location # search
    let rawQueries = runParser search' parseQueryString
    let sdConfig = either (const defaultSDConfig) query2SDConfig rawQueries
    let seConfig = either (const defaultSEConfig) query2SEConfig rawQueries
    slamData {sdConfig: sdConfig, seConfig: seConfig}
