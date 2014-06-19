module SlamData.App.Notebook.Types where

  import Data.Foreign
  import Data.Maybe
  import Data.UUID

  import React

  import SlamData.App.Notebook.Block.Types
  import SlamData.Helpers

  data NotebookSpec = NotebookSpec NotebookRecord
  data NotebookID = NotebookID UUID

  type NotebookRecord = { name :: String
                        , blocks :: [BlockID]
                        , ident :: NotebookID
                        }
  type NotebookState = {notebooks :: [NotebookSpec], active :: Maybe NotebookID}
  type NotebookEvent eff =
    EventHandlerContext eff
                        {}
                        NotebookState
                        (ReactStateRW NotebookState NotebookState)

  instance eqNotebookID :: Eq NotebookID where
    (==) (NotebookID i) (NotebookID i') =      i == i'
    (/=) b              b'              = not (b == b')

  instance showNotebookID :: Show NotebookID where
    show (NotebookID ident) = show ident

  instance showNotebookSpec :: Show NotebookSpec where
    show (NotebookSpec ns) =
      "{ \"blocks\": " ++ show (show <$> ns.blocks) ++
      ", \"ident\": \"" ++ show ns.ident ++ "\"" ++
      ", \"name\": \"" ++ ns.name ++ "\"" ++
      "}"

  instance readNotebookSpec :: ReadForeign NotebookSpec where
    read = do
      b <- prop "blocks"
      i <- prop "ident"
      n <- prop "name"
      pure $ NotebookSpec {ident: NotebookID i, blocks: BlockID <$> b, name: n}
