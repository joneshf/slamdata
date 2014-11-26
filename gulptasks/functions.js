'use strict'

var gulp = require('gulp')
  , config = require('./config')
  , paths = config.paths
  , options = config.options
  , bower = require('gulp-bower')
  , concat = require('gulp-concat')
  , es = require('event-stream')
  , fs = require('fs')
  , install = require('gulp-install')
  , path = require('path')
  , purescript = require('gulp-purescript')
  , rimraf = require('rimraf')
  , runSequence = require('run-sequence')
  , sass = require('gulp-sass')
  ;

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

function concatJs(target) {
    return function() {
        return gulp.src(paths.concat.js)
            .pipe(concat(options.build.js))
            .pipe(gulp.dest(paths.build[target].js));
    }
};

function copy(target) {
    return function() {
        return gulp.src(paths.copy[target], options.copy[target])
            .pipe(gulp.dest(paths.build[target].dest));
    }
}

function entypo(target) {
    return function() {
        return gulp.src(paths.concat.entypo)
            .pipe(gulp.dest(paths.build[target].css));
    }
};

function fonts(target) {
    return function() {
        return gulp.src(paths.concat.fonts)
            .pipe(gulp.dest(paths.build[target].fonts));
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

function jre(platform) {
    return function() {
        return gulp.src(paths.lib['node-webkit'].jre[platform].src)
            .pipe(gulp.dest(paths.lib['node-webkit'].jre[platform].dest));
    }
}

function jreChmod(platform) {
    return function(cb) {
        fs.chmod(paths.lib['node-webkit'].jre[platform].java, '755', cb);
    }
}

function npmLib(target) {
    return function() {
        var lib = path.join('lib', target, 'package.json')
        return gulp.src(lib)
            .pipe(install());
    }
};

function sequence() {
    var args = [].slice.call(arguments);
    return function(done) {
        runSequence.apply(null, args.concat(done));
    }
}

module.exports =
    { bowerLib: bowerLib
    , clean: clean
    , compileLib: compileLib
    , concatCss: concatCss
    , concatJs: concatJs
    , copy: copy
    , entypo: entypo
    , fonts: fonts
    , icomoon: icomoon
    , imgs: imgs
    , jre: jre
    , jreChmod: jreChmod
    , npmLib: npmLib
    , sequence: sequence
    }
