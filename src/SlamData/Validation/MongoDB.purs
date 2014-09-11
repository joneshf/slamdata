module SlamData.Validation.MongoDB where

  import Control.Alternative (many)

  import Data.String (joinWith)

  import SlamData.Validation.Common
    ( (<?>)
    , ampersand
    , atSign
    , colon
    , comma
    , digit
    , equal
    , question
    , solidus
    , someTill
    , until
    )

  import Text.Parsing.Parser
    ( fail
    , Parser()
    , ParseError(..)
    )
  import Text.Parsing.Parser.Combinators (choice, endBy, option, sepBy1, try)
  import Text.Parsing.Parser.String (char, string, whiteSpace)

  mongoUriParser :: Parser String String
  mongoUriParser = do
    proto    <- string "mongodb://" <?> "mongodb:// protocol is required"
    userPass <- option "" $ try mongoUserPass
    host     <- mongoHostPort <?> "host is required"
    hosts    <- option "" $ try mongoHostsPorts
    rest     <- option "" $ try mongoUriRest
    pure $ joinWith "" [proto, userPass, host, hosts, rest]

  mongoUserPass :: Parser String String
  mongoUserPass = do
    user <- char `until` colon
    pass <- char `until` atSign
    pure $ joinWith "" $ user ++ pass

  mongoHostsPorts :: Parser String String
  mongoHostsPorts = joinWith "" <$> (many $ (++) <$> comma <*> mongoHostPort)

  mongoHostPort :: Parser String String
  mongoHostPort = do
    host <- mongoHost
    port <- option "" $ try mongoPort
    pure $ host ++ port

  mongoHost :: Parser String String
  mongoHost = joinWith "" <$> someTill char (choice $ try <$> [colon, comma, solidus, whiteSpace])

  mongoPort :: Parser String String
  mongoPort = joinWith "" <$> ((:) <$> colon <*> someTill char (choice $ try <$> [comma, solidus, whiteSpace]))

  mongoDatabase :: Parser String String
  mongoDatabase = joinWith "" <$> someTill char (try question)

  mongoConnectionOptions :: Parser String String
  mongoConnectionOptions = do
    question
    opts <- joinWith "" <$> mongoConnectionOption `sepBy1` ampersand
    pure $ "?" ++ opts

  mongoConnectionOption :: Parser String String
  mongoConnectionOption = do
    name  <- mongoConnectionOptionName
    equal
    value <- mongoConnectionOptionValue
    pure $ name ++ "=" ++ value

  mongoConnectionOptionName :: Parser String String
  mongoConnectionOptionName = joinWith "" <$> someTill char (try equal)

  mongoConnectionOptionValue :: Parser String String
  mongoConnectionOptionValue = joinWith "" <$> someTill char (try ampersand)

  mongoUriRest :: Parser String String
  mongoUriRest = do
    solidus
    db   <- option "" $ try mongoDatabase
    opts <- option "" $ try mongoConnectionOptions
    pure $ "/" ++ db ++ opts

