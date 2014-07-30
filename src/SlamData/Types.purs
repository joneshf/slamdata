module SlamData.Types where

  import Control.Monad.Identity (Identity(..))

  import Data.Argonaut.Combinators
  import Data.Argonaut.Core
  import Data.Argonaut.Decode
  import Data.Argonaut.Encode
  import Data.Either (Either(..))
  import Data.Maybe (maybe, Maybe(..))
  import Data.Tuple (Tuple(..))

  import qualified Data.Map as M

  -- TODO: These ports should be their own type, not strings.
  newtype SDConfigWrapper = SDConfigWrapper SlamDataConfig
  newtype SEConfigWrapper = SEConfigWrapper SlamEngineConfig

  type Settings =
    { sdConfig :: SlamDataConfig
    , seConfig :: Maybe SlamEngineConfig
    }

  type SlamDataConfig =
    { server :: {location :: String, port :: Number}
    , nodeWebkit :: {java :: Maybe String}
    }

  type SlamEngineConfig =
    { mountings :: M.Map String Mounting
    , server :: {port :: Number}
    }

  type Mounting =
    {mongodb :: { connectionUri :: String
                , database :: String
                }
    }

  type SaveSettings eff = Settings -> Control.Monad.Eff.Eff (fsWrite :: FSWrite | eff) Unit

  -- TODO: Move this to the appropriate library.
  foreign import data FS :: *
  foreign import data FSWrite :: !
  type FilePath = String

  instance encodeSDConfig :: EncodeJson Identity Identity SDConfigWrapper where
    encodeJson (Identity (SDConfigWrapper sdConfig)) = Identity $
      "server" := (  "location" := sdConfig.server.location
                  ~> "port" := sdConfig.server.port
                  ~> jsonEmptyObject
                  )
      ~> "nodeWebkit" := (  "java" := maybe jsonNull fromString sdConfig.nodeWebkit.java
                         ~> jsonEmptyObject
                         )
      ~> jsonEmptyObject

  instance decodeSDConfig :: DecodeJson Identity (Either String) SDConfigWrapper where
    decodeJson (Identity json) = maybe (Left "Not SlamDataConfig.") Right $ do
      obj <- toObject json
      server <- M.lookup "server" obj >>= toObject
      location <- M.lookup "location" server >>= toString
      port <- M.lookup "port" server >>= toNumber
      nodeWebkit <- M.lookup "nodeWebkit" obj >>= toObject
      let java = M.lookup "java" nodeWebkit >>= toString
      pure (SDConfigWrapper { server: {location: location, port: port}
                            , nodeWebkit: {java: java}
                            })
