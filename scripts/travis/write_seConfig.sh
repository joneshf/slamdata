#!/bin/bash
set -ev
mkdir -p $HOME/.config/SlamData
cat <<EOF > $HOME/.config/SlamData/slamengine-config.json
{
  "mountings": {
    "/": {
      "mongodb": {
        "connectionUri": "mongodb://slamengine:slamengine@ds045089.mongolab.com:45089/slamengine-test-01",
        "database": "slamengine-test-01"
      }
    }
  },
  "server": {
    "port": 20223
  }
}
EOF
