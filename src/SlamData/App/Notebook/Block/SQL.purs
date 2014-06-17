module SlamData.App.Notebook.Block.SQL where

  import Data.Maybe

  import React

  import SlamData.App.Notebook.Block.Common

  import qualified React.DOM as D

  evalSQL :: forall props. {index :: Number | props} -> UI
  evalSQL =
    mkUI spec{ getInitialState = pure {content: ""}
             , componentWillMount = cwm
             } do
      props <- getProps
      state <- readState
      pure $ blockRow "block-content block-sql"
        [D.div [D.className "text-center block-metadata"]
               [D.text $ "out" ++ show props.index ++ " :="]
        ]
        [D.div
          [ D.className "evaled-block"
          , D.onClick \_ -> edit
          ]
          [D.span' [D.text state.content]]
        ]

  showBlockID :: BlockID -> String
  showBlockID = show

  mayhaps = maybe
  id_ x = x

  foreign import cwm
    "function cwm(content) {\
    \  runQuery.call(this, mayhaps('')(id_)(this.props.content));\
    \}" :: forall a. a

  -- We can't use jQuery here, it will barf on the response.
  -- We also have to write this in the ffi since the rows are closed in `spec`
  -- so, we can't do any other effects i.e. Ajax. :(
  foreign import cdm
    "function cdm() {\
    \  var xhr = new XMLHttpRequest();\
    \  xhr.onerror = function() {\
    \    this.setState({state: {content: 'Problem loading query'}});\
    \  }.bind(this);\
    \  xhr.onload = function() {\
    \    this.setState({state: {content: xhr.responseText}});\
    \  }.bind(this);\
    \  xhr.open('GET', 'http://localhost:8080/data/fs/'+showBlockID(this.props.ident));\
    \  xhr.send(null);\
    \}" :: forall a. a

  foreign import runQuery
    "function runQuery(query) {\
    \  $.ajax({\
    \    type: 'POST',\
    \    url: 'http://localhost:8080/query/fs/?out='+showBlockID(this.props.ident),\
    \    data: query,\
    \    dataType: 'json',\
    \    success: function() {\
    \      cdm.call(this);\
    \    }.bind(this),\
    \    error: function() {\
    \      this.setState({state: {content: 'Problem loading query'}});\
    \    }.bind(this)\
    \  });\
    \}" :: forall a. a
