module SlamData.App.Notebook.Block.Visual (evalVisual) where

  import React

  import SlamData.App.Notebook.Block.Common
  import SlamData.App.Notebook.Block.Types
  import SlamData.Helpers

  import qualified Graphics.C3 as C3
  import qualified React.DOM as D

  evalVisual :: forall eff state result extra
             .  String
             -> BlockProps eff state result (options :: C3.Options)
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
  serverURI_ = serverURI
  getOrElse_ = getOrElse
  generate_ = C3.generate

  foreign import cdm
    "function cdm() {\
    \  var defaultJson = '{\"dataSrc\": \"\", \"field\": \"\"}';\
    \  var content = JSON.parse(getOrElse_(this.props.content)(defaultJson));\
    \  var opts = newOptions(this.props.ident)(content.field);\
    \  var chart = generate_(opts)();\
    \  var data = [];\
    \  oboe(serverURI_ + '/data/fs/' + content.dataSrc)\
    \    .node('!', function(json) {\
    \      data.push(json[content.field]);\
    \      chart.load({columns: [[content.field].concat(data)]});\
    \    });\
    \}" :: forall a. a

  newOptions :: BlockID -> String -> C3.Options
  newOptions ident name = C3.options
    { bindto= "#chart-" ++ show ident
    , c3Data= [C3.c3Data{name= name}]
    }

  pieSlice o = {name: o.city, c3Type: C3.Pie, values: [o.pop]}

  _pop  o = o.pop
  _city o = o.city
  _loc  o = o.loc
  __id  o = o._id

  testData =
    [ { "_id" : "35004" , "city" : "ACMAR" , "loc" : [ -86.51557 , 33.584132] , "pop" : 6055 , "state" : "AL"}
    , { "_id" : "35005" , "city" : "ADAMSVILLE" , "loc" : [ -86.959727 , 33.588437] , "pop" : 10616 , "state" : "AL"}
    , { "_id" : "35006" , "city" : "ADGER" , "loc" : [ -87.167455 , 33.434277] , "pop" : 3205 , "state" : "AL"}
    , { "_id" : "35007" , "city" : "KEYSTONE" , "loc" : [ -86.812861 , 33.236868] , "pop" : 14218 , "state" : "AL"}
    , { "_id" : "35010" , "city" : "NEW SITE" , "loc" : [ -85.951086 , 32.941445] , "pop" : 19942 , "state" : "AL"}
    , { "_id" : "35014" , "city" : "ALPINE" , "loc" : [ -86.208934 , 33.331165] , "pop" : 3062 , "state" : "AL"}
    , { "_id" : "35016" , "city" : "ARAB" , "loc" : [ -86.489638 , 34.328339] , "pop" : 13650 , "state" : "AL"}
    , { "_id" : "35019" , "city" : "BAILEYTON" , "loc" : [ -86.621299 , 34.268298] , "pop" : 1781 , "state" : "AL"}
    , { "_id" : "35020" , "city" : "BESSEMER" , "loc" : [ -86.947547 , 33.409002] , "pop" : 40549 , "state" : "AL"}
    , { "_id" : "35023" , "city" : "HUEYTOWN" , "loc" : [ -86.999607 , 33.414625] , "pop" : 39677 , "state" : "AL"}
    , { "_id" : "35031" , "city" : "BLOUNTSVILLE" , "loc" : [ -86.568628 , 34.092937] , "pop" : 9058 , "state" : "AL"}
    , { "_id" : "35033" , "city" : "BREMEN" , "loc" : [ -87.004281 , 33.973664] , "pop" : 3448 , "state" : "AL"}
    , { "_id" : "35034" , "city" : "BRENT" , "loc" : [ -87.211387 , 32.93567] , "pop" : 3791 , "state" : "AL"}
    , { "_id" : "35035" , "city" : "BRIERFIELD" , "loc" : [ -86.951672 , 33.042747] , "pop" : 1282 , "state" : "AL"}
    , { "_id" : "35040" , "city" : "CALERA" , "loc" : [ -86.755987 , 33.1098] , "pop" : 4675 , "state" : "AL"}
    , { "_id" : "35042" , "city" : "CENTREVILLE" , "loc" : [ -87.11924 , 32.950324] , "pop" : 4902 , "state" : "AL"}
    , { "_id" : "35043" , "city" : "CHELSEA" , "loc" : [ -86.614132 , 33.371582] , "pop" : 4781 , "state" : "AL"}
    , { "_id" : "35044" , "city" : "COOSA PINES" , "loc" : [ -86.337622 , 33.266928] , "pop" : 7985 , "state" : "AL"}
    , { "_id" : "35045" , "city" : "CLANTON" , "loc" : [ -86.642472 , 32.835532] , "pop" : 13990 , "state" : "AL"}
    , { "_id" : "35049" , "city" : "CLEVELAND" , "loc" : [ -86.559355 , 33.992106] , "pop" : 2369 , "state" : "AL"}
    ]
