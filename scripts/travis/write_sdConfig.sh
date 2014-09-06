#!/bin/bash
set -ev
cat <<EOF > $HOME/.config/slamdata/slamdata-config.json
{
  "nodeWebkit": {
    "java": "java"
  },
  "server": {
    "location": "http://localhost",
    "port": 8080
  }
}
EOF
