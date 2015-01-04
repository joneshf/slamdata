'use strict'
var gulp = require('gulp')
  , config = require('./config')
  , paths = config.paths
  , options = config.options

  , gutil = require('gulp-util')
  , path = require('path')
  , purescript = require('gulp-purescript')
  , run = require('gulp-run')
  , spawn = require('child_process').spawn
  ;

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

gulp.task('test-strongcheck-compile', function() {
    return gulp.src(paths.src.concat(paths.test.src))
        .pipe(purescript.pscMake(options.test));
});

gulp.task('test-strongcheck', ['test-strongcheck-compile'], function() {
    process.env.NODE_PATH = path.resolve(options.compile.output);
    return gulp.src(paths.test.index)
        .pipe(run('node'));
});
