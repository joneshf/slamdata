module SlamData.Login (loginForm) where

  import Control.Monad.Eff

  import Data.String

  import React

  import SlamData.Helpers

  import qualified Data.Array as A
  import qualified React.DOM as D

  -- | Something to tell us if we've got a new user or an existing user.
  data NewOrExisting = New | Existing

  instance eqNewOrExisting :: Eq NewOrExisting where
    (==) New      New      = true
    (==) Existing Existing = true
    (==) _        _        = false

    (/=) noe      noe'     = not (noe == noe')

  instance showNewOrExisting :: Show NewOrExisting where
    show New      = "NewAccount"
    show Existing = "ExistingAccount"

  loginForm :: {} -> UI
  loginForm = mkUI spec {getInitialState = pure { newAccount: Existing }} do
    state <- readState
    pure $ D.form []
      [ D.fieldset []
          [ D.legend [] [ D.text "Login to SlamData" ]
          , row [ large "6" $ newOrExisting { newAccount: state.newAccount
                                            , onChangeNew: handle changeNew
                                            }
                , large "6" demo
                ]
          , information { newAccount: state.newAccount }
          , row [ large "6" $ D.div [] []
                , large "6" $ createOrLogin { newAccount: state.newAccount }
                ]
          ]
      ]

  newOrExisting :: forall e. { newAccount :: NewOrExisting , onChangeNew :: e } -> UI
  newOrExisting = mkUI spec do
    props <- getProps
    let radioWithLabel {labelText = l, value = v} =
        D.p [] [ D.input [ D.typeProp "radio"
                     , D.checked $ props.newAccount == v
                     , D.idProp $ show v
                     , D.name "new-or-existing"
                     , D.onChange $ newAccountChanged v
                     ]
                     []
             , D.label [ D.htmlFor $ show v ]
                     [ D.text l ]
             ]
    pure $ D.div []
      [ radioWithLabel { labelText: "I have an existing account."
                       , value: Existing
                       }
      , radioWithLabel { labelText: "I need to create a new account."
                       , value: New
                       }
      ]
    where
      newAccountChanged val _ = do
        props <- getProps
        pure $ props.onChangeNew { newAccount: val }

  demo :: UI
  demo =
    D.button [ D.className "right secondary" ]
      [ D.text "Try Demo!" ]

  information :: { newAccount :: NewOrExisting } -> UI
  information = mkUI spec do
    props <- getProps
    let info = if isNew props.newAccount then [alwaysInfo, newInfo] else [alwaysInfo]
    pure $ D.div [] info

  alwaysInfo :: UI
  alwaysInfo =
    D.div []
      [ row $ large "6" <$> [ validationText { label: "Email" }
                            , validationText { label: "Password" }
                            ]
      ]

  newInfo :: UI
  newInfo =
    D.div []
      [ row $ large "6" <$> [ validationText { label: "Name" }
                            , validationText { label: "Confirm Password" }
                            , validationText { label: "Company" }
                            , validationText { label: "Title" }
                            ]
      ]

  validationText :: { label :: String } -> UI
  validationText = mkUI spec do
    props <- getProps
    pure $ D.div []
      [ D.label [ D.htmlFor $ toLower props.label ]
              [ D.text props.label ]
      , D.input [ D.typeProp "text"
              , D.idProp $ toLower props.label
              ]
              []
      ]

  createOrLogin :: { newAccount :: NewOrExisting } -> UI
  createOrLogin = mkUI spec do
    props <- getProps
    let buttonText = if isNew props.newAccount then "Create Account" else "Login"
    pure $ D.div []
      [ D.div [] []
      , D.button [ D.className "right" ]
               [ D.text buttonText ]
      ]

  -- | Helper functions.

  isNew :: NewOrExisting -> Boolean
  isNew New = true
  isNew _   = false

  -- We have to cheat for now with the type,
  -- otherwise we don't get the correct context in jsland.
  -- This is something that needs to be fixed in purescript-react
  foreign import changeNew
    "function changeNew(state) {\
    \  React.writeState(state);\
    \}" :: forall a e eff. e -> Eff eff a
