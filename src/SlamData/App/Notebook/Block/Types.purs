module SlamData.App.Notebook.Block.Types where

  import Data.Either
  import Data.Foreign
  import Data.Maybe
  import Data.UUID

  import React

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
    show SQL      = "SQL"

  instance readBlockType :: ReadForeign BlockType where
    read = ForeignParser \str -> case parseForeign read str of
      Right "Markdown" -> Right Markdown
      Right "SQL"      -> Right SQL
      Left err         -> Left err

  instance showBlockSpec :: Show BlockSpec where
    show (BlockSpec bs) =
      "{ \"blockType\": \"" ++ show bs.blockType ++ "\"" ++
      ", \"content\": " ++ maybe "null" (\c -> "\"" ++ show c ++ "\"") bs.content ++
      ", \"ident\": \"" ++ show bs.ident ++ "\"" ++
      "}"

  instance readBlockSpec :: ReadForeign BlockSpec where
    read = do
      b <- prop "blockType"
      c <- prop "content"
      i <- prop "ident"
      pure $ BlockSpec {blockType: b, content: c, ident: BlockID i}
