module SlamData.Login where

  import qualified Data.Array as A
  import Data.String

  import React
  import React.DOM

  loginForm = mkUI spec {getInitialState = pure initialState} do
    state <- readState
    pure $ form {
                }
                [ fieldset {} [ legend {} [ text "Login to Labcoat" ]
                              , row [ small6 newOrExisting
                                    , small6 demo
                                    ]
                              , information
                              , row [ small6 $ div {} []
                                    , small6 $ createOrLogin { newAccount: state.newAccount }
                                    ]
                              ]
                ]

  initialState = { newAccount: true }

  newOrExisting =
    div {} [ p {} [ input { attrType: "radio"
                          , id: "existing-account"
                          , name: "new-or-existing"
                          }
                          []
                  , label { htmlFor: "existing-account" }
                          [ text "I have an existing account." ]
                  ]
           , p {} [ input { attrType: "radio"
                          , id: "new-account"
                          , name: "new-or-existing"
                          }
                          []
                  , label { htmlFor: "new-account" }
                          [ text "I need to create a new account." ]
                  ]
           ]

  demo =
    button { className: "right secondary" } [ text "Try Demo!" ]

  information =
    div {} [ alwaysInfo
           , newInfo
           ]

  alwaysInfo =
    div {} [ row $ small6 <$> [ validationText { label: "Email" }
                              , validationText { label: "Password" }
                              ]
           ]

  newInfo =
    div {} [ row $ small6 <$> [ validationText { label: "Name" }
                              , validationText { label: "Confirm Password" }
                              , validationText { label: "Company" }
                              , validationText { label: "Title" }
                              ]
           ]

  validationText = mkUI spec do
    props <- getProps
    pure $ div {} [ label { htmlFor: toLower props.label }
                          [ text props.label ]
                  , input { attrType: "text"
                          , id: toLower props.label
                          }
                          []
                  , div {} []
                  ]

  createOrLogin = mkUI spec do
    props <- getProps
    let buttonText = if props.newAccount then "Create Account" else "Login"
    pure $ div {} [ div {} []
                  , button { className: "right" }
                           [ text buttonText ]
                  ]

  row uis = div { className: "row" } uis
  small6 ui = div { className: "small-6 columns" } [ ui ]
