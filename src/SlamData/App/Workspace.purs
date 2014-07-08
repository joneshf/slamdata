module SlamData.App.Workspace (workspace) where

  import Control.Monad.Eff (Eff())

  import Data.Function (Fn2())

  import React (mkUI, readState, spec, UI())

  import SlamData.App.FileSystem (filesystem)
  import SlamData.App.Notebook (notebook)

  import SlamData.Helpers (serverURI)

  import qualified React.DOM as D

  workspace :: {} -> UI
  workspace = mkUI spec{ getInitialState = pure {files: []}
                       , componentWillMount = cwm
                       , shouldComponentUpdate = mkFn2Eff \_ s -> do
                          state <- readState
                          pure $ not $ state.files `eqArr` s.files
                       } do
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
              [notebook {files: state.files}]
          ]
      ]

  eqArr :: forall r. [{ | r}] -> [{ | r}] -> Boolean
  eqArr []     []     = true
  eqArr (x:xs) (y:ys) = x `eqObj` y && xs `eqArr` ys
  eqArr _      _      = false

  -- ffi helpers
  serverURI_ :: String
  serverURI_ = serverURI
  pollRate :: Number
  pollRate = 5000

  foreign import cwm
    "function cwm() {\
    \  var fetchFS = function() {\
    \    oboe(serverURI_ + '/metadata/fs/')\
    \    .done(function(json) {\
    \      if (this.isMounted()) {\
    \        this.setState({files: json.children});\
    \      }\
    \    }.bind(this));\
    \  }.bind(this);\
    \  fetchFS();\
    \  setInterval(fetchFS, pollRate);\
    \}" :: forall a eff. Eff eff a

  foreign import mkFn2Eff
    "function mkFn2Eff(f) {\
    \  return function(x, y) {\
    \    return f(x)(y)();\
    \  }\
    \}" :: forall a b c eff. (a -> b -> Eff eff c) -> Fn2 a b (Eff eff c)

  foreign import eqObj
    "function eqObj(o1) {\
    \  return function(o2) {\
    \    for (var k in o1) {\
    \      if ((o1.hasOwnProperty(k) && o2.hasOwnProperty(k)) && (o1[k] !== o2[k])) {\
    \        return false;\
    \      } else if (o1.hasOwnProperty(k) && !o2.hasOwnProperty(k)) {\
    \        return false;\
    \      } else if (!o1.hasOwnProperty(k) && o2.hasOwnProperty(k)) {\
    \        return false;\
    \      }\
    \    }\
    \    return true;\
    \  }\
    \}" :: forall r r'. { | r} -> { | r'} -> Boolean
