module SlamData.Helpers where

  import Data.Maybe (fromMaybe, Maybe())
  import Data.String (indexOf', length)
  import Data.Validation (runV)

  import React.Types (Element())

  import SlamData.Types
    ( Mounting(..)
    , MountingWrapper(..)
    , SDConfig(..)
    , SDConfigNodeWebkit(..)
    , SDConfigServer(..)
    , SEConfig(..)
    , SEConfigServer(..)
    , SlamDataState()
    , Validation()
    , ValidationTy(..)
    )
  import SlamData.Types.Workspace.FileSystem (FileType(..))
  import SlamData.Types.Workspace.Notebook (Notebook(..))

  import qualified Data.Map as M

  -- Random purescript stuff.

  getOrElse :: forall a. Maybe a -> a -> a
  getOrElse = flip fromMaybe

  endsWith :: String -> String -> Boolean
  endsWith str suffix =
    indexOf' suffix (length str - length suffix) str /= -1

  -- SlamData specific stuff.

  activate :: forall a. (Eq a) => a -> a -> String
  activate x y | x == y = " active"
  activate _ _          = ""

  publish :: Notebook -> String
  publish (Notebook {published = true}) = " published"
  publish _                             = ""

  defaultState :: SlamDataState
  defaultState =
    { files: FileType { name: defaultMountPath
                      , "type": "directory"
                      , children: []
                      }
    , notebooks: []
    , settings: {sdConfig: defaultSDConfig, seConfig: defaultSEConfig}
    , showSettings: false
    , showConfig: false
    , validation: M.empty
    }

  runV' :: Validation -> ValidationTy -> String
  runV' v ty = runV id (const "") $ extractV v ty
    where
      extractV v ty = M.lookup ty v `getOrElse` pure unit

  -- | Server stuff.

  defaultServerLocation = "http://localhost"
  defaultServerPort = 20223
  defaultMountPath = "/"
  defaultMongoURI = "mongodb://localhost:27017"
  defaultMongoDatabase = "test"

  defaultServerURI :: String
  defaultServerURI = defaultServerLocation ++ ":" ++ show defaultServerPort

  defaultSDConfig :: SDConfig
  defaultSDConfig = SDConfig
    { server: SDConfigServer { location: defaultServerLocation
                             , port: defaultServerPort
                             }
    , nodeWebkit: SDConfigNodeWebkit {java: "java"}
    }

  defaultSEConfig :: SEConfig
  defaultSEConfig = SEConfig
    { server: SEConfigServer {port: defaultServerPort}
    , mountings: M.singleton defaultMountPath $ MountMongo $
        MountingWrapper { connectionUri: defaultMongoURI
                    , database: defaultMongoDatabase
                    }
    }

  serverURI :: SDConfig -> String
  serverURI (SDConfig {server = SDConfigServer s}) =
    s.location ++ ":" ++ show s.port

  -- FFI stuff

  foreign import checked
    "function checked(el) {\
    \  return el.checked;\
    \}" :: Element -> Boolean

  foreign import selectedOptgroup
    "function selectedOptgroup(el) {\
    \  return el.selectedOptions[0].parentNode.label;\
    \}" :: forall r. Element -> String

  foreign import value
    "function value(el) {\
    \  return el.value;\
    \}" :: Element -> String
