module SlamData.Types.Workspace.Notebook.Settings where

  import SlamData.Types
    ( SDConfig()
    , SEConfig()
    , SlamDataRequest()
    , SlamDataState()
    )

  type SettingsProps eff =
    { request :: SlamDataRequest eff
    , state   :: SlamDataState
    }
  type SettingsState =
    { active   :: SettingsTab
    , sdConfig :: SDConfig
    , seConfig :: SEConfig
    }

  data SettingsTab = SlamDataTab
                   | SlamEngineTab

  instance eqSettingsTab :: Eq SettingsTab where
    (==) SlamDataTab   SlamDataTab   = true
    (==) SlamEngineTab SlamEngineTab = true
    (==) _             _             = false

    (/=) st            st'           = not (st == st')

  instance showSettingsTab :: Show SettingsTab where
    show SlamDataTab   = "SlamData"
    show SlamEngineTab = "SlamEngine"
