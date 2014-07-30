module SlamData.App.Notebook.Settings
  ( settings
  , SettingsProps()
  , SettingsTab()
  ) where

  import Data.Function (runFn2, Fn2(), runFn3, Fn3())
  import Data.Maybe (Maybe(..))
  import Data.Tuple (Tuple(..))

  import React (getProps, mkUI, readState, spec, writeState, ReadProps(), UI())

  import SlamData.Helpers (defaultSEConfig, getOrElse)
  import SlamData.Types
    ( Mounting()
    , SaveSettings()
    , Settings()
    , SlamDataConfig()
    , SlamEngineConfig()
    )

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

  type SettingsProps eff =
    { saveSettings :: SaveSettings eff
    , sdConfig :: SlamDataConfig
    , seConfig :: Maybe SlamEngineConfig
    }

  type SettingsState =
    { active :: SettingsTab
    , sdConfig :: SlamDataConfig
    , seConfig :: Maybe SlamEngineConfig
    }

  settings :: forall eff. SettingsProps eff -> UI
  settings = mkUI spec{getInitialState = initialState} do
    props <- getProps
    state <- readState
    let sdConfig = state.sdConfig
    let seConfig = state.seConfig `getOrElse` {mountings: M.empty :: M.Map String Mounting, server: {port: sdConfig.server.port}}
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
                                  , D.onChange \e -> do
                                    let state' = updateSEServerPort state e.target.value
                                  --   -- writeState state'
                                  --   -- props.saveSettings {sdConfig: state'.sdConfig, seConfig: state'.seConfig}
                                    runFn3 wtfIsUpWithEvents writeState props.saveSettings state'
                                  , D.value $ show seConfig.server.port
                                  ]
                                  []
                              ]
                          ]
                      -- This fieldset should be a list of mountings,
                      -- rather than just one.
                      , D.fieldset'
                          [ D.legend' [D.text "MongoDB mountings"]
                          , D.div' $ mountings >>= \(Tuple path mounting) ->
                              [ D.label
                                  [D.htmlFor "mongodb-path"]
                                  [D.text "Path"]
                              , D.input
                                  [ D.name "mongodb-mongouri"
                                  , D.placeholder "/"
                                  , D.onChange \e -> pure $
                                    writeState $ updateSEMountPath state path mounting e.target.value
                                  , D.value path
                                  ]
                                  []
                              , D.label
                                  [D.htmlFor "mongodb-mongouri"]
                                  [D.text "MongoUri"]
                              , D.input
                                  [ D.name "mongodb-mongouri"
                                  , D.placeholder "mongodb://localhost:27017"
                                  , D.onChange \e -> pure $
                                    writeState $ updateSEMongoUri state path mounting e.target.value
                                  , D.value mounting.mongodb.connectionUri
                                  ]
                                  []
                              , D.label
                                  [D.htmlFor "mongodb-database"]
                                  [D.text "Database"]
                              , D.input
                                  [ D.name "mongodb-database"
                                  , D.placeholder "test"
                                  , D.onChange \e -> pure $
                                    writeState $ updateSEMongoDatabase state path mounting e.target.value
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
                                  , D.onChange \e -> do
                                    let state' = updateSDServerLocation state e.target.value
                                    runFn3 wtfIsUpWithEvents writeState props.saveSettings state'
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
                                  , D.onChange \e -> do
                                    let state' = updateSDServerPort state e.target.value
                                    runFn3 wtfIsUpWithEvents writeState props.saveSettings state'
                                  , D.value $ show sdConfig.server.port
                                  ]
                                  []
                              ]
                          ]
                      ]
                  ]
              ]
          ]
      ]

  foreign import wtfIsUpWithEvents
    "function wtfIsUpWithEvents(write, save, state) {\
    \  write(state);\
    \  save({sdConfig: state.sdConfig, seConfig: state.seConfig})();\
    \  return function() {\
    \    return state;\
    \  };\
    \}" :: forall a b c d. Fn3 a b c d

  foreign import parseInt :: Fn2 String Number Number

  -- Use the props to set up the state.
  -- Anti-pattern or not, this is the only thing that makes sense.
  initialState :: forall eff. ReadProps (SettingsProps eff) {} SettingsState
  initialState = getProps >>= \props ->
    pure { active: SlamEngineTab
         , sdConfig: props.sdConfig
         , seConfig: props.seConfig
         }

  activate :: forall a. (Eq a) => a -> a -> String
  activate x y | x == y = " active"
  activate _ _          = ""

  -- TODO: Replace this with lenses. This is ridiculous.

  updateNWJava :: SettingsState -> String -> SettingsState
  updateNWJava state x =
    let nodeWebkit' = state.sdConfig.nodeWebkit{java = Just x}
        sdConfig'   = state.sdConfig{nodeWebkit = nodeWebkit'}
    in state{sdConfig = sdConfig'}

  updateSDServerLocation :: SettingsState -> String -> SettingsState
  updateSDServerLocation state x =
    let server'   = state.sdConfig.server{location = x}
        sdConfig' = state.sdConfig{server = server'}
    in state{sdConfig = sdConfig'}

  updateSDServerPort :: SettingsState -> String -> SettingsState
  updateSDServerPort state x =
    let server'   = state.sdConfig.server{port = runFn2 parseInt x 10}
        sdConfig' = state.sdConfig{server = server'}
    in state{sdConfig = sdConfig'}

  updateSEServerPort :: SettingsState -> String -> SettingsState
  updateSEServerPort state x =
    let seConfig' = state.seConfig >>= \seConfig ->
      let server' = seConfig.server{port = runFn2 parseInt x 10} in
      pure seConfig{server = server'}
    in state{seConfig = seConfig'}

  updateSEMongoUri :: SettingsState
                   -> String
                   -> Mounting
                   -> String
                   -> SettingsState
  updateSEMongoUri state path mounting uri =
    let seConfig' = state.seConfig >>= \seConfig ->
      let mongodb' = mounting.mongodb{connectionUri = uri} in
      let mounting' = mounting{mongodb = mongodb'} in
      let mountings' = M.insert path mounting' seConfig.mountings in
      pure seConfig{mountings = mountings'}
    in state{seConfig = seConfig'}

  updateSEMongoDatabase :: SettingsState
                        -> String
                        -> Mounting
                        -> String
                        -> SettingsState
  updateSEMongoDatabase state path mounting db =
    let seConfig' = state.seConfig >>= \seConfig ->
      let mongodb' = mounting.mongodb{database = db} in
      let mounting' = mounting{mongodb = mongodb'} in
      let mountings' = M.insert path mounting' seConfig.mountings in
      pure seConfig{mountings = mountings'}
    in state{seConfig = seConfig'}

  updateSEMountPath :: SettingsState
                     -> String
                     -> Mounting
                     -> String
                     -> SettingsState
  updateSEMountPath state old mounting new =
    let seConfig' = state.seConfig >>= \seConfig ->
      let deleted = M.delete old seConfig.mountings in
      let mountings' = M.insert new mounting deleted in
      pure seConfig{mountings = mountings'}
    in state{seConfig = seConfig'}
