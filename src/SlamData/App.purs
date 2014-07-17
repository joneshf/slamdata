module SlamData.App (app) where

  import React

  import SlamData.App.Menu
  import SlamData.App.Workspace

  import qualified React.DOM as D

  app :: {serverURI :: String} -> UI
  app = mkUI spec $ do
    props <- getProps
    pure $ D.div'
      [ menu
      , workspace {serverURI: props.serverURI}
      ]
