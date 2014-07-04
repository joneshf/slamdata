module SlamData.App.Notebook.Block.SQL (evalSQL) where

  import Control.Apply
  import Control.Monad.Eff

  import Data.Array (snoc)
  import Data.Either
  import Data.Foldable
  import Data.Foreign
  import Data.Function
  import Data.Maybe
  import Data.Maybe.Unsafe
  import Data.UUID

  import React

  import SlamData.App.Notebook.Block.Common
  import SlamData.App.Notebook.Block.Types
  import SlamData.App.Notebook.Types
  import SlamData.Helpers

  import qualified React.DOM as D

  evalSQL :: forall eff state result extra eff' result'
          .  EventHandlerContext eff' {} BlockState result'
          -> String
          -> BlockProps eff state result extra
          -> UI
  evalSQL ed content =
    mkUI spec{ getInitialState = do
                  props <- getProps
                  let blocks = localGet EvalSQLBlocks
                  let location = getLocation props content blocks
                  pure { status: Successful content
                       , content: content
                       , location: location
                       }
             , componentWillMount = cwm
             , shouldComponentUpdate = mkFn2 \p s ->
                readState >>= _status >>> (/=) Loading >>> const (pure false)
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

  saveLocal :: forall eff state result a extra
            .  BlockProps eff state result extra
            -> EvalSQLState
            -> Eff a {}
  saveLocal props state =
    let rec = EvalSQLSpec {ident: props.ident, status: state.status, content: state.content, location: state.location}
        blocks = localGet EvalSQLBlocks
        go (EvalSQLSpec bs) = if bs.ident == props.ident then rec else EvalSQLSpec bs
        blocks' = go <$> blocks
        blocks'' = if blocks == blocks' then blocks `snoc` rec else blocks'
    in (pure $ localSet EvalSQLBlocks blocks'') *> pure {}

  actualContent :: LoadingStatus -> UI
  actualContent Loading              = toUI $ loadingIcon {}
  actualContent (Error err)          = D.span' [D.text err]
  actualContent (Successful content) = D.ul' (format <$> parseRaw content)

  format str = D.li' [D.span' [D.text str]]

  getLocation :: forall eff state result extra
              .  BlockProps eff state result extra
              -> String
              -> [EvalSQLSpec]
              -> Maybe String
  getLocation props content blocks = do
    ess <- find (essIdent >>> (==) props.ident) blocks
    guardMaybe (essContent ess == content) $
      essLocation ess

  -- Projections
  essIdent :: EvalSQLSpec -> BlockID
  essIdent (EvalSQLSpec ess) = ess.ident
  essContent :: EvalSQLSpec -> String
  essContent (EvalSQLSpec ess) = ess.content
  essLocation :: EvalSQLSpec -> Maybe String
  essLocation (EvalSQLSpec ess) = ess.location
  _status o = o.status

  -- Some helpers for the ffi.
  showBlockID :: BlockID -> String
  showBlockID = show
  loading = Loading
  successful str = Successful str
  err str = Error str
  just = Just
  blockID :: String -> BlockID
  blockID = parse >>> unparse >>> BlockID
  isJust_ = isJust
  fromJust_ = fromJust
  newID _ = BlockID $ runUUID v4
  serverURI_ = serverURI

  pagingLimit = 20

  foreign import cwm
    "function cwm() {\
    \  extendState.call(this, {status: loading});\
    \  if (isJust_(this.state.state.location)) {\
    \    cdm.call(this, fromJust_(this.state.state.location));\
    \  } else {\
    \    runQuery.call(this, this.state.state.content);\
    \  }\
    \}" :: forall a. a

  -- We can't use jQuery here, it will barf on the response.
  -- We also have to write this in the ffi since the rows are closed in `spec`
  -- so, we can't do any other effects i.e. Ajax. :(
  -- TODO: Finally, we need to replace this with oboe once
  -- https://github.com/jimhigson/oboe.js/issues/42 is resolved
  foreign import cdm
    "function cdm(location) {\
    \  var xhr = new XMLHttpRequest();\
    \  xhr.onerror = function() {\
    \    if (this.isMounted()) {\
    \      extendState.call(this, {status: err('Problem loading query')});\
    \    }\
    \  }.bind(this);\
    \  xhr.onload = function() {\
    \    if (this.isMounted()) {\
    \      extendState.call(this, {status: successful(xhr.responseText)});\
    \    }\
    \  }.bind(this);\
    \  xhr.open('GET', serverURI_ + '/data/fs/' + location);\
    \  xhr.send(null);\
    \}" :: forall a. a

  foreign import runQuery
    "function runQuery(query) {\
    \  var id = newID();\
    \  $.ajax({\
    \    type: 'POST',\
    \    url: serverURI_ + '/query/fs/?out=' + showBlockID(id),\
    \    data: query,\
    \    dataType: 'json',\
    \    success: function(data, status, jqXHR) {\
    \      /* Parse the location out of the response. */\
    \      var location = data.out;\
    \      if (this.isMounted()) {\
    \        extendState.call(this, {location: just(location)});\
    \      }\
    \      saveLocal(this.props)(this.state.state);\
    \      cdm.call(this, location);\
    \    }.bind(this),\
    \    error: function() {\
    \      if (this.isMounted()) {\
    \        extendState.call(this, {status: err('Could not create query')});\
    \      }\
    \    }.bind(this)\
    \  });\
    \}" :: forall a. a

  -- purescript-react wraps the state in another object for some reason.
  -- This should make it easier to work with from the ffi.
  foreign import extendState
    "function extendState(neu) {\
    \  return this.setState({state: extend(this.state.state)(neu)});\
    \}" :: forall a. a

  foreign import extend
    "function extend(old) {\
    \  return function(neu) {\
    \    return copy(neu)(copy(old)({}));\
    \  }\
    \}" :: forall a b c. a -> b -> c

  foreign import copy
    "function copy(neu) {\
    \  return function(old) {\
    \    for (var key in neu) {\
    \      old[key] = neu[key];\
    \    }\
    \    return old;\
    \  }\
    \}" :: forall a b c. a -> b -> c

  foreign import parseRaw
    "function parseRaw(raw) {\
    \  return raw.trim().split('\\n');\
    \}" :: forall a. a
