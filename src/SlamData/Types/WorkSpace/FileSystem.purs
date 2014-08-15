module SlamData.Types.Workspace.FileSystem where

  import Data.Argonaut
  import Data.Argonaut.Decode (DecodeJson)
  import Data.Either (Either(..))
  import Data.Traversable (traverse)
  import Data.Maybe (maybe)

  import qualified Data.Map as M

  newtype FileType = FileType FileTypeRec
  type FileTypeRec = {name :: String, "type" :: String}
  type FileSystemProps = {files :: [FileType]}

  newtype FileTypes = FileTypes FileTypesRec
  type FileTypesRec = {children :: [FileType]}

  instance eqFileType :: Eq FileType where
    (==) (FileType ft) (FileType ft') =
      ft.name == ft'.name && ft."type" == ft'."type"
    (/=) ft ft' = not (ft == ft')

  instance decodeFileType :: DecodeJson FileType where
    decodeJson json = maybe (Left "Not a file type") Right $ do
      obj <- toObject json
      name <- M.lookup "name" obj >>= toString
      ty <- M.lookup "type" obj >>= toString
      pure $ FileType {name: name, "type": ty}

  instance decodeFileTypes :: DecodeJson FileTypes where
    decodeJson json = maybe (Left "No FileTypes") Right $ do
      obj <- toObject json
      children <- M.lookup "children" obj >>= toArray >>= traverse decodeMaybe
      pure $ FileTypes {children: children}
