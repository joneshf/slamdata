module SlamData.Types.Workspace.Notebook where

  import Data.Argonaut
    ( (?>>=)
    , (~>)
    , (:=)
    , decodeJson
    , encodeJson
    , jsonEmptyObject
    , toObject
    )
  import Data.Argonaut.Decode (DecodeJson)
  import Data.Argonaut.Encode (EncodeJson)

  import Node.UUID (UUID())

  import SlamData.Types.Workspace.Notebook.Block (Block())
  import SlamData.Types.Workspace.Notebook.Block (Block())

  import qualified Data.Map as M

  newtype NotebookID = NotebookID UUID
  newtype Notebook = Notebook NotebookRec
  type NotebookRec =
    { ident  :: NotebookID
    , blocks :: [Block]
    , name   :: String
    , path   :: String
    }

  instance eqNotebookID :: Eq NotebookID where
    (==) (NotebookID i) (NotebookID i') = i == i'
    (/=) i i' = not (i == i')

  instance eqNotebook :: Eq Notebook where
    (==) (Notebook nb) (Notebook nb') =
      nb.ident == nb'.ident && nb.blocks == nb'.blocks
    (/=) nb nb' = not (nb == nb')

  instance decodeNotebook :: DecodeJson Notebook where
    decodeJson json = toObject json ?>>= "Notebook" >>= \obj -> do
      ident  <- M.lookup "ident"  obj ?>>= "ident"  >>= decodeJson
      blocks <- M.lookup "blocks" obj ?>>= "blocks" >>= decodeJson
      name   <- M.lookup "name"   obj ?>>= "name"   >>= decodeJson
      path   <- M.lookup "path"   obj ?>>= "path"   >>= decodeJson
      pure $ Notebook {ident: ident, blocks: blocks, name: name, path: path}

  instance decodeNotebookID :: DecodeJson NotebookID where
    decodeJson json = NotebookID <$> decodeJson json

  instance encodeJsonNotebook :: EncodeJson Notebook where
    encodeJson (Notebook nb)
      =  "ident"  := encodeJson nb.ident
      ~> "blocks" := encodeJson nb.blocks
      ~> "name"   := encodeJson nb.name
      ~> "path"   := encodeJson nb.path
      ~> jsonEmptyObject

  instance encodeJsonNotebookID :: EncodeJson NotebookID where
    encodeJson (NotebookID ident) = encodeJson ident
