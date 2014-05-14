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
                , external: [ action "Save", action "Publish" ]
                , internal: [ D.li {}
                                [ D.button { className: "tiny secondary button"
                                      , onClick: handle $ addBlock Markdown
                                      }
                                  [ D.text "Markdown" ]
                                ]
                            , D.li {}
                                [ D.button { className: "tiny secondary button"
                                      , onClick: handle $ addBlock SQL
                                      }
                                  [ D.text "SQL" ]
                                ]
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
      addBlock ty = do
        state <- readState
        pure $ writeState {content: (block {blockType: ty}):state.content}
