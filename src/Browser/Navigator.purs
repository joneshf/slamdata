module Browser.Navigator where

  import Control.Monad.Eff (Eff())

  type Navigator =
    { appCodeName  :: String
    , appName      :: String
    , appVersion   :: String
    , platform     :: String
    , product      :: String
    , taintEnabled :: Unit -> Boolean
    , userAgent    :: String
    }

  foreign import data NavigatorEff :: !

  foreign import navigator "var navigator = window.navigator;" :: Navigator
