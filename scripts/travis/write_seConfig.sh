#!/bin/bash
set -ev
cat <<EOF > $HOME/.config/slamdata/slamengine-config.json
{
  "mountings": {
    "/": {
      "mongodb": {
        "connectionUri": "mongodb://localhost:27017",
        "database": "test"
      }
    }
  },
  "server": {
    "port": 8080
  }
}
EOF
