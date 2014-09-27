module SlamData.Components where

  import Control.Lens ((^.), (..), (.~), to, LensP())
  import Control.Monad (when)

  import Data.Foldable (traverse_)
  import Data.Maybe (Maybe(..))

  import React (coerceThis, createClass, eventHandler, spec)
  import React.Types (Component(), ComponentClass(), ReactThis())

  import SlamData.Types (SlamDataEventTy(..), SlamDataRequest())
  import SlamData.Types.React.WorkSpace.Notebook
    ( NotebookProps()
    , NotebookState()
    )
  import SlamData.Types.Workspace.Notebook (Notebook(..), NotebookID())
  import SlamData.Types.Workspace.Notebook.Block (BlockType(..))
  import SlamData.Types.React.WorkSpace.Notebook.Settings
    ( SettingsProps()
    , SettingsState()
    )

  import qualified React.DOM as D

  type FontAwesome = Component
  type Entypo = Component

  icon :: String -> Component
  icon name = D.i {className: name} []

  closeIcon       :: FontAwesome
  closeIcon       = icon "fa fa-times"
  -- Notebook
  newIcon         :: FontAwesome
  newIcon         = icon "fa fa-file"
  openIcon        :: FontAwesome
  openIcon        = icon "fa fa-folder-open"
  saveIcon        :: FontAwesome
  saveIcon        = icon "fa fa-save"
  renameIcon      :: FontAwesome
  renameIcon      = icon "fa fa-language"
  publishIcon     :: FontAwesome
  publishIcon     = icon "fa fa-book"
  createBlockIcon :: FontAwesome
  createBlockIcon = icon "fa fa-plus-square-o"
  -- Blocks
  markdownIcon    :: FontAwesome
  markdownIcon    = icon "fa fa-file-text"
  sqlIcon         :: FontAwesome
  sqlIcon         = icon "fa fa-database"
  visualIcon      :: FontAwesome
  visualIcon      = icon "fa fa-bar-chart-o"
  -- FileSystem
  dirOpenIcon     :: FontAwesome
  dirOpenIcon     = icon "fa fa-folder-open-o"
  dirClosedIcon   :: FontAwesome
  dirClosedIcon   = icon "fa fa-folder-o"
  fileIcon        :: FontAwesome
  fileIcon        = icon "fa fa-file-o"
  newNotebookIcon :: FontAwesome
  newNotebookIcon = icon "fa fa-plus"
  loadingIcon     :: FontAwesome
  loadingIcon     = icon "fa fa-circle-o-notch fa-spin"
  -- Visuals
  areaChartIcon   :: Entypo
  areaChartIcon   = icon "icon-chart-area"
  barChartIcon    :: Entypo
  barChartIcon    = icon "icon-chart-bar"
  lineChartIcon   :: Entypo
  lineChartIcon   = icon "icon-chart-line"
  pieChartIcon    :: Entypo
  pieChartIcon    = icon "icon-chart-pie"

  actionButton :: forall eff fields props state
               .  ReactThis fields {request :: SlamDataRequest eff | props} state
               -> [SlamDataEventTy]
               -> String
               -> Component
               -> Component
  actionButton this events title icon = D.li {}
    [D.a { className: "tiny secondary button has-tooltip"
         , onClick: eventHandler this \this _ ->
            traverse_ this.props.request events
         , title: title
         }
      [icon]
    ]

  type CreateBlockProps eff =
    { request :: SlamDataRequest eff
    , ident   :: NotebookID
    , index   :: Number
    }
  type CreateBlockState =
    { dropdown :: Boolean
    }

  createBlockButton :: forall eff. ComponentClass (CreateBlockProps eff) CreateBlockState
  createBlockButton = createClass spec
    { displayName = "CreateBlockButton"
    , getInitialState = \_ -> pure {dropdown: false}
    , render = \this -> pure $
      D.a { className: "create-block-button"
          , onClick: eventHandler this \this _ -> do
            pure $ (coerceThis this).setState this.state{dropdown = not this.state.dropdown :: Boolean}
          }
        [D.div {} if this.state.dropdown then
            [ createBlockIcon
            , internalActions (coerceThis this) this.props.ident this.props.index
            ]
          else
            [createBlockIcon]
        ]
    }

  internalActions :: forall eff fields
                  .  ReactThis fields (CreateBlockProps eff) CreateBlockState
                  -> NotebookID
                  -> Number
                  -> Component
  internalActions this ident index = D.ul {className: "button-group"}
    (actions (actionButton this) ident index <$> (BlockType <$> ["Markdown", "SQL", "Visual"]))

  actions :: ([SlamDataEventTy] -> String -> Component -> Component)
          -> NotebookID
          -> Number
          -> BlockType
          -> Component
  actions f ident index ty =
    f [CreateBlock ident ty index] (show ty) (blockIcon ty)

  blockIcon :: BlockType -> Component
  blockIcon (BlockType "Markdown") = markdownIcon
  blockIcon (BlockType "SQL")      = sqlIcon
  blockIcon (BlockType "Visual")   = visualIcon

  -- TODO: These two things should be the same,
  --       but the notebook is forcing them to be different at the moment.
  --       Figure out how to generalize this.

  saveNotebookAction :: forall eff fields
                     .  ReactThis fields (NotebookProps eff) NotebookState
                     -> [SlamDataEventTy]
                     -> Notebook
                     -> Component
  saveNotebookAction this events nb@(Notebook nb') = D.li {}
    [D.a { className: "tiny secondary button has-tooltip"
         , disabled: not nb'.dirty
         , onClick: eventHandler this \this _ -> if not nb'.dirty
            then pure unit
            else if nb'.persisted
            then traverse_ this.props.request events
            else pure $ this.setState this.state{renaming = Just nb'.name, persisting = true}
         , title: "Save"
         }
      [saveIcon]
    ]

  saveSettingsAction :: forall eff fields
                     .  ReactThis fields (SettingsProps eff) SettingsState
                     -> [SlamDataEventTy]
                     -> LensP SettingsState Boolean
                     -> Component
  saveSettingsAction this events dirty = D.li {}
    [D.a { className: "tiny secondary button has-tooltip"
         , disabled: this.state^.dirty..to not
         , onClick: eventHandler this \this _ -> when (this.state^.dirty) do
            pure $ this.setState (this.state # dirty .~ false)
            traverse_ this.props.request events
         , title: "Save"
         }
      [saveIcon]
    ]
