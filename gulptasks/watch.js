'use strict'

var gulp = require('gulp')
  , funcs = require('./functions')
  ;

gulp.task('watch-src', funcs.sequence('src', 'test-strongcheck'));
