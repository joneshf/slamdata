module SlamData.Browser where

  import Control.Monad.Eff (Eff())

  import Data.Either (either)

  import DOM (DOM())

  import Prelude ((#), const)

  import React (renderToElementById, UI())

  import SlamData (slamData)
  import SlamData.App (app)
  import SlamData.Helpers
    ( defaultSDConfig
    , location
    , parseQueryString
    , query2SDConfig
    , search
    , window
    , QueryString()
    )
  import SlamData.Types (SlamDataConfig())

  import Text.Parsing.Parser (runParser)

  main :: forall eff. Eff (dom :: DOM | eff) UI
  main = do
    let search' = window # location # search
    let rawQueries = runParser search' parseQueryString
    let server = either (const defaultSDConfig) query2SDConfig rawQueries
    slamData server
