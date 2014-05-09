module SlamData where

  import React

  import SlamData.Login

  main = renderToElementById "loginModal" (loginForm {})
  -- main = Debug.Trace.print ""
