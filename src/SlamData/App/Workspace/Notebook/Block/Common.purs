-- module SlamData.App.Workspace.Notebook.Block.Common where

--   import React

--   import SlamData.App.Notebook.Block.Types
--   import SlamData.Helpers

--   import qualified React.DOM as D

--   blockRow :: String -> [UI] -> [UI] -> UI
--   blockRow styles firstCol secondCol =
--     D.div [D.className $ styles ++ " row"]
--           [ D.div [D.className "large-1  columns"] firstCol
--           , D.div [D.className "large-11 columns right-side"] secondCol
--           ]

--   eval :: forall attrs.
--     EventHandlerContext (f :: ReadRefsEff { editor :: Component attrs {value :: String} })
--                         {}
--                         BlockState
--                         (ReactStateRW BlockState BlockState)
--   eval = do
--     refs <- getRefs
--     state <- readState
--     pure $ writeState state{edit = Eval, content = (getDOMNode refs.editor).value}

--   edit :: forall attrs.
--     EventHandlerContext (f :: ReadRefsEff { editor :: Component attrs {value :: String} }) -- Not sure why psc can't infer this with a type variable.
--                         {}
--                         BlockState
--                         (ReactStateRW BlockState BlockState)
--   edit = do
--     state <- readState
--     pure $ writeState state{edit = Edit, content = state.content}
