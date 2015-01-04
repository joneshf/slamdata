'use strict'

var path = require('path');

var paths =
    { src:
        [ 'src/**/*.purs'
        , 'bower_components/purescript-*/src/**/*.purs'
        , 'bower_components/purescript-*/src/**/*.purs.hs'
        ]
    , test:
        { src: 'test/strongcheck/**/*.purs'
        , index: 'test/strongcheck/test.js'
        }
    , dest: 'js'
    , style: 'style/**/*.scss'
    , css: 'css'
    , imgs: 'imgs/*'
    , build:
        { browser:
            { css: 'bin/browser/css'
            , dest: 'bin/browser'
            , fonts: 'bin/browser/fonts'
            , icomoon: 'bin/browser/css/fonts'
            , imgs: 'bin/browser/imgs'
            , index: 'bin/browser'
            , js: 'bin/browser/js'
            }
        , 'node-webkit':
            { css: 'bin/node-webkit/css'
            , dest: 'bin/node-webkit'
            , fonts: 'bin/node-webkit/fonts'
            , icomoon: 'bin/node-webkit/css/fonts'
            , imgs: 'bin/node-webkit/imgs'
            , index: 'bin/node-webkit'
            , jar: 'bin/node-webkit/jar'
            , js: 'bin/node-webkit/js'
            }
        }
    , concat:
        { css:
            [ 'bower_components/c3/c3.css'
            , 'bower_components/nv.d3.min.css'
            , 'bower_components/entypo/font/entypo.css'
            , 'bower_components/fontawesome/css/font-awesome.css'
            , 'bower_components/icomoon/style.css'
            , 'bower_components/react-treeview/react-treeview.css'
            ]
        , entypo:
            [ 'bower_components/entypo/font/entypo.eot'
            , 'bower_components/entypo/font/entypo.svg'
            , 'bower_components/entypo/font/entypo.ttf'
            , 'bower_components/entypo/font/entypo.woff'
            ]
        , fonts:
            [ 'bower_components/fontawesome/fonts/*'
            ]
        , icomoon:
            [ 'bower_components/icomoon/fonts/icomoon.eot'
            , 'bower_components/icomoon/fonts/icomoon.svg'
            , 'bower_components/icomoon/fonts/icomoon.ttf'
            , 'bower_components/icomoon/fonts/icomoon.woff'
            ]
        , js:
            [ 'bower_components/jquery/dist/jquery.js'
            , 'bower_components/c3/c3.js'
            , 'bower_components/d3/d3.js'
            , 'bower_components/foundation/js/foundation.js'
            , 'bower_components/node-uuid/uuid.js'
            , 'bower_components/moment/moment.js'
            , 'bower_components/nv.d3.min.js'
            , 'bower_components/oboe/dist/oboe-browser.js'
            // N.B. This must be before the other react stuff
            , 'bower_components/react/react-with-addons.js'
            , 'bower_components/react-treeview/react-treeview.js'
            , 'bower_components/reactable/build/reactable.js'
            , 'bower_components/showdown/src/showdown.js'
            , 'bower_components/tiny-emitter/dist/tinyemitter.js'
            , 'js/slamdata.js'
            ]
        }
    , copy:
        { browser:
            [ 'lib/browser/index.html'
            , 'lib/browser/js/**/*'
            ]
        , 'node-webkit':
            [ 'lib/node-webkit/css/**/*'
            , 'lib/node-webkit/index.html'
            , 'lib/node-webkit/js/**/*'
            , 'lib/node-webkit/node_modules/**/*'
            , 'lib/node-webkit/package.json'
            ]
        }
    , lib:
        { browser:
            { js: 'lib/browser/js'
            , src:
                [ 'lib/browser/src/**/*.purs'
                , 'bower_components/purescript-*/src/**/*.purs'
                , 'src/**/*.purs'
                ]
            }
        , 'node-webkit':
            { jre:
                { linux:
                    { src: 'bower_components/jre-linux-x64/java-linux-x64/**/*'
                    , dest: 'dist/SlamData/linux64/jre'
                    , java: 'dist/SlamData/linux64/jre/bin/java'
                    }
                , osx:
                    { src: 'bower_components/jre-osx/java-osx/**/*'
                    , dest: 'dist/SlamData/osx/SlamData.app/Contents/Resources/jre'
                    , java: 'dist/SlamData/osx/SlamData.app/Contents/Resources/jre/bin/java'
                    }
                , win:
                    { src: 'bower_components/jre-windows-x64/java-windows/**/*'
                    , dest: 'dist/SlamData/win/jre'
                    , java: 'dist/SlamData/win/jre/bin/java.exe'
                    }
                }
            , js: 'lib/node-webkit/js'
            , src:
                [ 'lib/node-webkit/src/**/*.purs'
                , 'lib/node-webkit/bower_components/purescript-*/src/**/*.purs'
                , 'src/**/*.purs'
                ]
            }
        }
    , slamengine:
        { config: process.platform === 'linux' ? path.join(process.env.HOME, '.config', 'SlamData', 'slamengine-config.json') :
                  process.platform === 'darwin' ? path.join(process.env.HOME, 'Library', 'Application Support', 'SlamData', 'slamengine-config.json') :
                  path.join(process.env.LOCALAPPDATA, 'SlamData', 'slamengine-config.json')
        , jar: 'bower_components/slamengine-jar/index.jar'
        }
    };

var options =
    { build:
        { css: 'slamdata.css'
        , js: 'slamdata.js'
        }
    , compile:
        { output: 'output/node_modules'
        }
    , connect:
        { livereload: true
        , port: 8251
        }
    , copy:
        { browser:
            { base: 'lib/browser'
            }
        , 'node-webkit':
            { base: 'lib/node-webkit'
            }
        }
    , lib:
        { browser:
            { main: 'SlamData.Browser'
            , output: 'slamdata-browser.js'
            }
        , 'node-webkit':
            { main: 'SlamData.NodeWebKit'
            , output: 'slamdata-node-webkit.js'
            }
        }
    , test:
        { output: 'output/node_modules'
        }
    }

module.exports =
    { paths: paths
    , options: options
    }
