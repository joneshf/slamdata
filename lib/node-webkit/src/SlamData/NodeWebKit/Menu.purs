module SlamData.NodeWebKit.Menu where

  import Control.Events (EventEff())
  import Control.Monad.Eff (Eff())
  import Control.Monad.ST (newSTRef, readSTRef, runST, writeSTRef, ST())

  import Data.Maybe (Maybe(..))

  import Node.Events (emit, on, Emitter())
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
  import Node.WebKit.Types
    ( nwMenuItemModAlt
    , nwMenuItemModCmd
    , nwMenuItemModCtrl
    , nwMenuItemModShift
    , nwMenuItemSeparator
    , NW()
    , NWMenu()
    , NWWindow()
    )
  import Node.WebKit.Window
    ( closeWindow
    )

  import SlamData.Types
    ( requestEvent
    , responseEvent
    , SlamDataEvent(..)
    , SlamDataEventTy(..)
    , SlamDataState()
    )

  foreign import platform "var platform = process.platform;" :: String
  foreign import execCommand """
    function execCommand(command) {
      return function() {
        document.execCommand(command);
        return {};
      }
    }""" :: forall eff. String -> Eff eff Unit

  menu :: forall eff
       .  NWWindow
       -> Emitter
       -> Eff (event :: EventEff, nw :: NW| eff) NWMenu
  menu win e = do
    let handleSettings = e # emit requestEvent (SlamDataEvent {event: ShowSettings})

    -- Make the menubar.
    -- We only need to make a File menu for linux/win.
    if platform == "darwin"
      then macMenu handleSettings
      else nonMacMenu win handleSettings

  nonMacMenu win handleSettings = do
    quitItem <- nwMenuItem defaultMenuItemOptions
      { label = "Quit"
      , click = closeWindow false win
      , key = "q"
      , modifiers = nwMenuItemModCtrl
      }
    fileMenuItems <- nwMenu >>= append quitItem
    fileMenu <- nwMenuItem defaultMenuItemOptions
      { label = "File"
      , submenu = Just fileMenuItems
      , key = "f"
      , modifiers = nwMenuItemModAlt
      }

    undoItem <- nwMenuItem defaultMenuItemOptions
      { label = "Undo"
      , click = execCommand "undo"
      , key = "z"
      , modifiers = nwMenuItemModCtrl
      }
    redoItem <- nwMenuItem defaultMenuItemOptions
      { label = "Redo"
      , click = execCommand "redo"
      , key = "y"
      , modifiers = nwMenuItemModCtrl
      }
    sep1 <- nwMenuItem defaultMenuItemOptions
      { "type" = nwMenuItemSeparator
      }
    cutItem <- nwMenuItem defaultMenuItemOptions
      { label = "Cut"
      , click = execCommand "cut"
      , key = "x"
      , modifiers = nwMenuItemModCtrl
      }
    copyItem <- nwMenuItem defaultMenuItemOptions
      { label = "Copy"
      , click = execCommand "copy"
      , key = "c"
      , modifiers = nwMenuItemModCtrl
      }
    pasteItem <- nwMenuItem defaultMenuItemOptions
      { label = "Paste"
      , click = execCommand "paste"
      , key = "v"
      , modifiers = nwMenuItemModCtrl
      }
    deleteItem <- nwMenuItem defaultMenuItemOptions
      { label = "Delete"
      , click = execCommand "delete"
      , key = ""
      }
    selectAllItem <- nwMenuItem defaultMenuItemOptions
      { label = "Select All"
      , click = execCommand "selectAll"
      , key = "a"
      , modifiers = nwMenuItemModCtrl
      }
    sep2 <- nwMenuItem defaultMenuItemOptions
      { "type" = nwMenuItemSeparator
      }
    settingsItem <- nwMenuItem defaultMenuItemOptions
      { label = "Settings"
      , click = handleSettings
      }
    editMenuItems <- nwMenu
      >>= append undoItem
      >>= append redoItem
      >>= append sep1
      >>= append cutItem
      >>= append copyItem
      >>= append pasteItem
      >>= append deleteItem
      >>= append selectAllItem
      >>= append sep2
      >>= append settingsItem
    editMenu <- nwMenuItem defaultMenuItemOptions
      { label = "Edit"
      , submenu = Just editMenuItems
      , key = "e"
      , modifiers = nwMenuItemModAlt
      }

    nwWindowMenu
      >>= append fileMenu
      >>= append editMenu

  macMenu handleSettings = do
    aboutItem <- nwMenuItem defaultMenuItemOptions
      { label = "About SlamData"
      , selector = "orderFrontStandardAboutPanel:"
      }
    sep1 <- nwMenuItem defaultMenuItemOptions
      { "type" = nwMenuItemSeparator
      }
    preferencesItem <- nwMenuItem defaultMenuItemOptions
      { label = "Preferences..."
      , key = ","
      , click = handleSettings
      }
    sep2 <- nwMenuItem defaultMenuItemOptions
      { "type" = nwMenuItemSeparator
      }
    hideItem <- nwMenuItem defaultMenuItemOptions
      { label = "Hide SlamData"
      , selector = "hide:"
      , key = "h"
      }
    hideAllItem <- nwMenuItem defaultMenuItemOptions
      { label = "Hide Others"
      , selector = "hideOtherApplications:"
      , key = "h"
      , modifiers = nwMenuItemModCmd ++ nwMenuItemModAlt
      }
    showAllItem <- nwMenuItem defaultMenuItemOptions
      { label = "Show All"
      , selector = "unhideAllApplications:"
      }
    sep3 <- nwMenuItem defaultMenuItemOptions
      { "type" = nwMenuItemSeparator
      }
    quitItem <- nwMenuItem defaultMenuItemOptions
      { label = "Quit SlamData"
      , selector = "closeAllWindowsQuit:"
      , key = "q"
      }
    appMenuItems <- nwMenu
      >>= append aboutItem
      >>= append sep1
      >>= append preferencesItem
      >>= append sep2
      >>= append hideItem
      >>= append hideAllItem
      >>= append showAllItem
      >>= append sep3
      >>= append quitItem
    appMenu <- nwMenuItem defaultMenuItemOptions
      { label = "SlamData"
      , submenu = Just appMenuItems
      }

    undoItem <- nwMenuItem defaultMenuItemOptions
      { label = "Undo"
      , selector = "undo:"
      , key = "z"
      }
    redoItem <- nwMenuItem defaultMenuItemOptions
      { label = "Redo"
      , selector = "redo:"
      , key = "z"
      , modifiers = nwMenuItemModCmd ++ nwMenuItemModShift
      }
    sep <- nwMenuItem defaultMenuItemOptions
      { "type" = nwMenuItemSeparator
      }
    cutItem <- nwMenuItem defaultMenuItemOptions
      { label = "Cut"
      , selector = "cut:"
      , key = "x"
      }
    copyItem <- nwMenuItem defaultMenuItemOptions
      { label = "Copy"
      , selector = "copy:"
      , key = "c"
      }
    pasteItem <- nwMenuItem defaultMenuItemOptions
      { label = "Paste"
      , selector = "paste:"
      , key = "v"
      }
    deleteItem <- nwMenuItem defaultMenuItemOptions
      { label = "Delete"
      , selector = "delete:"
      , key = ""
      }
    selectAllItem <- nwMenuItem defaultMenuItemOptions
      { label = "Select All"
      , selector = "selectAll:"
      , key = "a"
      }
    editMenuItems <- nwMenu
      >>= append undoItem
      >>= append redoItem
      >>= append sep
      >>= append cutItem
      >>= append copyItem
      >>= append pasteItem
      >>= append deleteItem
      >>= append selectAllItem
    editMenu <- nwMenuItem defaultMenuItemOptions
      { label = "Edit"
      , submenu = Just editMenuItems
      }

    minimizeItem <- nwMenuItem defaultMenuItemOptions
      { label = "Minimize"
      , selector = "performMiniaturize:"
      , key = "m"
      }
    sep <- nwMenuItem defaultMenuItemOptions
      { "type" = nwMenuItemSeparator
      }
    frontItem <- nwMenuItem defaultMenuItemOptions
      { label = "Bring All to Front"
      , selector = "arrangeInFront:"
      }
    windowMenuItems <- nwMenu
      >>= append minimizeItem
      >>= append sep
      >>= append frontItem
    windowMenu <- nwMenuItem defaultMenuItemOptions
      { label = "Window"
      , submenu = Just windowMenuItems
      }

    nwWindowMenu
      >>= append appMenu
      >>= append editMenu
      >>= append windowMenu
