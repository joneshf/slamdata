'use strict'

var gulp = require('gulp')
  , config = require('./config')
  , funcs = require('./functions')
  , clean = require('./clean')
  , paths = config.paths
  , options = config.options
  , browserify = require('browserify')
  , connect = require('gulp-connect')
  , gutil = require('gulp-util')
  , purescript = require('gulp-purescript')
  , sourceStream = require('vinyl-source-stream')
  ;

gulp.task('browserify', ['compile', 'browserify-index'], function() {
    return browserify('./output/index.js', {ignoreMissing: true})
        .require('./output/node_modules/Control.Monad.ST', {expose: 'Control.Monad.ST'})
        .require('./output/node_modules/SlamData', {expose: 'SlamData'})
        .require('./output/node_modules/SlamData.App.Events', {expose: 'SlamData.App.Events'})
        .require('./output/node_modules/SlamData.Helpers', {expose: 'SlamData.Helpers'})
        .require('./output/node_modules/SlamData.Types', {expose: 'SlamData.Types'})
        .bundle()
        .pipe(sourceStream('slamdata.js'))
        .pipe(gulp.dest('js'))
        .pipe(connect.reload());
});

gulp.task('browserify-index', function() {
    return gulp.src('index.js')
        .pipe(gulp.dest('output'));
});

gulp.task('compile', ['clean-compile'], function() {
    return gulp.src(paths.src)
        .pipe(purescript.pscMake(options.compile))
});
