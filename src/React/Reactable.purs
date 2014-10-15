module React.Reactable where

  import Data.Argonaut.Core (Json(), jsonNull)

  import React.Types (Component(), ComponentClass())

  type ReactableProps props =
    { columns      :: [String]
    , "data"       :: Json
    , defaultSort  :: Boolean
    , filterable   :: [String]
    , itemsPerPage :: Number
    , sortable     :: [String]
    | props
    }
  type ReactableState =
    { filter      :: String
    , currentPage :: Number
    , currentSort :: { column    :: String
                     , direction :: Number -- wat
                     }
    }

  foreign import data Sort :: *

  foreign import table """
    function table(props) {
      return function(children) {
        return Reactable.Table(props, children);
      }
    }
  """ :: forall props. ComponentClass (ReactableProps props) ReactableState

  foreign import defaultTableProps """
    var defaultTableProps = {};
  """ :: forall props. ReactableProps props
