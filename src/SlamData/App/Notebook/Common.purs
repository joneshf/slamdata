module SlamData.App.Notebook.Block.Common where

  import Data.Either
  import Data.Foreign
  import Data.Maybe
  import Data.UUID

  import React

  import SlamData.Helpers

  import qualified React.DOM as D
  import qualified Browser.WebStorage as WS

  data BlockType = Markdown | SQL
  data BlockID = BlockID UUID
  data Editor = Edit | Eval
  data BlockSpec = BlockSpec BlockRecord
  type BlockRecord =
    { blockType :: BlockType
    , content :: Maybe String
    , ident :: BlockID
    }
  type BlockState = { edit :: Editor, content :: String }
  type BlockProps eff state result =
    { blockType :: BlockType
    , ident :: BlockID
    , close :: EventHandlerContext eff {} state result
    , content :: Maybe String
    }

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
      _          -> Left "WAT!"

  instance showBlockSpec :: Show BlockSpec where
    show (BlockSpec bs) = "{ blockType: " ++ show bs.blockType ++
                          ", content: " ++ show bs.content ++
                          ", ident: " ++ show bs.ident ++
                          "}"

  instance readBlockSpec :: ReadForeign BlockSpec where
    read = do
      ty <- prop "blockType"
      c <- prop "content"
      i <- prop "id"
      pure $ BlockSpec {blockType: ty, content: c, ident: BlockID i}

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

  localBlocks :: [BlockSpec]
  localBlocks =
    maybe []
          (parseJSON >>> either (const []) id)
          (WS.getItem WS.localStorage "blocks")
