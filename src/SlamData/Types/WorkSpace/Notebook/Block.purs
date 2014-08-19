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
  newtype Block = Block BlockRec
  type BlockRec =
    { ident       :: BlockID
    , blockMode   :: BlockMode
    , blockType   :: BlockType
    , editContent :: String
    , evalContent :: String
    , label       :: String
    }

  newtype BlockType = BlockType String
  newtype BlockMode = BlockMode String
  -- data BlockType = Markdown
  --                | SQL
  --                | Visual

  -- data BlockMode = Edit
  --                | Eval
  --                | Locked

  instance eqBlock :: Eq Block where
    (==) (Block b) (Block b') =
      b.ident == b'.ident &&
      b.blockType == b'.blockType &&
      b.blockMode == b'.blockMode &&
      b.editContent == b'.editContent &&
      b.evalContent == b'.evalContent
    (/=) b b' = not (b == b')

  instance eqBlockID :: Eq BlockID where
    (==) (BlockID i) (BlockID i') = i == i'
    (/=) i i' = not (i == i')

  instance eqBlockType :: Eq BlockType where
    (==) (BlockType bt) (BlockType bt') = bt == bt'
    (/=) bt bt' = not (bt == bt')

  instance showBlockType :: Show BlockType where
    show (BlockType bt) = bt

  instance eqBlockMode :: Eq BlockMode where
    (==) (BlockMode bm) (BlockMode bm') = bm == bm'
    (/=) bm bm' = not (bm == bm')

  instance showBlockMode :: Show BlockMode where
    show (BlockMode bm) = bm

  instance showBlockID :: Show BlockID where
    show (BlockID bID) = show bID

  -- instance eqBlockType :: Eq BlockType where
  --   (==) Markdown Markdown = true
  --   (==) SQL      SQL      = true
  --   (==) Visual   Visual   = true
  --   (==) bt       bt'      = false

  --   (/=) bt bt' = not (bt == bt')

  -- instance eqBlockMode :: Eq BlockMode where
  --   (==) Edit   Edit   = true
  --   (==) Eval   Eval   = true
  --   (==) Locked Locked = true
  --   (==) bm     bm'    = false

  --   (/=) bm bm' = not (bm == bm')

  instance showBlock :: Show Block where
    show block = show $ encodeJson block

  -- instance showBlockType :: Show BlockType where
  --   show Markdown = "Markdown"
  --   show SQL      = "SQL"
  --   show Visual   = "Visual"

  -- instance showBlockMode :: Show BlockMode where
  --   show Edit   = "Edit"
  --   show Eval   = "Eval"
  --   show Locked = "Locked"

  instance decodeJsonBlock :: DecodeJson Block where
    decodeJson json = toObject json ?>>= "Block" >>= \obj -> do
      ident       <- M.lookup "ident"       obj ?>>= "ident"       >>= decodeJson
      blockMode   <- M.lookup "blockMode"   obj ?>>= "blockMode"   >>= decodeJson
      blockType   <- M.lookup "blockType"   obj ?>>= "blockType"   >>= decodeJson
      editContent <- M.lookup "editContent" obj ?>>= "editContent" >>= decodeJson
      evalContent <- M.lookup "evalContent" obj ?>>= "evalContent" >>= decodeJson
      label       <- M.lookup "label"       obj ?>>= "label"       >>= decodeJson
      pure $ Block { ident: ident
                   , blockMode: blockMode
                   , blockType: blockType
                   , editContent: editContent
                   , evalContent: evalContent
                   , label: label
                   }

  instance decodeJsonBlockID :: DecodeJson BlockID where
    decodeJson json = BlockID <$> decodeJson json

  instance decodeJsonBlockType :: DecodeJson BlockType where
    decodeJson json = toString json ?>>= "BlockType" >>= \ty -> case ty of
      "Markdown" -> Right (BlockType "Markdown")
      "SQL"      -> Right (BlockType "SQL")
      "Visual"   -> Right (BlockType "Visual")
      _          -> Left "Couldn't decode BlockType"

  instance decodeJsonBlockMode :: DecodeJson BlockMode where
    decodeJson json = toString json ?>>= "BlockMode" >>= \ty -> case ty of
      "Edit"   -> Right (BlockMode "Edit")
      "Eval"   -> Right (BlockMode "Eval")
      "Locked" -> Right (BlockMode "Locked")
      _        -> Left "Couldn't decode BlockMode"

  instance encodeJsonBlock :: EncodeJson Block where
    encodeJson (Block b)
      =  "ident"       := encodeJson b.ident
      ~> "blockType"   := encodeJson b.blockType
      ~> "blockMode"   := encodeJson b.blockMode
      ~> "editContent" := encodeJson b.editContent
      ~> "evalContent" := encodeJson b.evalContent
      ~> "label"       := encodeJson b.label
      ~> jsonEmptyObject

  instance encodeJsonBlockID :: EncodeJson BlockID where
    encodeJson (BlockID ident) = encodeJson ident

  instance encodeJsonBlockType :: EncodeJson BlockType where
    encodeJson ty = encodeJson $ show ty

  instance encodeJsonBlockMode :: EncodeJson BlockMode where
    encodeJson ty = encodeJson $ show ty
