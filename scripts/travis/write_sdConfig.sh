#!/bin/bash
set -ev
mkdir -p $HOME/.config/SlamData
cat <<EOF > $HOME/.config/SlamData/slamdata-config.json
{
  "nodeWebkit": {
    "java": "java"
  },
  "server": {
    "location": "http://localhost",
    "port": 20223
  }
}
EOF
