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
