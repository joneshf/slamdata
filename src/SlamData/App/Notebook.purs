module SlamData.App.Notebook (notebook) where

  import Control.Monad.Eff

  import React

  import SlamData.Helpers
  import SlamData.App.Notebook.Block
  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  notebook :: UI
  notebook = nbPanel {}

  nbPanel :: {} -> UI
  nbPanel = mkUI spec { getInitialState = pure { content: [] } } do
    state <- readState
    pure $ panel [ tab { name: "Untitled Notebook"
                , content: state.content
                , external: [ action "Save"
                            , action "Publish"
                            ]
                , internal: [ actionBlock Markdown
                            , actionBlock SQL
                            ]
                , active: true
                }
          , tab { name: "+"
                , content: []
                , external: []
                , internal: []
                , active: false
                }
          ]
    where
      actionBlock ty = D.li {}
        [ D.button { className: "tiny secondary button"
              , onClick: handle $ addBlock ty
              }
          [ D.text $ show ty ]
        ]
      addBlock ty = do
        state <- readState
        pure $ writeState {content: (block {blockType: ty}):state.content}
