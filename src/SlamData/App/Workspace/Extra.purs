module SlamData.App.Workspace.Extra where

  import Control.Lens ((^.))

  import React (createClass, spec)
  import React.Types (ComponentClass())

  import SlamData.App.Workspace.Extra.Log (log)
  import SlamData.Lens (_logs)
  import SlamData.Types (Log(..), SlamDataRequest(), SlamDataState())

  import qualified React.DOM as D

  type ExtraProps eff =
    { request :: SlamDataRequest eff
    , state   :: SlamDataState
    }
  type ExtraState = {}

  extra :: forall eff. ComponentClass (ExtraProps eff) ExtraState
  extra = createClass spec
    { displayName = "Extra"
    , render = \this -> pure $ D.div {className: "row", id: "extra-row"}
      [D.div {className: "small-12 medium-12 large-12 columns", id: "log"}
        [log {logs: this.props.state^._logs} []]
      ]
    }
