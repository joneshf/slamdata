
module SlamData.App.Workspace.Notebook.Block.Visual
  ( visualEditor
  , VisualProps()
  , VisualState()
  , VisualTab(..)
  ) where

  import React (coerceThis, createClass, eventHandler, spec)
  import React.Types (Component(), ComponentClass(), ReactThis())

  import SlamData.Helpers (activate)

  import SlamData.App.Workspace.Notebook.Block.Common (blockRow)
  import SlamData.Types.Workspace.FileSystem (FileType(..))

  import qualified React.DOM as D

  data VisualTab = DataSrcTab
                 | FieldsTab
                 | VisualTypeTab

  instance eqVisualTab :: Eq VisualTab where
    (==) DataSrcTab    DataSrcTab    = true
    (==) FieldsTab     FieldsTab     = true
    (==) VisualTypeTab VisualTypeTab = true
    (==) _             _             = false
    (/=) vt vt' = not (vt == vt')

  instance showVisualTab :: Show VisualTab where
    show DataSrcTab    = "Data Source"
    show FieldsTab     = "Fields"
    show VisualTypeTab = "Type"

  type VisualProps =
    { files :: FileType
    }
  type VisualState =
    { active :: VisualTab
    }

  visualEditor :: ComponentClass VisualProps VisualState
  visualEditor = createClass spec
    { displayName = "VisualEditor"
    , getInitialState = \_ -> pure {active: DataSrcTab}
    , render = \this -> pure $
      blockRow {styles: "block-content edit-visual"}
        [ visualTabs $ coerceThis this
        , visualEditorContent $ coerceThis this
        ]
    }

  visualTabs :: forall eff fields
             .  ReactThis fields VisualProps VisualState
             -> Component
  visualTabs this = D.dl {className: "tabs vertical"}
    (visualTab this <$> [DataSrcTab, FieldsTab, VisualTypeTab])

  visualTab :: forall eff fields
            .  ReactThis fields VisualProps VisualState
            -> VisualTab
            -> Component
  visualTab this tab =
    D.dd { className: "tab" ++ activate tab this.state.active
         , onClick: eventHandler this \this _ -> pure $
           this.setState this.state{active = tab}
         }
      [D.a {} [D.rawText $ show tab]]

  visualEditorContent :: forall eff fields
                      .  ReactThis fields VisualProps VisualState
                      -> Component
  visualEditorContent this = D.div {className: "tabs-content vertical"}
    [ D.ul {className: "content" ++ activate DataSrcTab this.state.active}
      []
    , D.ul {className: "content" ++ activate FieldsTab this.state.active}
      []
    , D.div {className: "content" ++ activate VisualTypeTab this.state.active}
      [ D.ul {className: "chart-type small-block-grid-5"}
        []
      , D.select {}
        []
      , D.div {className: "actions"}
        [ D.a {className: "tiny button"}
          [D.rawText "Create"]
        ]
      ]
    ]
