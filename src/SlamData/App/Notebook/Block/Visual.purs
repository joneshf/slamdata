module SlamData.App.Notebook.Block.Visual (evalVisual) where

  import React

  import SlamData.App.Notebook.Block.Common
  import SlamData.App.Notebook.Block.Types
  import SlamData.Helpers

  import qualified Graphics.C3 as C3
  import qualified React.DOM as D

  evalVisual :: forall eff state result extra
             .  String
             -> BlockProps eff state result extra
             -> UI
  evalVisual content = mkUI spec{componentDidMount=cdm} do
    props <- getProps
    pure $ blockRow "block-content" []
      [D.div
        [ D.className "evaled-block"
        ]
        [ D.div [D.idProp $ "chart-" ++ show props.ident] []
        ]
      ]

  -- ffi helpers
  getOrElse_ = getOrElse
  generate_ = C3.generate

  foreign import cdm
    "function cdm() {\
    \  var defaultJson = '{\"dataSrc\": \"\", \"field\": \"\", \"visualType\": \"\"}';\
    \  try {\
    \    var content = JSON.parse(getOrElse_(this.props.content)(defaultJson));\
    \  } catch (e) {\
    \    var content = JSON.parse(defaultJson);\
    \  }\
    \  var opts = newOptions(this.props.ident)(content.field)(parseVisualType(content.visualType));\
    \  var chart = generate_(opts)();\
    \  var data = [];\
    \  oboe(this.props.serverURI + '/data/fs' + this.props.serverFS + content.dataSrc)\
    \    .node('!', function(json) {\
    \      data.push(json[content.field]);\
    \      chart.load({columns: [[content.field].concat(data)]});\
    \    });\
    \}" :: forall a. a

  newOptions :: BlockID -> String -> VisualType -> C3.Options
  newOptions ident name ty = C3.options
    { bindto= "#chart-" ++ show ident
    , c3Data= [C3.c3Data{name= name, c3Type= ty}]
    }

  parseVisualType "bar" = C3.Bar
  parseVisualType "line" = C3.Line
  parseVisualType "pie" = C3.Pie
  parseVisualType _ = C3.Bar
