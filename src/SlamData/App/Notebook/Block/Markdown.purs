module SlamData.App.Notebook.Block.Markdown where

  import React

  import Showdown

  import SlamData.App.Notebook.Block.Common

  import qualified React.DOM as D

  evalMarkdown :: String -> UI
  evalMarkdown content = D.div
    [ D.className "evaled-block"
    , D.onClick \_ -> edit
    ]
    [ D.span [D.dangerouslySetInnerHTML $ makeHtml content] []
    ]
