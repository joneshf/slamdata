module SlamData.App.Workspace.Notebook
  ( NotebookProps()
  , NotebookState()
  , notebooks
  ) where

  import Control.Reactive.Timer (Timer())

  import Data.Array (snoc)

  import DOM (DOM())

  import React (createClass, spec)
  import React.Types (Component(), ComponentClass(), React())

  import SlamData.Components (closeIcon, newNotebookIcon)
  import SlamData.Types
    ( SlamDataRequest()
    , SlamDataState()
    , SlamDataEventTy(..)
    )
  import SlamData.Types.Workspace.Notebook (Notebook(..))

  import qualified React.DOM as D

  foreign import undefined :: forall a. a

  type NotebookProps eff =
    { request :: SlamDataRequest eff
    , state   :: SlamDataState
    }
  type NotebookState = {}

  notebooks :: forall eff. ComponentClass (NotebookProps eff) NotebookState
  notebooks = createClass spec
    { displayName = "Notebooks"
    , render = \this -> do
      let tabs = reifyTabs <$> this.props.state.notebooks
      let tabs' = tabs `snoc` createNotebookButton this.props.request
      pure $ D.div {className: "slamdata-panel"}
        [ D.dl {className: "tabs"} tabs'
        , D.div {className: "tabs-content"} []
        ]
    }

  createNotebookButton :: forall eff. SlamDataRequest eff -> Component
  createNotebookButton request = D.dd {className: "tab"}
    [D.div {}
      [D.a {id: "add-notebook", onClick: request CreateNotebook}
        [newNotebookIcon]
      ]
    ]

  reifyTabs :: Notebook -> Component
  reifyTabs (Notebook nb) = D.dd {className: "tab"}
    [D.a {}
      [ D.rawText nb.name
      , closeIcon
      ]
    ]

  -- reifyBlocks :: Notebook -> Component
