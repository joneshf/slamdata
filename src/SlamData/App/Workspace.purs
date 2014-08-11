module SlamData.App.Workspace (workspace, WorkspaceProps(), WorkspaceState()) where

  import Control.Lens ((^.), (..))
  import Control.Monad.Eff (Eff())
  import Control.Reactive.Timer (interval, Timer())

  import Data.Argonaut.Core (Json())
  import Data.Argonaut.Decode (decodeMaybe)
  import Data.Argonaut.Parser (parseMaybe)
  import Data.Array (head)
  import Data.Maybe (Maybe())

  import DOM (DOM())

  import Network.Oboe (done, fail, oboeGet, OboeEff())

  import React (createClass, spec)
  import React.Types (Component(), ComponentClass(), React(), ReactThis())

  import SlamData.App.Workspace.FileSystem (filesystem)
--   import SlamData.App.Notebook (notebook)
  import SlamData.Helpers (getOrElse, serverURI)
  import SlamData.Lens (_mountings, _seConfigRec)
  import SlamData.Types
    ( FileType()
    , FileTypes(..)
    , Settings()
    , SlamDataCont()
    , SlamDataEvent(..)
    )

  import qualified Data.Map as M
  import qualified React.DOM as D

  type WorkspaceProps =
    { files :: [FileType]
    , settings :: Settings
    }
  type WorkspaceState = {files :: [FileType]}

  workspace :: forall eff. ComponentClass WorkspaceProps WorkspaceState
  workspace = createClass spec
    { displayName = "Workspace"
    , componentDidMount = \this -> do
      let mountings = M.keys $ this.props.settings.seConfig^._seConfigRec.._mountings
      let root = head mountings `getOrElse` "/"
      let url = serverURI this.props.settings.sdConfig ++ "/metadata/fs" ++ root
      readFS this url
      interval 5000 (readFS this url)
      pure unit
    , getInitialState = \_ -> pure {files: [] :: [FileType]}
    , render = \this -> pure $ D.div {id: "workspace"}
      [workspace' this.state.files]
    }

  readFS :: forall eff fields
         .  ReactThis (settings :: Settings | fields) WorkspaceProps WorkspaceState
         -> String
         -> Eff (oboe :: OboeEff | eff) Unit
  readFS this url = do
    o <- oboeGet $ url
    done o \json -> do
      let decoded = parseMaybe (stringify json) >>= decodeMaybe
      let files = ((\(FileTypes fts) -> fts.children) <$> decoded) `getOrElse` []
      pure $ this.setState {files: files}
    pure unit

  foreign import stringify "function stringify(x) { return JSON.stringify(x, null, 4); }" :: forall a. a -> String

  workspace' :: [FileType] -> Component
  workspace' files = D.div {className: "row", id: "main-row"}
    [ D.div {className: "small-5 medium-3 large-2 columns", id: "filesystem"}
      [filesystem files]
    , D.div {className: "small-7 medium-9 large-10 columns", id: "notebook"}
      [D.rawText "notebooks"]
    ]
