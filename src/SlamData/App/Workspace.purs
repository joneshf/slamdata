module SlamData.App.Workspace (workspace) where

  import Control.Monad.Eff (Eff())

  import Data.Function (Fn2())

  import React (getProps, mkUI, readState, spec, EventHandlerContext(), UI())

  import SlamData.App.FileSystem (filesystem)
  import SlamData.App.Notebook (notebook)

  import qualified React.DOM as D

  workspace :: forall eff props state result
            .  { serverURI :: String
               , settings :: Boolean
               , hideSettings :: EventHandlerContext eff props state result
               }
            -> UI
  workspace = mkUI spec{ getInitialState = pure {files: []}
                       , componentWillMount = cwm
                       } do
    props <- getProps
    state <- readState
    pure $ D.div
      [D.idProp "workspace"]
      [D.div
          [ D.className "row"
          , D.idProp "main-row"
          ]
          [ D.div
              [ D.className $ "large-2 medium-3 small-5 columns"
              , D.idProp "filesystem"
              ]
              [filesystem {files: state.files}]
          , D.div
              [ D.className $ "large-10 medium-9 small-7 columns"
              , D.idProp "notebook"
              ]
              [notebook { files: state.files
                        , serverURI: props.serverURI
                        , settings: props.settings
                        , hideSettings: props.hideSettings
                        }
              ]
          ]
      ]

  -- ffi helpers
  pollRate :: Number
  pollRate = 5000

  foreign import cwm
    "function cwm() {\
    \  var fetchFS = function() {\
    \    oboe(this.props.serverURI + '/metadata/fs/')\
    \    .done(function(json) {\
    \      if (this.isMounted()) {\
    \        var sorted = json.children.sort(function(a, b) {\
    \          return a.name.localeCompare(b.name);\
    \        });\
    \        this.setState({files: sorted});\
    \      }\
    \    }.bind(this));\
    \  }.bind(this);\
    \  fetchFS();\
    \  setInterval(fetchFS, pollRate);\
    \}" :: forall a eff. Eff eff a
