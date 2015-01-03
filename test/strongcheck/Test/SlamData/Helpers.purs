module Test.SlamData.Helpers where

  import Data.Either (Either(..))
  import Data.Maybe (Maybe(..))
  import Data.String (length)
  import Data.Tuple (Tuple(..))

  import Debug.Trace (trace)

  import SlamData.Helpers

  import Test.StrongCheck

  import Text.Parsing.Parser

  import qualified Data.StrMap as SM

  quickCheck_SlamData_Helpers :: QC Unit
  quickCheck_SlamData_Helpers = do
    trace "Testing `endsWith`"
    quickCheck prop_endsWithAppend
    quickCheck prop_endsWithId
    trace "Testing `contains`"
    quickCheck prop_containsAppend
    quickCheck prop_containsId
    trace "Testing `activate`"
    quickCheck prop_activate
    trace "Testing `formatNotebookName`"
    quickCheck prop_formatNotebookName
    trace "Testing `prop_parseQuery`"
    quickCheck prop_parseQuery

  prop_endsWithAppend :: String -> String -> Boolean
  prop_endsWithAppend s s' = (s ++ s') `endsWith` s'

  prop_endsWithId :: String -> Boolean
  prop_endsWithId s = s `endsWith` s

  prop_containsAppend :: String -> String -> String -> Boolean
  prop_containsAppend s s' s'' = (s ++ s' ++ s'') `contains` s'

  prop_containsId :: String -> Boolean
  prop_containsId s = s `contains` s

  prop_activate :: String -> String -> Boolean
  prop_activate x y = if x == y
    then activate x y `contains` "active"
    else not (activate x y `contains` "active" )

  prop_formatNotebookName :: AlphaNumString -> Boolean
  prop_formatNotebookName str =
    runAlphaNumString str == formatNotebookName (runAlphaNumString str ++ ".nb")

  prop_parseQuery :: String -> String -> Result
  prop_parseQuery key val =
    let query = key ++ "=" ++ val
    in case runParser query parseQuery of
      Left  (ParseError e) -> false <?> e.message
      Right (Tuple k v) -> (k == key && v == val) <?> query

  -- prop_parseQueryString :: String -> String -> Boolean
  -- prop_parseQueryString key val =
  --   let query = "?" ++ key ++ "=" ++ val
  --   in case runParser query parseQueryString of
  --     Left  _ -> false
  --     Right (Tuple k v) -> k == key && v == val
