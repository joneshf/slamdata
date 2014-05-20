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
                [ toolbar ty
                ]
        ]
    , blockEditor ty
    ]

  blockType :: BlockType -> UI
  blockType ty = D.h3'
    [ D.small' [ D.text $ show ty ]
    ]

  toolbar :: BlockType -> UI
  toolbar ty = D.div [ D.className "button-bar" ]
    [ D.ul [ D.className "left button-group" ] (specificButtons ty)
    , D.ul [ D.className "right button-group" ] standardButtons
    ]
      where
        standardButtons = [ actionButton "X" ]
        specificButtons Markdown = [ actionButton "Preview" ]
        specificButtons SQL      = [ actionButton "Run" ]

  blockEditor :: BlockType -> UI
  blockEditor _ = D.div'
    [ D.textarea [ D.className "block-editor" ] []
    ]

  markdown :: UI
  markdown = block { blockType: Markdown }

  sql :: UI
  sql = block { blockType: SQL }
