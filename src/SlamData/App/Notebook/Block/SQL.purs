module SlamData.App.Notebook.Block.SQL (evalSQL, LoadingStatus()) where

  import Data.Maybe

  import React

  import SlamData.App.Notebook.Block.Common
  import SlamData.App.Notebook.Block.Types
  import SlamData.App.Notebook.Types
  import SlamData.Helpers

  import qualified React.DOM as D

  data LoadingStatus = Loading
                     | Successful String
                     | Error String

  evalSQL :: forall eff state result eff' result'
          .  EventHandlerContext eff' {} BlockState result'
          -> String
          -> BlockProps eff state result
          -> UI
  evalSQL ed content =
    mkUI spec{ getInitialState = pure {status: Successful content, content: content}
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
          , D.onClick \_ -> ed
          ]
          [actualContent state.status]
        ]

  actualContent :: LoadingStatus -> UI
  actualContent Loading              = toUI $ loadingIcon {}
  actualContent (Successful content) = D.span' [D.text content]
  actualContent (Error err)          = D.span' [D.text err]

  -- Some helpers for the ffi.
  showBlockID :: BlockID -> String
  showBlockID = show
  loading = Loading
  successful str = Successful str
  err str = Error str

  foreign import cwm
    "function cwm() {\
    \  runQuery.call(this, this.state.state.content);\
    \}" :: forall a. a

  -- We can't use jQuery here, it will barf on the response.
  -- We also have to write this in the ffi since the rows are closed in `spec`
  -- so, we can't do any other effects i.e. Ajax. :(
  foreign import cdm
    "function cdm() {\
    \  var xhr = new XMLHttpRequest();\
    \  xhr.onerror = function() {\
    \    this.setState({state: {status: err('Problem loading query')}});\
    \  }.bind(this);\
    \  xhr.onload = function() {\
    \    this.setState({state: {status: successful(xhr.responseText)}});\
    \  }.bind(this);\
    \  xhr.open('GET', 'http://localhost:8080/data/fs/'+showBlockID(this.props.ident));\
    \  xhr.send(null);\
    \}" :: forall a. a

  foreign import runQuery
    "function runQuery(query) {\
    \  this.setState({state: {status: loading}});\
    \  $.ajax({\
    \    type: 'POST',\
    \    url: 'http://localhost:8080/query/fs/?out='+showBlockID(this.props.ident),\
    \    data: query,\
    \    dataType: 'json',\
    \    success: function() {\
    \      cdm.call(this);\
    \    }.bind(this),\
    \    error: function() {\
    \      this.setState({state: {status: err('Could not create query')}});\
    \    }.bind(this)\
    \  });\
    \}" :: forall a. a
