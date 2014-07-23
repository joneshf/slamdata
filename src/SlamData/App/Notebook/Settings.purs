module SlamData.App.Notebook.Settings
  ( settings
  , SettingsTab()
  ) where

  import React (mkUI, readState, spec, writeState, UI())

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

  settings :: {} -> UI
  settings = mkUI spec{getInitialState = pure initialState} do
    state <- readState
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
                                  [D.htmlFor "slamengine-location"]
                                  [D.text "Location"]
                              , D.input
                                  [ D.name "slamengine-location"
                                  , D.placeholder "http://localhost"
                                  ]
                                  []
                              , D.label
                                  [D.htmlFor "slamengine-port"]
                                  [D.text "Port"]
                              , D.input
                                  [ D.name "slamengine-port"
                                  , D.placeholder "8080"
                                  ]
                                  []
                              ]
                          ]
                      , D.fieldset'
                          [ D.legend' [D.text "MongoDB mountings"]
                          , D.div'
                              [ D.label
                                  [D.htmlFor "mongodb-path"]
                                  [D.text "Path"]
                              , D.input
                                  [ D.name "mongodb-mongouri"
                                  , D.placeholder "/"
                                  ]
                                  []
                              , D.label
                                  [D.htmlFor "mongodb-mongouri"]
                                  [D.text "MongoURI"]
                              , D.input
                                  [ D.name "mongodb-mongouri"
                                  , D.placeholder "mongodb://localhost:27017"
                                  ]
                                  []
                              , D.label
                                  [D.htmlFor "mongodb-database"]
                                  [D.text "Database"]
                              , D.input
                                  [ D.name "mongodb-database"
                                  , D.placeholder "test"
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
                                  ]
                                  []
                              ]
                          ]
                      ]
                  ]
              ]
          ]
      ]

  initialState :: {active :: SettingsTab}
  initialState = {active: SlamEngineTab}

  activate :: forall a. (Eq a) => a -> a -> String
  activate x y | x == y = " active"
  activate _ _          = ""
