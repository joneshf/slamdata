-- module SlamData.App.Workspace.Notebook.Block.Types where

--   import Data.Either
--   import Data.Foreign
--   import Data.Maybe
--   import Data.String (drop, length, take)
--   import Data.UUID

--   import React

--   data BlockType = Markdown | SQL | Visual
--   data BlockID = BlockID UUID
--   data BlockSpec = BlockSpec BlockRecord
--   data Editor = Edit | Eval

--   type BlockRecord =
--     { blockType :: BlockType
--     , content :: Maybe String
--     , ident :: BlockID
--     }
--   type BlockState = { edit :: Editor, content :: String }
--   type BlockProps eff state result extra =
--     { blockType :: BlockType
--     , ident :: BlockID
--     , index :: Number
--     , close :: EventHandlerContext eff {} state result
--     , content :: Maybe String
--     , serverURI :: String
--     , serverFS :: String
--     | extra
--     }

--   instance eqBlockID :: Eq BlockID where
--     (==) (BlockID i) (BlockID i') =      i == i'
--     (/=) b           b'           = not (b == b')

--   instance showBlockID :: Show BlockID where
--     show (BlockID ident) = show ident

--   instance eqEditor :: Eq Editor where
--     (==) Edit Edit = true
--     (==) Eval Eval = true
--     (==) _    _    = false

--     (/=) e    e'   = not (e == e')

--   instance showBlockType :: Show BlockType where
--     show Markdown = "Markdown"
--     show SQL      = "SQL"
--     show Visual   = "Visual"

--   instance readBlockType :: ReadForeign BlockType where
--     read = ForeignParser \str -> case parseForeign read str of
--       Right "Markdown" -> Right Markdown
--       Right "SQL"      -> Right SQL
--       Right "Visual"   -> Right Visual
--       Left err         -> Left err

--   instance showBlockSpec :: Show BlockSpec where
--     show (BlockSpec bs) =
--       "{ \"blockType\": \"" ++ show bs.blockType ++ "\"" ++
--       ", \"content\": " ++ maybe "null" handleString bs.content ++
--       ", \"ident\": \"" ++ show bs.ident ++ "\"" ++
--       "}"

--   instance readBlockSpec :: ReadForeign BlockSpec where
--     read = do
--       b <- prop "blockType"
--       c <- prop "content"
--       i <- prop "ident"
--       pure $ BlockSpec {blockType: b, content: c, ident: BlockID i}

--   handleString "" = "\"\""
--   handleString s  = show s

--   data LoadingStatus = Loading
--                      | Successful String
--                      | Error String
--   data EvalSQLSpec = EvalSQLSpec EvalSQLRecord

--   type EvalSQLState =
--     { status :: LoadingStatus
--     , content :: String
--     , location :: Maybe String
--     }
--   type EvalSQLRecord =
--     { ident :: BlockID
--     , status :: LoadingStatus
--     , content :: String
--     , location :: Maybe String
--     }

--   instance eqLoadingStatus :: Eq LoadingStatus where
--     (==) Loading        Loading         = true
--     (==) (Successful s) (Successful s') = s == s'
--     (==) (Error e)      (Error e')      = e == e'
--     (/=) ls ls' = not (ls == ls')

--   instance readLoadingStatus :: ReadForeign LoadingStatus where
--     read = ForeignParser \str -> case parseForeign read str of
--       Right "Loading" -> Right Loading
--       Right s | s `startsWith` "Successful " ->
--         Right $ Successful $ drop (length "Successful ") s
--       Right s | s `startsWith` "Error " ->
--         Right $ Successful $ drop (length "Error ") s
--       Left err        -> Left err

--   instance showLoadingStatus :: Show LoadingStatus where
--     show Loading        = "Loading"
--     show (Successful s) = "Successful " ++ s
--     show (Error e)      = "Error " ++ e

--   instance eqEvalSQLSpec :: Eq EvalSQLSpec where
--     (==) (EvalSQLSpec ess) (EvalSQLSpec ess') =
--       ess.ident == ess'.ident &&
--       ess.status == ess'.status &&
--       ess.content == ess'.content &&
--       ess.location == ess'.location
--     (/=) ess ess' = not (ess == ess')

--   instance showEvalSQLSpec :: Show EvalSQLSpec where
--     show (EvalSQLSpec ess) =
--       "{ \"ident\": \"" ++ show ess.ident ++ "\"" ++
--       ", \"content\": \"" ++ ess.content ++ "\"" ++
--       ", \"location\": " ++ maybe "null" handleString ess.location ++
--       ", \"status\": \"" ++ show ess.status ++ "\"" ++
--       "}"

--   instance readEvalSQLSpec :: ReadForeign EvalSQLSpec where
--     read = do
--       c <- prop "content"
--       i <- prop "ident"
--       s <- prop "status"
--       l <- prop "location"
--       pure $ EvalSQLSpec {content: c, ident: BlockID i, status: s, location: l}

--   startsWith :: String -> String -> Boolean
--   startsWith s s' = take (length s') s == s'
