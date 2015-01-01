module Test.SlamData.Helpers where

  import SlamData.Helpers

  import Test.StrongCheck

  quickCheckHelpers :: QC Unit
  quickCheckHelpers = do
    quickCheck prop_endsWith

  prop_endsWith :: String -> String -> Boolean
  prop_endsWith s s' = (s ++ s') `endsWith` s'
