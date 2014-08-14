module SlamData.App.Workspace (workspace, WorkspaceProps(), WorkspaceState()) where

  import Control.Reactive.Timer (interval)

  import React (createClass, spec)
  import React.Types (Component(), ComponentClass())

  import SlamData.App.Workspace.FileSystem (filesystem)
  import SlamData.App.Workspace.Notebook (notebooks)
  import SlamData.Helpers (getOrElse, serverURI)
  import SlamData.Lens (_mountings, _seConfigRec)
  import SlamData.Types
    ( SlamDataEventTy(..)
    , SlamDataRequest()
    , SlamDataState()
    )
  import SlamData.Types.Workspace.FileSystem (FileType(), FileTypes(..))

  import qualified Data.Map as M
  import qualified React.DOM as D

  type WorkspaceProps eff =
    { request :: SlamDataRequest eff
    , state :: SlamDataState
    }
  type WorkspaceState = {}

  workspace :: forall eff. ComponentClass (WorkspaceProps eff) WorkspaceState
  workspace = createClass spec
    { displayName = "Workspace"
    , componentDidMount = \this -> do
      this.props.request ReadFileSystem
      interval 5000 $ this.props.request ReadFileSystem
      pure unit
    , render = \this -> pure $ D.div {id: "workspace"}
      [workspace' {request: this.props.request, state: this.props.state}]
    }

  workspace' :: forall eff
             .  WorkspaceProps eff
             -> Component
  workspace' props = D.div {className: "row", id: "main-row"}
    [ D.div {className: "small-5 medium-3 large-2 columns", id: "filesystem"}
      [filesystem props.state.files]
    , D.div {className: "small-7 medium-9 large-10 columns", id: "notebook"}
      [notebooks props []]
    ]
