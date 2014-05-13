module SlamData.App.Notebook.Block where

  import Data.Tuple

  import React
  import Showdown

  import SlamData.Helpers
  import SlamData.App.Panel
  import SlamData.App.Panel.Widget

  import qualified React.DOM as D

  markdown :: {content :: String} -> UI
  markdown = mkUI spec do
    props <- getProps
    pure $ D.div {}
      [ row [ D.div { className: "column large-2" } [ D.text "markdown" ] ]
      , row [ D.span { dangerouslySetInnerHTML: { __html: makeHtml props.content }} [] ]
      , D.a { className: "tiny button expand" } [ D.text "+"]
      ]
