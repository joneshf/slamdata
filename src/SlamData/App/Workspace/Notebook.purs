module SlamData.App.Workspace.Notebook
  ( NotebookProps()
  , NotebookState()
  , notebooks
  ) where

  import Control.Reactive.Timer (Timer())

  import Data.Array (snoc)

  import DOM (DOM())

  import Node.UUID (runUUID, v4)

  import React (createClass, spec)
  import React.Types (Component(), ComponentClass(), React(), This())

  import SlamData.App.Workspace.Notebook.Settings (settings)
  import SlamData.Components (closeIcon, newNotebookIcon)
  import SlamData.Types
    ( SlamDataRequest()
    , SlamDataState()
    , SlamDataEventTy(..)
    )
  import SlamData.Types.Workspace.Notebook (Notebook(..), NotebookID(..))

  import qualified React.DOM as D

  foreign import undefined :: forall a. a

  type NotebookProps eff =
    { request :: SlamDataRequest eff
    , state   :: SlamDataState
    }
  type NotebookState =
    { settingsId :: NotebookID
    }

  notebooks :: forall eff. ComponentClass (NotebookProps eff) NotebookState
  notebooks = createClass spec
    { displayName = "Notebooks"
    , getInitialState = \this -> pure {settingsId: NotebookID $ runUUID v4}
    , render = \this -> do
      let settings = if this.props.state.showSettings then [settingsTab this] else []
      let tabs = reifyTabs this <$> this.props.state.notebooks ++ settings
      let tabs' = tabs `snoc` createNotebookButton this.props.request
      let content = reifyContent this <$> this.props.state.notebooks ++ settings
      pure $ D.div {className: "slamdata-panel"}
        [ D.dl {className: "tabs"} tabs'
        , D.div {className: "tabs-content"} content
        ]
    }

  settingsTab :: forall fields. This (state :: NotebookState | fields) -> Notebook
  settingsTab this = Notebook
    { ident: this.state.settingsId
    , blocks: []
    , name: "Settings"
    , path: ""
    }

  createNotebookButton :: forall eff. SlamDataRequest eff -> Component
  createNotebookButton request = D.dd {className: "tab"}
    [D.div {}
      [D.a {id: "add-notebook", onClick: request CreateNotebook}
        [newNotebookIcon]
      ]
    ]

  reifyTabs :: forall fields eff props
            .  This ( state :: NotebookState
                    , props :: {request :: SlamDataRequest eff | props}
                    | fields
                    )
            -> Notebook
            -> Component
  reifyTabs this (Notebook nb) | nb.ident == this.state.settingsId =
    D.dd {className: "tab"}
      [D.a {id: "notebook-Settings"}
        [ D.rawText nb.name
        , D.i { className: "fa fa-times"
              , onClick: this.props.request HideSettings
              }
          []
        ]
      ]
  reifyTabs _ (Notebook nb) = D.dd {className: "tab"}
    [D.a {}
      [ D.rawText nb.name
      , closeIcon
      ]
    ]

  reifyContent :: forall fields eff props
               .  This ( state :: NotebookState
                       , props :: { request :: SlamDataRequest eff
                                  , state   :: SlamDataState
                                  | props}
                       | fields
                       )
               -> Notebook
               -> Component
  reifyContent this (Notebook nb) | nb.ident == this.state.settingsId =
    D.div {className: "content"}
      [settings {request: this.props.request, state: this.props.state} []
      ]
  reifyContent this (Notebook nb) = D.div {className: "content"}
    [ D.div {className: "toolbar button-bar"}
      []
    , D.hr {} []
    , D.div {className: "actual-content"}
      []
    ]
