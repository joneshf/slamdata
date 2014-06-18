module SlamData.App.Notebook.Block.Common where

  import Data.Either
  import Data.Foreign
  import Data.Maybe
  import Data.UUID

  import React

  import SlamData.Helpers

  import qualified React.DOM as D
  import qualified Browser.WebStorage as WS

  -- Notebook stuff
  data NotebookSpec = NotebookSpec NotebookRecord
  data NotebookID = NotebookID UUID
  type NotebookRecord = { name :: String
                        , blocks :: [BlockID]
                        , ident :: NotebookID
                        }

  -- Block stuff
  data BlockType = Markdown | SQL
  data BlockID = BlockID UUID
  data BlockSpec = BlockSpec BlockRecord
  data Editor = Edit | Eval
  type BlockRecord =
    { blockType :: BlockType
    , content :: Maybe String
    , ident :: BlockID
    }
  type BlockState = { edit :: Editor, content :: String }
  type BlockProps eff state result =
    { blockType :: BlockType
    , ident :: BlockID
    , index :: Number
    , close :: EventHandlerContext eff {} state result
    , content :: Maybe String
    }

  instance eqNotebookID :: Eq NotebookID where
    (==) (NotebookID i) (NotebookID i') =      i == i'
    (/=) b              b'              = not (b == b')

  instance eqBlockID :: Eq BlockID where
    (==) (BlockID i) (BlockID i') =      i == i'
    (/=) b           b'           = not (b == b')

  instance showBlockID :: Show BlockID where
    show (BlockID ident) = show ident

  instance eqEditor :: Eq Editor where
    (==) Edit Edit = true
    (==) Eval Eval = true
    (==) _    _    = false

    (/=) e    e'   = not (e == e')

  instance showBlockType :: Show BlockType where
    show Markdown = "Markdown"
    show SQL = "SQL"

  instance readBlockType :: ReadForeign BlockType where
    read = ForeignParser \str -> case parseForeign read str of
      Right "Markdown" -> Right Markdown
      Right "SQL"      -> Right SQL
      Left err-> Left err

  instance showBlockSpec :: Show BlockSpec where
    show (BlockSpec bs) = "{ \"blockType\": \"" ++ show bs.blockType ++ "\"" ++
                          ", \"content\": " ++ maybe "null" (\c -> "\"" ++ show c ++ "\"") bs.content ++
                          ", \"ident\": \"" ++ show bs.ident ++ "\"" ++
                          "}"

  instance readBlockSpec :: ReadForeign BlockSpec where
    read = do
      ty <- prop "blockType"
      c <- prop "content"
      i <- prop "ident"
      pure $ BlockSpec {blockType: ty, content: c, ident: BlockID i}

  instance readNotebookSpec :: ReadForeign NotebookSpec where
    read = do
      b <- prop "blocks"
      i <- prop "ident"
      n <- prop "name"
      pure $ NotebookSpec {ident: NotebookID i, blocks: BlockID <$> b, name: n}

  eval ::forall attrs.
    EventHandlerContext (f :: ReadRefsEff { editor :: Component attrs {value :: String} })
                        {}
                        BlockState
                        (ReactStateRW BlockState BlockState)
  eval = do
    refs <- getRefs
    state <- readState
    pure $ writeState state{edit = Eval, content = (getDOMNode refs.editor).value}

  edit ::forall attrs.
    EventHandlerContext (f :: ReadRefsEff { editor :: Component attrs {value :: String} }) -- Not sure why psc can't infer this with a type variable.
                        {}
                        BlockState
                        (ReactStateRW BlockState BlockState)
  edit = do
    state <- readState
    pure $ writeState state{edit = Edit, content = state.content}

  blockRow :: String -> [UI] -> [UI] -> UI
  blockRow styles firstCol secondCol =
    D.div [D.className $ styles ++ " row"]
          [ D.div [D.className "large-1  columns"] firstCol
          , D.div [D.className "large-11 columns right-side"] secondCol
          ]

  localBlocks :: [BlockSpec]
  localBlocks =
    maybe []
          (parseJSON >>> either (const []) id)
          (WS.getItem WS.localStorage "blocks")

  localNotebooks :: [NotebookSpec]
  localNotebooks =
    maybe []
          (parseJSON >>> either (const []) id)
          (WS.getItem WS.localStorage "notebooks")
