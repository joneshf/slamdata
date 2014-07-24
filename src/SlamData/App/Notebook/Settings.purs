module SlamData.App.Notebook.Settings
  ( settings
  , SettingsTab()
  ) where

  import Data.Maybe (Maybe(..))
  import Data.Tuple (Tuple(..))

  import React (getProps, mkUI, readState, spec, writeState, ReadProps(), UI())

  import SlamData.Helpers (defaultSEConfig, getOrElse)
  import SlamData.Types (Settings(), SlamDataConfig(), SlamEngineConfig())

  import qualified Data.Map as M
  import qualified React.DOM as D

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

  type SettingsState =
    { active :: SettingsTab
    , sdConfig :: SlamDataConfig
    , seConfig :: SlamEngineConfig
    }

  settings :: Settings -> UI
  settings = mkUI spec{getInitialState = initialState} do
    state <- readState
    let sdConfig = state.sdConfig
    let seConfig = state.seConfig
    let mountings = M.toList seConfig.mountings
    pure $ D.div
      [D.className "vertical"]
      [ D.div
          [D.className "small-1  columns"]
          [D.dl
              [D.className "tabs vertical"]
              [ D.dd
                  [D.className $ "tab" ++ activate SlamEngineTab state.active]
                  [D.a
                      [D.onClick \_ -> writeState state{active = SlamEngineTab}]
                      [D.text $ show SlamEngineTab]
                  ]
              , D.dd
                  [D.className $ "tab" ++ activate SlamDataTab state.active]
                  [D.a
                      [D.onClick \_ -> writeState state{active = SlamDataTab}]
                      [D.text $ show SlamDataTab]
                  ]
              ]
          ]
      , D.div
          [D.className "small-11 columns"]
          [D.div
              [D.className "tabs-content vertical"]
              [ D.div
                  [D.className $ "content" ++ activate SlamEngineTab state.active]
                  [ D.h6' [D.text "Settings for the local instance of SlamEngine"]
                  , D.form'
                      [ D.fieldset'
                          [ D.legend' [D.text "Server"]
                          , D.div'
                              [ D.label
                                  [D.htmlFor "slamengine-port"]
                                  [D.text "Port"]
                              , D.input
                                  [ D.name "slamengine-port"
                                  , D.placeholder "8080"
                                  , D.onChange \e -> pure $
                                    writeState $ updateSEServerPort state e.target.value
                                  , D.value seConfig.server.port
                                  ]
                                  []
                              ]
                          ]
                      -- This fieldset should be a list of mountings,
                      -- rather than just one.
                      , D.fieldset'
                          [ D.legend' [D.text "MongoDB mountings"]
                          , D.div' $
                              mountings >>= \(Tuple path mounting) ->
                              [ D.label
                                  [D.htmlFor "mongodb-path"]
                                  [D.text "Path"]
                              , D.input
                                  [ D.name "mongodb-mongouri"
                                  , D.placeholder "/"
                                  -- , D.onChange \e -> pure $
                                  --   writeState $ updateSEMountPath state e.target.value
                                  , D.value path
                                  ]
                                  []
                              , D.label
                                  [D.htmlFor "mongodb-mongouri"]
                                  [D.text "MongoURI"]
                              , D.input
                                  [ D.name "mongodb-mongouri"
                                  , D.placeholder "mongodb://localhost:27017"
                                  -- , D.onChange \e -> pure $
                                  --   writeState $ updateSEMongoURI state e.target.value
                                  , D.value mounting.mongodb.connectionURI
                                  ]
                                  []
                              , D.label
                                  [D.htmlFor "mongodb-database"]
                                  [D.text "Database"]
                              , D.input
                                  [ D.name "mongodb-database"
                                  , D.placeholder "test"
                                  -- , D.onChange \e -> pure $
                                  --   writeState $ updateSEMongoDatabase state e.target.value
                                  , D.value mounting.mongodb.database
                                  ]
                                  []
                              ]
                          ]
                      , D.fieldset'
                          [ D.legend' [D.text "Java"]
                          , D.div'
                              [ D.label
                                  [D.htmlFor "java-binary"]
                                  [D.text "Binary"]
                              , D.input
                                  [ D.name "java-binary"
                                  , D.placeholder "/usr/bin/java"
                                  , D.onChange \e -> pure $
                                    writeState $ updateNWJava state e.target.value
                                  , D.value (sdConfig.nodeWebkit.java `getOrElse` "")
                                  ]
                                  []
                              ]
                          ]
                      ]
                  ]
              , D.div
                  [D.className $ "content" ++ activate SlamDataTab state.active]
                  [D.form'
                      [D.fieldset'
                          [ D.legend' [D.text "SlamEngine server"]
                          , D.div'
                              [ D.label
                                  [D.htmlFor "server-location"]
                                  [D.text "Location"]
                              , D.input
                                  [ D.name "server-location"
                                  , D.placeholder "http://localhost"
                                  , D.onChange \e -> pure $
                                    writeState $ updateServerLocation state e.target.value
                                  , D.value sdConfig.server.location
                                  ]
                                  []
                              ]
                          , D.div'
                              [ D.label
                                  [D.htmlFor "server-port"]
                                  [D.text "Post"]
                              , D.input
                                  [ D.name "server-port"
                                  , D.placeholder "8080"
                                  , D.onChange \e -> pure $
                                    writeState $ updateSDServerPort state e.target.value
                                  , D.value sdConfig.server.port
                                  ]
                                  []
                              ]
                          ]
                      ]
                  ]
              ]
          ]
      ]

  -- Use the props to set up the state.
  -- Anti-pattern or not, this is the only thing that makes sense.
  initialState :: ReadProps Settings {} SettingsState
  initialState = getProps >>= \props ->
    pure { active: SlamEngineTab
         , sdConfig: props.sdConfig
         , seConfig: props.seConfig
         }

  activate :: forall a. (Eq a) => a -> a -> String
  activate x y | x == y = " active"
  activate _ _          = ""

  -- TODO: Replace this with lenses. This is ridiculous.

  updateServerLocation :: SettingsState -> String -> SettingsState
  updateServerLocation state x =
    let server'   = state.sdConfig.server{location = x}
        sdConfig' = state.sdConfig{server = server'}
    in state{sdConfig = sdConfig'}

  updateSDServerPort :: SettingsState -> String -> SettingsState
  updateSDServerPort state x =
    let server'   = state.sdConfig.server{port = x}
        sdConfig' = state.sdConfig{server = server'}
    in state{sdConfig = sdConfig'}

  updateSEServerPort :: SettingsState -> String -> SettingsState
  updateSEServerPort state x =
    let server'   = state.seConfig.server{port = x}
        seConfig' = state.seConfig{server = server'}
    in state{seConfig = seConfig'}

  updateNWJava :: SettingsState -> String -> SettingsState
  updateNWJava state x =
    let nodeWebkit' = state.sdConfig.nodeWebkit{java = Just x}
        sdConfig'   = state.sdConfig{nodeWebkit = nodeWebkit'}
    in state{sdConfig = sdConfig'}
