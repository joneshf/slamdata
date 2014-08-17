module SlamData.App.Workspace.Notebook.Block.Common
  ( blockRow
  , BlockRowProps()
  , BlockRowState()
  ) where

  import React (createClass, spec)
  import React.Types (ComponentClass())

  import qualified React.DOM as D

  type BlockRowProps = {styles :: String}
  type BlockRowState = {}

  blockRow :: ComponentClass BlockRowProps BlockRowState
  blockRow = createClass spec
    { displayName = "BlockRow"
    , render = \this -> pure $ D.div {className: this.props.styles ++ " row"}
      case this.props.children of
        (l:r:_) -> [ D.div {className: "large-1  columns"} [l]
                   , D.div {className: "large-11 columns right-side"} [r]
                   ]
        [r]     -> [ D.div {className: "large-1  columns"} []
                   , D.div {className: "large-11 columns right-side"} [r]
                   ]
        []      -> []
    }
