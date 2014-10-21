module SlamData.Types.React.WorkSpace.Notebook.Settings where

  import SlamData.Types
    ( SDConfig()
    , SEConfig()
    , SlamDataRequest()
    , SlamDataState()
    )
  import SlamData.Types.Workspace.Notebook.Settings (SettingsTab())

  type SettingsProps eff =
    { request    :: SlamDataRequest eff
    , state      :: SlamDataState
    }
  type SettingsState =
    { active   :: SettingsTab
    , sdConfig :: SDConfig
    , seConfig :: SEConfig
    , sdDirty  :: Boolean
    , seDirty  :: Boolean
    }
