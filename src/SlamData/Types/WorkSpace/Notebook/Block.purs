module SlamData.Types.Workspace.Notebook.Block where

  import Control.Lens ((^.))
  import Control.Bind ((>=>))

  import Data.Argonaut
    ( (~>)
    , (:=)
    , (?>>=)
    , decodeJson
    , encodeJson
    , jsonEmptyObject
    , objectFieldL
    , toObject
    , toString
    )
  import Data.Argonaut.Decode (DecodeJson)
  import Data.Argonaut.Encode (EncodeJson)
  import Data.Either (Either(..))

  import Node.UUID (parse, runUUID, unparse, v4, UUID())

  import qualified Data.Map as M

  newtype BlockID = BlockID UUID
  newtype Block = Block
    { ident     :: BlockID
    , blockType :: BlockType
    , content   :: String
    }

  data BlockType = Markdown
                 | SQL
                 | Visual

  instance showBlock :: Show Block where
    show block = show $ encodeJson block

  instance showBlockType :: Show BlockType where
    show Markdown = "Markdown"
    show SQL      = "SQL"
    show Visual   = "Visual"

  instance decodeJsonBlock :: DecodeJson Block where
    decodeJson json = toObject json ?>>= "Block" >>= \obj -> do
      ident     <- M.lookup "ident"     obj ?>>= "ident"     >>= decodeJson
      blockType <- M.lookup "blockType" obj ?>>= "blockType" >>= decodeJson
      content   <- M.lookup "content"   obj ?>>= "content"   >>= decodeJson
      pure $ Block {ident: ident, blockType: blockType, content: content}

  instance decodeJsonBlockID :: DecodeJson BlockID where
    decodeJson json = BlockID <$> decodeJson json

  instance decodeJsonBlockType :: DecodeJson BlockType where
    decodeJson json = toString json ?>>= "BlockType" >>= \ty -> case ty of
      "Markdown" -> Right Markdown
      "SQL"      -> Right SQL
      "Visual"   -> Right Visual
      _          -> Left "Couldn't decode BlockType"

  instance encodeJsonBlock :: EncodeJson Block where
    encodeJson (Block b)
      =  "ident"     := encodeJson b.ident
      ~> "blockType" := encodeJson b.blockType
      ~> "content"   := encodeJson b.content
      ~> jsonEmptyObject

  instance encodeJsonBlockID :: EncodeJson BlockID where
    encodeJson (BlockID ident) = encodeJson ident

  instance encodeJsonBlockType :: EncodeJson BlockType where
    encodeJson ty = encodeJson $ show ty
