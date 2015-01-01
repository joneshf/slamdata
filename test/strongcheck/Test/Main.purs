module Test.Main where

  import Debug.Trace (trace)

  import Test.SlamData.Helpers (quickCheck_SlamData_Helpers)

  main = do
    trace "Testing SlamData.Helpers"
    quickCheck_SlamData_Helpers
