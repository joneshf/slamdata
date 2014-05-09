module SlamData.Login where

  import Control.Monad.Eff

  import qualified Data.Array as A
  import Data.String

  import React
  import React.DOM

  loginForm = mkUI spec {getInitialState = pure { newAccount: false }} do
    state <- readState
    pure $ form {}
      [ fieldset {}
          [ legend {} [ text "Login to Labcoat" ]
          , row [ large6 $ newOrExisting { newAccount: state.newAccount
                                         , onChangeNew: handle changeNew
                                         }
                , large6 demo
                ]
          , information { newAccount: state.newAccount }
          , row [ large6 $ div {} []
                , large6 $ createOrLogin { newAccount: state.newAccount }
                ]
          ]
      ]

  newOrExisting = mkUI spec do
    props <- getProps
    pure $ div {}
      [ p {} [ input { attrType: "radio"
                       -- I have no idea why this doesn't typecheck as
                       -- not props.newAccount
                     , checked: if props.newAccount then false else true
                     , id: "existing-account"
                     , onChange: handle newAccountChanged
                     , name: "new-or-existing"
                     , ref: "existing"
                     }
                     []
             , label { htmlFor: "existing-account" }
                     [ text "I have an existing account." ]
             ]
      , p {} [ input { attrType: "radio"
                     , checked: props.newAccount
                     , id: "new-account"
                     , onChange: handle newAccountChanged
                     , name: "new-or-existing"
                     , ref: "new"
                     }
                     []
             , label { htmlFor: "new-account" }
                     [ text "I need to create a new account." ]
             ]
      ]
    where
      newAccountChanged = do
        refs <- getRefs
        props <- getProps
        let newAccount' = (getDOMNode refs.new).checked
        pure $ props.onChangeNew { newAccount: newAccount'}

  demo =
    button { className: "right secondary" }
      [ text "Try Demo!" ]

  information = mkUI spec do
    props <- getProps
    let info = if props.newAccount then [alwaysInfo, newInfo] else [alwaysInfo]
    pure $ div {} info

  alwaysInfo =
    div {}
      [ row $ large6 <$> [ validationText { label: "Email" }
                         , validationText { label: "Password" }
                         ]
      ]

  newInfo =
    div {}
      [ row $ large6 <$> [ validationText { label: "Name" }
                         , validationText { label: "Confirm Password" }
                         , validationText { label: "Company" }
                         , validationText { label: "Title" }
                         ]
      ]

  validationText = mkUI spec do
    props <- getProps
    pure $ div {}
      [ label { htmlFor: toLower props.label }
              [ text props.label ]
      , input { attrType: "text"
              , id: toLower props.label
              }
              []
      ]

  createOrLogin = mkUI spec do
    props <- getProps
    let buttonText = if props.newAccount then "Create Account" else "Login"
    pure $ div {}
      [ div {} []
      , button { className: "right" }
               [ text buttonText ]
      ]

  row uis = div { className: "row" } uis
  large6 ui = div { className: "large-6 columns" } [ ui ]

  -- We have to cheat for now with the type,
  -- otherwise we don't get the correct context in jsland.
  foreign import changeNew
    "function changeNew(state) {\
    \  React.writeState(state);\
    \}" :: forall a eff. Eff eff a

  -- This should be in `React`
  foreign import getDOMNode
    "function getDOMNode(x) {\
    \  return x.getDOMNode();\
    \}" :: forall a b. a -> b
