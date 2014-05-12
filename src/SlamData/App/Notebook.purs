module SlamData.App.Notebook (notebook) where

  import React

  import SlamData.App.Panel
  import SlamData.App.Panel.Widget

  import qualified React.DOM as D

  notebook :: UI
  notebook = nbPanel

  nbPanel :: UI
  nbPanel = panel { widgets: [ widget { name: "untitled"
                                      , content: "This is some content like crazy."
                                      }
                             ]
                  }
