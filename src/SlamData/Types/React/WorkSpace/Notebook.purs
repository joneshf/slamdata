module SlamData.Types.React.WorkSpace.Notebook where

  import Data.Maybe (Maybe())

  import SlamData.Types (SlamDataRequest(), SlamDataState())
  import SlamData.Types.Workspace.Notebook (NotebookID())

  type NotebookProps eff =
    { request :: SlamDataRequest eff
    , state   :: SlamDataState
    }
  type NotebookState =
    { active     :: Maybe NotebookID
    , persisting :: Boolean
    , renaming   :: Maybe String
    , settingsId :: NotebookID
    }
