module SlamData.Validation where

  import Control.Alternative (many, some)

  import Data.Either (Either(..))
  import Data.String (joinWith)
  import Data.Validation (invalid)

  import Global (isNaN, readInt)

  import SlamData.Types (ValidationVal())
  import SlamData.Validation.Common
    ( (<?>)
    , digit
    , required
    , solidus
    , until
    )
  import SlamData.Validation.MongoDB (mongoUriParser)

  import Text.Parsing.Parser
    ( fail
    , runParser
    , Parser()
    , ParseError(..)
    )
  import Text.Parsing.Parser.String (char, eof, whiteSpace)

  -- Validators

  validateParsed :: forall a. Either ParseError a -> ValidationVal
  validateParsed (Left (ParseError e)) = invalid e.message
  validateParsed _                     = pure unit

  validatePort :: String -> ValidationVal
  validatePort p = validateParsed $ runParser p portParser

  validateMountPath :: String -> ValidationVal
  validateMountPath p = validateParsed $ runParser p mountPathParser

  validateMongoUri :: String -> ValidationVal
  validateMongoUri p = validateParsed $ runParser p mongoUriParser

  defaultPort :: Either ParseError Number -> Number
  defaultPort (Right port) = port
  defaultPort _            = 0

  -- Parsers

  portParser :: Parser String Number
  portParser = do
    whiteSpace
    port <- joinWith "" >>> readInt 10 <$> many digit
    whiteSpace
    eof <?> msg
    if low < port && port < high
      then pure port
      else if isNaN port then required "Port"
      else fail msg
    where
      low = 0
      high = 65536
      msg = "Port must be a number between " ++ show low ++ " and " ++ show high

  mountPathParser :: Parser String String
  mountPathParser = do
    whiteSpace
    path <- joinWith "" <$> some pathChunk
    whiteSpace
    eof <?> msg
    pure $ path
    where
      msg = "Path must end with \"/\""

  pathChunk :: Parser String String
  pathChunk = joinWith "" <$> (char <?> msg) `until` solidus
    where
      msg = "Path must end with \"/\""
