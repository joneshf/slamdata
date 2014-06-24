module SlamData.App (app) where

  import React

  import SlamData.App.Menu
  import SlamData.App.Workspace

  import qualified React.DOM as D

  app :: UI
  app = D.div'
    [ menu
    , workspace {}
    ]
