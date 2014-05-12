module SlamData.App.Reference (reference) where

  import React

  import SlamData.App.Panel
  import SlamData.App.Panel.Widget

  import qualified React.DOM as D

  reference :: UI
  reference = refPanel

  refPanel :: UI
  refPanel = panel { widgets: [ widget { name: "Tutorial"
                                       , content: "This is some content like crazy."
                                       }
                              , widget { name: "References"
                                       , content: "This is some content like crazy."
                                       }
                              , widget { name: "Examples"
                                       , content: "This is some content like crazy."
                                       }
                              , widget { name: "Notes"
                                       , content: "This is some content like crazy."
                                       }
                              ]
                   }
