'use strict'

var gulp = require('gulp')
  , config = require('./config')
  , paths = config.paths
  , connect = require('gulp-connect')
  , sass = require('gulp-sass')
  ;

gulp.task('sass', function() {
    return gulp.src(paths.style)
        .pipe(sass())
        .pipe(gulp.dest(paths.css))
        .pipe(connect.reload());
});
