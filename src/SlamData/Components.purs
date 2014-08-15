module SlamData.Components where

  import React (eventHandler)
  import React.Types (Component(), ReactThis())

  import SlamData.Types (SlamDataEventTy(), SlamDataRequest())

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
  publishIcon     :: FontAwesome
  publishIcon     = icon "fa fa-book"
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
               -> SlamDataEventTy
               -> String
               -> Component
               -> Component
  actionButton this event title icon = D.li {}
    [D.a { className: "tiny secondary button has-tooltip"
         , onClick: eventHandler this \this -> pure $
            this.props.request event
         , title: title
         }
      [icon]
    ]
