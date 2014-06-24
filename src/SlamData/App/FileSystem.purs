module SlamData.App.FileSystem (filesystem) where

  import Data.UUID

  import React

  import SlamData.Helpers
  import SlamData.App.Panel
  import SlamData.App.Panel.Tab

  import qualified React.DOM as D

  filesystem :: {files :: [FileType]} -> UI
  filesystem = mkUI spec do
    props <- getProps
    pure $ panel [ { name: "File System"
                   , content: [D.ul' (ft2UI <$> props.files)]
                   , external: []
                   , internal: [ actionButton {tooltip: "New", icon: newIcon {}, click: pure {}}
                               , actionButton {tooltip: "Open", icon: openIcon {}, click: pure {}}
                               ]
                   , ident: runUUID v4
                   }
                 ]
  ft2UI :: FileType -> UI
  ft2UI {"type" = "directory", name = n} = D.ul' [toUI $ dirOpenIcon {}, D.text n]
  ft2UI {"type" = "file", name = n} = D.li' [toUI $ fileIcon {}, D.text n]

  -- raw2UI :: FT -> UI
  -- raw2UI (FT {fileType = File, name = n, selected = true}) =
  --   D.li [D.className "selected"]
  --     [toUI $ fileIcon {}, D.text n]
  -- raw2UI (FT {fileType = File, name = n}) =
  --   D.li' [toUI $ fileIcon {}, D.text n]

  -- raw2UI (FT {fileType = Directory, name = n, children = c, selected = true}) =
  --   D.ul'
  --     (D.div [D.className "selected"] [toUI $ dirOpenIcon {}, D.text n] : (raw2UI <$> c))
  -- raw2UI (FT {fileType = Directory, name = n, children = c}) =
  --   D.ul' $ [toUI $ dirOpenIcon {}, D.text n] ++ (raw2UI <$> c)

  -- initialState :: [UI]
  -- initialState = raw2UI <$>
  --   [ FT { fileType: Directory
  --     , name: "Reports"
  --     , selected: true
  --     , children:
  --         [ FT { fileType: Directory
  --           , name: "Report_2014-06-05"
  --           , selected: true
  --           , children:
  --               [ FT { fileType: File
  --                 , name: "Title"
  --                 , selected: false
  --                 , children: []
  --                 }
  --               , FT { fileType: File
  --                 , name: "Executive Summary"
  --                 , selected: false
  --                 , children: []
  --                 }
  --               , FT { fileType: File
  --                 , name: "Intro"
  --                 , selected: false
  --                 , children: []
  --                 }
  --               , FT { fileType: File
  --                 , name: "Experiments"
  --                 , selected: true
  --                 , children: []
  --                 }
  --               , FT { fileType: File
  --                 , name: "Results"
  --                 , selected: false
  --                 , children: []
  --                 }
  --               , FT { fileType: File
  --                 , name: "Conclusion"
  --                 , selected: false
  --                 , children: []
  --                 }
  --               ]
  --           }
  --         , FT { fileType: Directory
  --           , name: "Report_2014-05-16"
  --           , selected: false
  --           , children: []
  --           }
  --         ]
  --     }
  --   ]

  -- data FT = FT {fileType :: FileType, name :: String, children :: [FT], selected :: Boolean}
  -- data FileType = Directory | File
