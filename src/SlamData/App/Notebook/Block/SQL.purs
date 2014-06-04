module SlamData.App.Notebook.Block.SQL where

  import React

  import SlamData.App.Notebook.Block.Common

  import qualified React.DOM as D

  evalSQL :: String -> UI
  evalSQL content = D.div
    [ D.className "evaled-block"
    , D.onClick \_ -> edit
    ]
    [ D.span' [D.text content]
    ]
