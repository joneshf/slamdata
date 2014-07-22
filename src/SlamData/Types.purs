module SlamData.Types where

  type SlamDataConfig =
    { server :: {location :: String, port :: Number}
    , "node-webkit" :: {java :: String}
    }
