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
                       , content: (\ty -> block {blockType: ty}) <$> state.content
                       , external: [ actionButton "Save"
                                   , actionButton "Publish"
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
      actionBlock ty = D.li'
        [ D.button [ D.className "tiny secondary button"
                   , D.onClick $ \_ -> addBlock ty
                   ]
                   [ D.text $ show ty ]
        ]
      addBlock ty = do
        state <- readState
        pure $ writeState {content: ty:state.content}
