module SlamData.Types where

  import Data.Maybe (Maybe(..))
  import qualified Data.Map as M

  -- TODO: These ports should be their own type, not strings.

  type Settings = {sdConfig :: SlamDataConfig, seConfig :: SlamEngineConfig}

  type SlamDataConfig =
    { server :: {location :: String, port :: String}
    , nodeWebkit :: {java :: Maybe String}
    }

  type SlamEngineConfig =
    { mountings :: M.Map String Mounting
    , server :: {port :: String}
    }

  type Mounting =
    {mongodb :: { connectionURI :: String
                , database :: String
                }
    }
