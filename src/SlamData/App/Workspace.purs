module SlamData.App.Workspace (workspace, WorkspaceProps(), WorkspaceState()) where

  import Control.Monad.Eff (Eff())
  import Control.Reactive.Timer (interval)

  import Data.Array (head)
  import Data.Tuple (fst)

  import React (createClass, spec)
  import React.Types (Component(), ComponentClass(), ReactThis())

  import SlamData.App.Workspace.Extra (extra)
  import SlamData.App.Workspace.FileSystem (filesystem)
  import SlamData.App.Workspace.Notebook (notebooks)
  import SlamData.Helpers (defaultMountPath, getOrElse, serverURI)
  import SlamData.Lens (_mountings, _seConfigRec)
  import SlamData.Types
    ( SlamDataEventTy(..)
    , SlamDataRequest()
    , SlamDataRequestEff()
    , SlamDataState()
    , SEConfig(..)
    )
  import SlamData.Types.Workspace.FileSystem (FileType(), FileTypes(..))

  import qualified Data.StrMap as SM
  import qualified React.DOM as D

  type WorkspaceProps eff =
    { request :: SlamDataRequest eff
    , state :: SlamDataState
    }
  type WorkspaceState = {}

  workspace :: forall eff. ComponentClass (WorkspaceProps eff) WorkspaceState
  workspace = createClass spec
    { displayName = "Workspace"
    -- We need to use a method that has access to the current `this`
    -- so we don't get caught with an old state.
    , requestFS = \this ->
      this.props.request $ ReadFileSystem [path this.props.state]
    , componentDidMount = \this -> do
      this.requestFS
      interval 5000 $ this.requestFS -- Don't inline this!
      pure unit
    , render = \this -> pure $ D.div {id: "workspace"}
      [ workspace' {request: this.props.request, state: this.props.state}
      , extra
        { request: this.props.request
        , state: this.props.state
        }
        []
      ]
    }

  workspace' :: forall eff
             .  WorkspaceProps eff
             -> Component
  workspace' props = D.div {className: "row", id: "main-row"}
    [ D.div {className: "small-5 medium-3 large-2 columns", id: "filesystem"}
      [filesystem {files: props.state.files, request: props.request}
        []
      ]
    , D.div {className: "small-7 medium-9 large-10 columns", id: "notebook"}
      [notebooks props []]
    ]

  path :: SlamDataState -> String
  path {settings = {seConfig = SEConfig {mountings = m}}} =
    (fst <$> SM.toList m # head) `getOrElse` defaultMountPath
