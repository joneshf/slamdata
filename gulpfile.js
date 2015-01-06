'use strict'

var gulp = require('gulp')
  , config = require('./gulptasks/config')
  , funcs = require('./gulptasks/functions')
  , paths = config.paths
  , options = config.options
  , connect = require('gulp-connect')
  , requireDir = require('require-dir')
  , taskListing = require('gulp-task-listing')
  ;

// Load tasks.
var dir = requireDir('gulptasks');

// Main tasks.
gulp.task('build', funcs.sequence( ['clean-build', 'src', 'style']
                                 , ['build-browser', 'build-node-webkit']
                                 ));
gulp.task('clean', ['clean-build', 'clean-compile', 'clean-dist', 'clean-sass']);
gulp.task('default', ['src', 'style']);
gulp.task('dist', funcs.sequence(['build', 'clean-dist'], 'dist-node-webkit', 'jre'));
gulp.task('src', ['browserify']);
gulp.task('style', funcs.sequence('clean-sass', 'sass'));
gulp.task('test', funcs.sequence( 'build'
                                , 'dist-node-webkit-platform'
                                , 'jre'
                                , 'test-casperjs'
                                , 'test-strongcheck'
                                , 'test-webdriver'
                                ));
gulp.task('watch', function() {
    connect.server(options.connect);
    gulp.watch(paths.src, ['watch-src']);
    gulp.watch(paths.style, ['style']);
});
gulp.task('help', taskListing);
