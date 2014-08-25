#!/bin/bash
set -ev
if [ -n "$TRAVIS_TAG" ]; then
    sudo add-apt-repository ppa:ubuntu-wine/ppa -y
    sudo apt-get update
    sudo apt-get install wine1.7
    Xvfb :1 &
    gulp dist
    cd dist/SlamData
    tar zcvf linux64.tar.gz linux64
    zip -r osx.zip osx
    zip -r win.zip win
    cd ../../
fi
