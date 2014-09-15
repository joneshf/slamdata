module SlamData.Validation.Common where

  import Control.Alt ((<|>))

  import Data.Array (snoc)

  import Global (readInt)

  import Text.Parsing.Parser (fail, Parser(), ParserT(..))
  import Text.Parsing.Parser.String (satisfy, string)

  required :: forall a. String -> Parser String a
  required r = fail $ r ++ " is required"

  -- Parsing primitives.

  -- Override this from `Text.Parsing.Parser.Combinators`.
  -- We don't want `Expected ` prefixed to the message
  (<?>) :: forall m s a. (Monad m) => ParserT s m a -> String -> ParserT s m a
  (<?>) p msg = p <|> fail msg

  ampersand :: Parser String String
  ampersand = string "&"
  atSign :: Parser String String
  atSign = string "@"
  colon :: Parser String String
  colon = string ":"
  comma :: Parser String String
  comma = string ","
  equal :: Parser String String
  equal = string "="
  question :: Parser String String
  question = string "?"
  solidus :: Parser String String
  solidus = string "/"

  digit :: Parser String String
  digit = satisfy (\n -> 0 <= readInt 10 n && readInt 10 n <= 9)

  lookAhead :: forall s a m. (Monad m) => ParserT s m a -> ParserT s m a
  lookAhead (ParserT p) = ParserT \s -> do
    state <- p s
    pure state{input = s, consumed = false}

  someTill :: forall s a m e. (Monad m) => ParserT s m a -> ParserT s m e -> ParserT s m [a]
  someTill p end = do
    x <- p
    xs <- manyTill p end
    pure $ x:xs

  manyTill :: forall s a m e. (Monad m) => ParserT s m a -> ParserT s m e -> ParserT s m [a]
  manyTill p end = scan
    where
      scan = (do
                end
                pure [])
         <|> (do
                x <- p
                xs <- scan
                pure (x:xs))

  until :: forall s a m. (Monad m) => ParserT s m a -> ParserT s m a -> ParserT s m [a]
  until p end = do
    ps <- manyTill p $ lookAhead end
    p' <- end
    pure $ ps `snoc` p'
