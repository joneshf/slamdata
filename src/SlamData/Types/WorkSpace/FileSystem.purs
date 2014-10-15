module SlamData.Types.Workspace.FileSystem where

  import Data.Argonaut ((?>>=), decodeJson, toArray, toObject, toString)
  import Data.Argonaut.Decode (DecodeJson)

  import qualified Data.StrMap as M

  newtype FileType = FileType FileTypeRec
  type FileTypeRec =
    { name     :: String
    , "type"   :: String
    , children :: [FileType]
    }
  type FileSystemProps = {files :: [FileType]}

  newtype FileTypes = FileTypes FileTypesRec
  type FileTypesRec = {children :: [FileType]}

  instance eqFileType :: Eq FileType where
    (==) (FileType ft) (FileType ft') =
      ft.name == ft'.name &&
      ft."type" == ft'."type" &&
      ft.children == ft'.children
    (/=) ft ft' = not (ft == ft')

  instance ordFileType :: Ord FileType where
    compare (FileType ft) (FileType ft') =
      if ft."type" == ft'."type" then
        compare ft.name ft'.name
      else if ft."type" == "directory" then LT
      else GT

  instance decodeFileType :: DecodeJson FileType where
    decodeJson json = toObject json ?>>= "FileType" >>= \obj -> do
      name     <- M.lookup "name"     obj ?>>= "name"     >>= decodeJson
      ty       <- M.lookup "type"     obj ?>>= "type"     >>= decodeJson
      children <- M.lookup "children" obj ?>>= "children" >>= decodeJson
      pure $ FileType {name: name, "type": ty, children: children}

  instance decodeFileTypes :: DecodeJson FileTypes where
    decodeJson json = toObject json ?>>= "FileTypes" >>= \obj -> do
      children <- M.lookup "children" obj ?>>= "children" >>= decodeJson
      pure $ FileTypes {children: children}
