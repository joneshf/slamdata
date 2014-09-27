module SlamData.Types.Workspace.Notebook.Settings where

  import React.Types (Component())

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
