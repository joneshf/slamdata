'use strict'

var gulp = require('gulp')
  , bower = require('gulp-bower')
  , browserify = require('browserify')
  , concat = require('gulp-concat')
  , connect = require('gulp-connect')
  , es = require('event-stream')
  , fs = require('fs')
  , gutil = require('gulp-util')
  , nwBuilder = require('node-webkit-builder')
  , path = require('path')
  , purescript = require('gulp-purescript')
  , rename = require('gulp-rename')
  , rimraf = require('rimraf')
  , runSequence = require('run-sequence')
  , sass = require('gulp-sass')
  , sourceStream = require('vinyl-source-stream')
  , spawn = require('child_process').spawn
  , taskListing = require('gulp-task-listing')
  ;

// Configuration.
var paths = {
    src: [ 'src/**/*.purs'
         , 'bower_components/purescript-*/src/**/*.purs'
         , 'bower_components/purescript-*/src/**/*.purs.hs'
         ],
    dest: 'js',
    style: 'style/**/*.scss',
    css: 'css',
    imgs: 'imgs/*',
    build: {
        browser: {
            css: 'bin/browser/css',
            dest: 'bin/browser',
            fonts: 'bin/browser/fonts',
            icomoon: 'bin/browser/css/fonts',
            imgs: 'bin/browser/imgs',
            index: 'bin/browser',
            js: 'bin/browser/js'
        },
        'node-webkit': {
            css: 'bin/node-webkit/css',
            dest: 'bin/node-webkit',
            fonts: 'bin/node-webkit/fonts',
            icomoon: 'bin/node-webkit/css/fonts',
            imgs: 'bin/node-webkit/imgs',
            index: 'bin/node-webkit',
            jar: 'bin/node-webkit/jar',
            js: 'bin/node-webkit/js'
        }
    },
    concat: {
        css: [ 'bower_components/c3/c3.css'
             , 'bower_components/nv.d3.min.css'
             , 'bower_components/entypo/font/entypo.css'
             , 'bower_components/fontawesome/css/font-awesome.css'
             , 'bower_components/icomoon/style.css'
             , 'bower_components/react-treeview/react-treeview.css'
             ],
        entypo: [ 'bower_components/entypo/font/entypo.eot'
                , 'bower_components/entypo/font/entypo.svg'
                , 'bower_components/entypo/font/entypo.ttf'
                , 'bower_components/entypo/font/entypo.woff'
                ],
        fonts: ['bower_components/fontawesome/fonts/*'],
        icomoon: [ 'bower_components/icomoon/fonts/icomoon.eot'
                 , 'bower_components/icomoon/fonts/icomoon.svg'
                 , 'bower_components/icomoon/fonts/icomoon.ttf'
                 , 'bower_components/icomoon/fonts/icomoon.woff'
                 ],
        js: [ 'bower_components/jquery/dist/jquery.js'
            , 'bower_components/c3/c3.js'
            , 'bower_components/d3/d3.js'
            , 'bower_components/nv.d3.min.js'
            , 'bower_components/foundation/js/foundation.js'
            , 'bower_components/node-uuid/uuid.js'
            , 'bower_components/oboe/dist/oboe-browser.js'
            , 'bower_components/react/react-with-addons.js'
            , 'bower_components/reactable/build/reactable.js'
            , 'bower_components/react-treeview/react-treeview.js'
            , 'bower_components/showdown/src/showdown.js'
            , 'bower_components/tiny-emitter/dist/tinyemitter.js'
            , 'js/slamdata.js'
            ]
    },
    copy : {
        browser: [ 'lib/browser/index.html'
                 , 'lib/browser/js/**/*'
                 ],
        'node-webkit': [ 'lib/node-webkit/css/**/*'
                       , 'lib/node-webkit/index.html'
                       , 'lib/node-webkit/js/**/*'
                       , 'lib/node-webkit/package.json'
                       ]
    },
    lib: {
        browser: {
            js: 'lib/browser/js',
            src: [ 'lib/browser/src/**/*.purs'
                 , 'bower_components/purescript-*/src/**/*.purs'
                 , 'src/**/*.purs'
                 ]
        },
        'node-webkit': {
            jre: { linux: { src: 'bower_components/jre-linux-x64/java-linux-x64/**/*'
                          , dest: 'dist/SlamData/linux64/jre'
                          , java: 'dist/SlamData/linux64/jre/bin/java'
                          }
                 , osx: { src: 'bower_components/jre-osx/java-osx/**/*'
                        , dest: 'dist/SlamData/osx/SlamData.app/Contents/Resources/jre'
                        , java: 'dist/SlamData/osx/SlamData.app/Contents/Resources/jre/bin/java'
                        }
                 , win: { src: 'bower_components/jre-windows-x64/java-windows/**/*'
                        , dest: 'dist/SlamData/win/jre'
                        , java: 'dist/SlamData/win/jre/bin/java.exe'
                        }
                 },
            js: 'lib/node-webkit/js',
            src: [ 'lib/node-webkit/src/**/*.purs'
                 , 'lib/node-webkit/bower_components/purescript-*/src/**/*.purs'
                 , 'src/**/*.purs'
                 ]
        }
    },
    slamengine: {
        config: process.platform === 'linux' ? path.join(process.env.HOME, '.config', 'SlamData', 'slamengine-config.json') :
                process.platform === 'darwin' ? path.join(process.env.HOME, 'Library', 'Application Support', 'SlamData', 'slamengine-config.json') :
                path.join(process.env.LOCALAPPDATA, 'SlamData', 'slamengine-config.json'),
        jar: 'bower_components/slamengine-jar/index.jar'
    }
}

var options = {
    build: {
        css: 'slamdata.css',
        js: 'slamdata.js',
    },
    compile: {
        output: 'output/node_modules'
    },
    connect: {
        port: 8251,
        livereload: true
    },
    copy: {
        browser: {
            base: 'lib/browser'
        },
        'node-webkit': {
            base: 'lib/node-webkit'
        }
    },
    lib: {
        browser: {
            main: 'SlamData.Browser',
            output: 'slamdata-browser.js'
        },
        'node-webkit': {
            main: 'SlamData.NodeWebKit',
            output: 'slamdata-node-webkit.js'
        }
    }
}

// Functions.
function bowerLib(target) {
    return function() {
        var lib = path.join('lib', target)
        return bower({cwd: lib});
    }
};

function clean(path) {
    return function(done) {
        rimraf(path, done);
    }
};

function compileLib(target) {
    return function() {
        return gulp.src(paths.lib[target].src)
            .pipe(purescript.psc(options.lib[target]))
            .pipe(gulp.dest(paths.lib[target].js));
    }
};

function concatJs(target) {
    return function() {
        return gulp.src(paths.concat.js)
            .pipe(concat(options.build.js))
            .pipe(gulp.dest(paths.build[target].js));
    }
};

function concatCss(target) {
    return function() {
        var fa = gulp.src(paths.concat.css);
        var styles = gulp.src(paths.style)
            .pipe(sass());

        return es.concat(fa, styles)
            .pipe(concat(options.build.css))
            .pipe(gulp.dest(paths.build[target].css));
    }
};

function copy(target) {
    return function() {
        return gulp.src(paths.copy[target], options.copy[target])
            .pipe(gulp.dest(paths.build[target].dest));
    }
}

function fonts(target) {
    return function() {
        return gulp.src(paths.concat.fonts)
            .pipe(gulp.dest(paths.build[target].fonts));
    }
};

function entypo(target) {
    return function() {
        return gulp.src(paths.concat.entypo)
            .pipe(gulp.dest(paths.build[target].css));
    }
};

function icomoon(target) {
    return function() {
        return gulp.src(paths.concat.icomoon)
            .pipe(gulp.dest(paths.build[target].icomoon));
    }
};

function imgs(target) {
    return function() {
        return gulp.src(paths.imgs)
            .pipe(gulp.dest(paths.build[target].imgs));
    }
};

function jre (platform) {
    return function() {
        return gulp.src(paths.lib['node-webkit'].jre[platform].src)
            .pipe(gulp.dest(paths.lib['node-webkit'].jre[platform].dest));
    }
}

function jreChmod (platform) {
    return function(cb) {
        fs.chmod(paths.lib['node-webkit'].jre[platform].java, '755', cb);
    }
}

function sequence () {
    var args = [].slice.call(arguments);
    return function(done) {
        runSequence.apply(null, args.concat(done));
    }
}

// Workhorse tasks.
gulp.task('bower-browser', bowerLib('browser'));
gulp.task('bower-node-webkit', bowerLib('node-webkit'));

gulp.task('browserify', ['compile', 'browserify-index'], function() {
    return browserify('./output/index.js', {ignoreMissing: true})
        .require('./output/node_modules/Control.Alternative', {expose: 'Control.Alternative'})
        .require('./output/node_modules/Control.Monad.Identity', {expose: 'Control.Monad.Identity'})
        .require('./output/node_modules/Data.Argonaut', {expose: 'Data.Argonaut'})
        .require('./output/node_modules/Data.Argonaut.Core', {expose: 'Data.Argonaut.Core'})
        .require('./output/node_modules/Data.Argonaut.Printer', {expose: 'Data.Argonaut.Printer'})
        .require('./output/node_modules/Data.Either', {expose: 'Data.Either'})
        .require('./output/node_modules/Data.Map', {expose: 'Data.Map'})
        .require('./output/node_modules/Graphics.C3', {expose: 'Graphics.C3'})
        .require('./output/node_modules/Prelude', {expose: 'Prelude'})
        .require('./output/node_modules/SlamData', {expose: 'SlamData'})
        .require('./output/node_modules/SlamData.App.Events', {expose: 'SlamData.App.Events'})
        .require('./output/node_modules/SlamData.Helpers', {expose: 'SlamData.Helpers'})
        .require('./output/node_modules/SlamData.Types', {expose: 'SlamData.Types'})
        .require('./output/node_modules/SlamData.Types.JS', {expose: 'SlamData.Types.JS'})
        .require('./output/node_modules/SlamData.Types.Workspace.Notebook.Block', {expose: 'SlamData.Types.Workspace.Notebook.Block'})
        .require('./output/node_modules/Text.Parsing.Parser', {expose: 'Text.Parsing.Parser'})
        .require('./output/node_modules/Text.Parsing.Parser.Combinators', {expose: 'Text.Parsing.Parser.Combinators'})
        .require('./output/node_modules/Text.Parsing.Parser.String', {expose: 'Text.Parsing.Parser.String'})
        .bundle()
        .pipe(sourceStream('slamdata.js'))
        .pipe(gulp.dest('js'))
        .pipe(connect.reload());
});

gulp.task('browserify-index', function() {
    return gulp.src('index.js')
        .pipe(gulp.dest('output'));
});

gulp.task('clean-build', clean('bin'));
gulp.task('clean-compile', clean('js'));
gulp.task('clean-dist', clean('dist'));
gulp.task('clean-sass', clean(paths.css));

gulp.task('compile', ['clean-compile'], function() {
    // We need this hack for now until gulp does something about
    // https://github.com/gulpjs/gulp/issues/71
    var pscMake = purescript.pscMake(options.compile);
    pscMake.on('error', function(e) {
        gutil.log(e.message);
        pscMake.end();
    });
    return gulp.src(paths.src)
        .pipe(pscMake)
        .pipe(gulp.dest(paths.dest));
});

gulp.task('compile-browser', compileLib('browser'));
gulp.task('compile-node-webkit', compileLib('node-webkit'));

gulp.task('connect', function() {
    return connect.server(options.connect);
});

gulp.task('jre-linux-chmod', jreChmod('linux'));
gulp.task('jre-linux-copy', jre('linux'));
gulp.task('jre-osx-chmod', jreChmod('osx'));
gulp.task('jre-osx-copy', jre('osx'));
gulp.task('jre-win-chmod', jreChmod('win'));
gulp.task('jre-win-copy', jre('win'));

gulp.task('jre-linux', sequence('jre-linux-copy', 'jre-linux-chmod'));
gulp.task('jre-osx', sequence('jre-osx-copy', 'jre-osx-chmod'));
gulp.task('jre-win', sequence('jre-win-copy', 'jre-win-chmod'));
gulp.task('jre', ['jre-linux', 'jre-osx', 'jre-win']);

gulp.task('sass', ['clean-sass'], function() {
    return gulp.src(paths.style)
        .pipe(sass())
        .pipe(gulp.dest(paths.css))
        .pipe(connect.reload());
});

gulp.task('slamengine-jar', function() {
    return gulp.src(paths.slamengine.jar)
        .pipe(rename('slamengine.jar'))
        .pipe(gulp.dest(paths.build['node-webkit'].jar));
});

gulp.task('concat-css-browser', concatCss('browser'));
gulp.task('concat-js-browser', concatJs('browser'));
gulp.task('copy-browser', copy('browser'));
gulp.task('entypo-browser', entypo('browser'));
gulp.task('fonts-browser', fonts('browser'));
gulp.task('icomoon-browser', icomoon('browser'));
gulp.task('imgs-browser', imgs('browser'));

gulp.task('concat-css-node-webkit', concatCss('node-webkit'));
gulp.task('concat-js-node-webkit', concatJs('node-webkit'));
gulp.task('copy-node-webkit', copy('node-webkit'));
gulp.task('entypo-node-webkit', entypo('node-webkit'));
gulp.task('fonts-node-webkit', fonts('node-webkit'));
gulp.task('icomoon-node-webkit', icomoon('node-webkit'));
gulp.task('imgs-node-webkit', imgs('node-webkit'));

gulp.task('build-browser', sequence( 'bower-browser'
                                   , 'compile-browser'
                                   , [ 'concat-css-browser'
                                     , 'concat-js-browser'
                                     , 'copy-browser'
                                     , 'entypo-browser'
                                     , 'fonts-browser'
                                     , 'icomoon-browser'
                                     , 'imgs-browser'
                                     ]
                                   ));
gulp.task('build-node-webkit', sequence( 'bower-node-webkit'
                                       , 'compile-node-webkit'
                                       , [ 'concat-css-node-webkit'
                                         , 'concat-js-node-webkit'
                                         , 'copy-node-webkit'
                                         , 'entypo-node-webkit'
                                         , 'fonts-node-webkit'
                                         , 'icomoon-node-webkit'
                                         , 'imgs-node-webkit'
                                         , 'slamengine-jar'
                                         ]
                                       ));

gulp.task('dist-node-webkit', function() {
    var nw = new nwBuilder({
        buildDir: 'dist',
        files: 'bin/node-webkit/**',
        macIcns: 'imgs/slamdata.icns',
        platforms: ['linux64', 'osx', 'win'],
        winIco: 'imgs/slamdata.ico'
    });
    return nw.on('log', gutil.log).build();
});

gulp.task('dist-node-webkit-platform', function() {
    var opts = {
        buildDir: 'dist',
        files: 'bin/node-webkit/**',
    };
    if (process.platform === 'linux') {
        opts.platforms = ['linux64'];
    } else if (process.platform === 'darwin') {
        opts.platforms = ['osx'];
        opts.macIcns = 'imgs/slamdata.icns';
    } else {
        opts.platforms = ['win']
        opts.winIco = 'imgs/slamdata.ico';
    }
    var nw = new nwBuilder(opts);
    return nw.on('log', gutil.log).build();
});

gulp.task('test-casperjs', function(done) {
    var running = false;
    var platform = process.platform === 'linux' ? 'linux' :
                   process.platform === 'darwin' ? 'osx' :
                   'win'
    var se = spawn( paths.lib['node-webkit'].jre[platform].java
                  , [ '-jar', paths.slamengine.jar
                    , paths.slamengine.config
                    ]
                  );
    process.env.PATH += path.delimiter + path.join(process.env.PWD, 'node_modules', '.bin');

    var phantomjs = process.env.PWD + '/node_modules/.bin/phantomjs';

    process.env.PHANTOMJS_EXECUTABLE = phantomjs;

    gutil.log('Path to phantomjs: ' + phantomjs);
    gutil.log('process.env.PATH = ' + process.env.PATH);

    se.stdout.on('data', function(data) {
        if (!running) {
            running = true;
            spawn( './node_modules/.bin/casperjs'
                 , ['test', 'test/casperjs']
                 , {
                      stdio: 'inherit',
                      env: process.env
                    }
                 ).on('close', function(code, sig) {
                      se.kill();
                      done(code);
                  });
        }
    });
    se.stderr.on('data', function(err) {
        throw new Error(err);
    });
    return se;
});

gulp.task('test-webdriver', function(done) {
    spawn( './node_modules/.bin/mocha'
         , [ '-G'
           , '--recursive'
           , '--timeout', '60000'
           , 'test/webdriver/**/*.js']
         , {stdio: 'inherit'}
         ).on('close', done);
});

// Main tasks.
gulp.task('build', sequence( ['clean-build', 'browserify', 'sass']
                           , ['build-browser', 'build-node-webkit']
                           ));
gulp.task('default', sequence(['browserify', 'sass']));
gulp.task('dist', sequence(['build', 'clean-dist'], 'dist-node-webkit', 'jre'));
gulp.task('test', sequence('build', 'dist-node-webkit-platform', 'jre', 'test-casperjs', 'test-webdriver'));
gulp.task('watch', ['connect'], function() {
    gulp.watch(paths.src, ['browserify']);
    gulp.watch(paths.style, ['sass']);
});
gulp.task('help', taskListing);
