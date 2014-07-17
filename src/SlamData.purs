module SlamData where

  import Data.Either (either)

  import React (renderToElementById)

  import SlamData.App (app)
  import SlamData.Helpers
    ( defaultServerURI
    , getServerURI
    , location
    , parseQueryString
    , search
    , window
    , QueryString()
    )

  import Text.Parsing.Parser (runParser)

  main = do
    let search' = window # location # search
    let rawQueries = runParser search' parseQueryString
    let server = either (const defaultServerURI) getServerURI rawQueries
    renderToElementById "content" $ app {serverURI: server}
