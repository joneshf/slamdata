module Test.SlamData.Helpers where

  import Debug.Trace (trace)

  import SlamData.Helpers

  import Test.StrongCheck

  quickCheck_SlamData_Helpers :: QC Unit
  quickCheck_SlamData_Helpers = do
    trace "Testing `endsWith`"
    quickCheck prop_endsWithAppend
    quickCheck prop_endsWithId
    trace "Testing `contains`"
    quickCheck prop_containsAppend
    quickCheck prop_containsId

  prop_endsWithAppend :: String -> String -> Boolean
  prop_endsWithAppend s s' = (s ++ s') `endsWith` s'

  prop_endsWithId :: String -> Boolean
  prop_endsWithId s = s `endsWith` s

  prop_containsAppend :: String -> String -> String -> Boolean
  prop_containsAppend s s' s'' = (s ++ s' ++ s'') `contains` s'

  prop_containsId :: String -> Boolean
  prop_containsId s = s `contains` s
