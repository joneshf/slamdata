module SlamData.App.Notebook.Block
  ( block
  , BlockType(..)
  , markdown
  , sql
  ) where

  import Data.Tuple

  import React
  import Showdown

  import SlamData.Helpers
  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  data BlockType = Markdown | SQL

  instance showBlockType :: Show BlockType where
    show Markdown = "Markdown"
    show SQL = "SQL"

  block :: { blockType :: BlockType } -> UI
  block {blockType = ty} = D.div'
    [ D.div [ D.className "block-toolbar" ]
        [ D.div [ D.className "large-1 columns" ] [blockType ty]
        , D.div [ D.className "large-11 columns" ]
                [ toolbar {}
                ]
        ]
    , blockEditor {}
    ]

  blockType :: BlockType -> UI
  blockType ty = D.h3'
    [ D.small' [ D.text $ show ty ]
    ]

  -- TODO: purescript-react should take care of this better,
  -- We have to ensure we're not creating a "var" in jsland,
  -- otherwise the component gets reused and we start violating invariants
  -- in React.
  toolbar :: {} -> UI
  toolbar _ = D.div [ D.className "button-bar" ]
    [ D.ul [ D.className "left button-group" ]
        [ actionButton "Preview"
        ]
    , D.ul [ D.className "right button-group" ]
        [ actionButton "X"
        ]
    ]

  -- TODO: purescript-react should take care of this better,
  -- We have to ensure we're not creating a "var" in jsland,
  -- otherwise the component gets reused and we start violating invariants
  -- in React.
  blockEditor :: {} -> UI
  blockEditor _ = D.div'
    [ D.textarea [ D.className "block-editor" ] []
    ]

  markdown :: UI
  markdown = block { blockType: Markdown }

  sql :: UI
  sql = block { blockType: SQL }
