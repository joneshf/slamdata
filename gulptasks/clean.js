'use strict'

var gulp = require('gulp')
  , config = require('./config')
  , funcs = require('./functions')
  , paths = config.paths
  ;

gulp.task('clean-build', funcs.clean('bin'));
gulp.task('clean-compile', funcs.clean('js'));
gulp.task('clean-dist', funcs.clean('dist'));
gulp.task('clean-sass', funcs.clean(paths.css));
