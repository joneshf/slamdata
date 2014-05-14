module SlamData.App.Notebook.Block
  ( block
  , BlockType()
  , markdown
  ) where

  import Data.Tuple

  import React
  import Showdown

  import SlamData.Helpers
  import SlamData.App.Panel
  import SlamData.App.Panel.Widget

  import qualified React.DOM as D

  data BlockType = Markdown | SQL

  instance showBlockType :: Show BlockType where
    show Markdown = "Markdown"
    show SQL = "SQL"

  block :: { blockType :: BlockType } -> UI
  block = mkUI spec do
    props <- getProps
    pure $ D.div {}
      [ D.div { className: "block-toolbar" }
          [ large "1" (blockType props.blockType)
          , large "11" toolbar
          ]
      , blockEditor
      ]

  blockType :: BlockType -> UI
  blockType ty = D.h3 {}
    [ D.small {} [ D.text $ show ty ]
    ]

  toolbar :: UI
  toolbar = D.div { className: "button-bar" }
    [ D.ul { className: "left button-group" }
        [ action "Preview"
        ]
    , D.ul { className: "right button-group" }
        [ action "X"
        ]
    ]

  blockEditor :: UI
  blockEditor = D.div {}
    [ D.textarea { className: "block-editor" } []
    ]

  markdown :: UI
  markdown = block { blockType: Markdown }
