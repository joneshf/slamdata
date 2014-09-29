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

  import qualified Data.Map as M

  newtype NotebookID = NotebookID UUID
  newtype Notebook = Notebook NotebookRec
  type NotebookRec =
    { ident     :: NotebookID
    , blocks    :: [Block]
    , name      :: String
    , path      :: String
    , published :: Boolean
    , numOut    :: Number
    , persisted :: Boolean
    , dirty     :: Boolean
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
      ident     <- M.lookup "ident"     obj ?>>= "ident"     >>= decodeJson
      blocks    <- M.lookup "blocks"    obj ?>>= "blocks"    >>= decodeJson
      name      <- M.lookup "name"      obj ?>>= "name"      >>= decodeJson
      path      <- M.lookup "path"      obj ?>>= "path"      >>= decodeJson
      published <- M.lookup "published" obj ?>>= "published" >>= decodeJson
      numOut    <- M.lookup "numOut"    obj ?>>= "numOut"    >>= decodeJson
      persisted <- M.lookup "persisted" obj ?>>= "persisted" >>= decodeJson
      dirty     <- M.lookup "dirty"     obj ?>>= "dirty"     >>= decodeJson
      pure $ Notebook { ident: ident
                      , blocks: blocks
                      , name: name
                      , path: path
                      , published: published
                      , numOut: numOut
                      , persisted: persisted
                      , dirty: dirty
                      }

  instance decodeNotebookID :: DecodeJson NotebookID where
    decodeJson json = NotebookID <$> decodeJson json

  instance encodeJsonNotebook :: EncodeJson Notebook where
    encodeJson (Notebook nb)
      =  "ident"     := encodeJson nb.ident
      ~> "blocks"    := encodeJson nb.blocks
      ~> "name"      := encodeJson nb.name
      ~> "path"      := encodeJson nb.path
      ~> "published" := encodeJson nb.published
      ~> "numOut"    := encodeJson nb.numOut
      ~> "persisted" := encodeJson nb.persisted
      ~> "dirty"     := encodeJson nb.dirty
      ~> jsonEmptyObject

  instance encodeJsonNotebookID :: EncodeJson NotebookID where
    encodeJson (NotebookID ident) = encodeJson ident
