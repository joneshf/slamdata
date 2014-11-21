module SlamData.App.Workspace.Extra.Log where

  import Data.Moment (format)

  import React (createClass, spec)
  import React.Types (Component(), ComponentClass())

  import SlamData.Types (Log(..))

  import qualified React.DOM as D

  type LogProps =
    { logs :: [Log]
    }
  type LogState = {}

  log :: ComponentClass LogProps LogState
  log = createClass spec
    { displayName = "Log"
    , render = \this -> pure $ D.div {}
      [ logTab
      , logContent this.props.logs
      ]
    }

  logContent :: [Log] -> Component
  logContent logs = D.div {className: "tabs-content"}
    [D.div {className: "content active"}
      [D.div {className: "actual-content"}
        [D.ul {} (reifyLog <$> logs)]
      ]
    ]

  logTab :: Component
  logTab = D.dl {className: "tabs", "data-tab": "true"}
    [D.dd {className: "tab active"}
      [D.a {} [D.rawText "Log"]]
    ]

  reifyLog :: Log -> Component
  reifyLog (LogError   m msg) = D.li {}
    [ D.span {} [D.rawText $ "[" ++ format "L LT" m ++ "] - "]
    , D.span {className: "log-error"} [D.rawText msg]
    ]
  reifyLog (LogInfo    m msg) = D.li {}
    [ D.span {} [D.rawText $ "[" ++ format "L LT" m ++ "] - "]
    , D.span {className: "log-info"} [D.rawText msg]
    ]
  reifyLog (LogWarning m msg) = D.li {}
    [ D.span {} [D.rawText $ "[" ++ format "L LT" m ++ "] - "]
    , D.span {className: "log-warning"} [D.rawText msg]
    ]
