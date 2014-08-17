module React.TreeView where

  import React.Types (Component(), ComponentClass())

  type TreeViewProps props =
    { collapsed        :: Boolean
    , defaultCollapsed :: Boolean
    , nodeLabel        :: Component
    | props
    }
  type TreeViewState =
    {collapsed :: Boolean}

  foreign import treeView
    "function treeView(props) {\
    \  return function(children) {\
    \    return TreeView(props, children);\
    \  }\
    \}" :: forall props. ComponentClass (TreeViewProps props) TreeViewState
