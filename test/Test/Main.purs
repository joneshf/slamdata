module Test.Main where

  import Debug.Trace (print)

  import Test.SlamData.Helpers (quickCheckHelpers)

  main = do
    print "Testing SlamData.Helpers"
    quickCheckHelpers
