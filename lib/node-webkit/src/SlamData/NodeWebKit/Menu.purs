module SlamData.NodeWebKit.Menu where

  import Control.Monad.Eff (Eff())
  import Control.Monad.ST (newSTRef, readSTRef, writeSTRef, ST())

  import Data.Maybe (Maybe(..))

  import Node.Events (emit, on, Emitter(), EventEff())
  import Node.WebKit.Menu
    ( append
    , createMacBuiltin
    , defaultMacOptions
    , nwMenu
    , nwWindowMenu
    )
  import Node.WebKit.MenuItem
    ( nwMenuItem
    , defaultMenuItemOptions
    )
  import Node.WebKit.Types (nwMenuItemModCtrl, NW(), NWMenu(), NWWindow())
  import Node.WebKit.Window
    ( closeWindow
    )

  import SlamData.Types
    ( requestEvent
    , SlamDataEvent(..)
    , SlamDataEventTy(..)
    , SlamDataState()
    )

  foreign import platform "var platform = process.platform;" :: String

  menu :: forall eff h
       .  NWWindow
       -> Emitter
       -> SlamDataState
       -> Eff (event :: EventEff, nw :: NW, st :: ST h | eff) NWMenu
  menu win e state = do
    -- Warning, this can probably lead to a whole slew of bugs.
    -- We're updating the state each time a `requestEvent` is fired.
    -- We do this to access the latest state outside the main event handler.
    -- In particular, we need the state when firing off menu events.
    -- Do not mutate this state anywhere except these two lines.
    -- Only read from it.
    stState <- newSTRef state
    e # on requestEvent (\o -> writeSTRef stState o.state)

    -- Make the menubar.
    -- We only need to make a File menu for linux/win.
    m <- if platform == "darwin" then
        nwWindowMenu >>= createMacBuiltin "SlamData" defaultMacOptions
          {hideEdit = true, hideWindow = true}
      else do
        quitItem <- nwMenuItem defaultMenuItemOptions
          { label = "Quit"
          , click = closeWindow false win
          , key = "Q"
          , modifiers = nwMenuItemModCtrl
          }
        fileMenuItems <- nwMenu >>= append quitItem
        fileMenu <- nwMenuItem defaultMenuItemOptions
          { label = "File"
          , submenu = Just fileMenuItems
          }
        nwWindowMenu >>= append fileMenu
    settingsItem <- nwMenuItem defaultMenuItemOptions
      { label = "Settings"
      , click = do
        state <- readSTRef stState
        e # emit requestEvent (SlamDataEvent {state: state, event: ShowSettings})
      }
    editMenuItems <- nwMenu >>= append settingsItem
    editMenu <- nwMenuItem defaultMenuItemOptions
      { label = "Edit"
      , submenu = Just editMenuItems
      }
    m # append editMenu
