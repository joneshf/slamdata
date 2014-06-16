module SlamData.App.Notebook.Block.SQL where

  import React

  import SlamData.App.Notebook.Block.Common

  import qualified React.DOM as D

  evalSQL :: String -> UI
  evalSQL content =
    (mkUI spec{ getInitialState = pure {out: ""}
              , componentWillMount = cwm
              } do
      state <- readState
      pure $ D.div
        [ D.className "evaled-block"
        , D.onClick \_ -> edit
        ]
        [ D.span' [D.text state.out]
        ]) {content: content}

  foreign import cwm
    "function cwm(content) {\
    \  runQuery.call(this, this.props.content);\
    \}" :: forall a. a

  foreign import runQuery
    "function runQuery(query) {\
    \  $.post({\
    \    url: 'http://localhost:8081/query/fs/?out=tmp123',\
    \    data: query,\
    \    dataType: 'json',\
    \    success: function(data) {\
    \      this.replaceState({state: {out: data.out}})\
    \    }.bind(this)\
    \  });\
    \}" :: forall a. a
