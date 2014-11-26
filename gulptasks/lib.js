'use strict'

var gulp = require('gulp')
  , config = require('./config')
  , funcs = require('./functions')
  , paths = config.paths
  , rename = require('gulp-rename')
  ;

gulp.task('slamengine-jar', function() {
    return gulp.src(paths.slamengine.jar)
        .pipe(rename('slamengine.jar'))
        .pipe(gulp.dest(paths.build['node-webkit'].jar));
});

gulp.task('concat-css-browser', funcs.concatCss('browser'));
gulp.task('concat-js-browser', funcs.concatJs('browser'));
gulp.task('copy-browser', funcs.copy('browser'));
gulp.task('entypo-browser', funcs.entypo('browser'));
gulp.task('fonts-browser', funcs.fonts('browser'));
gulp.task('icomoon-browser', funcs.icomoon('browser'));
gulp.task('imgs-browser', funcs.imgs('browser'));

gulp.task('concat-css-node-webkit', funcs.concatCss('node-webkit'));
gulp.task('concat-js-node-webkit', funcs.concatJs('node-webkit'));
gulp.task('copy-node-webkit', funcs.copy('node-webkit'));
gulp.task('entypo-node-webkit', funcs.entypo('node-webkit'));
gulp.task('fonts-node-webkit', funcs.fonts('node-webkit'));
gulp.task('icomoon-node-webkit', funcs.icomoon('node-webkit'));
gulp.task('imgs-node-webkit', funcs.imgs('node-webkit'));

gulp.task('bower-browser', funcs.bowerLib('browser'));
gulp.task('bower-node-webkit', funcs.bowerLib('node-webkit'));

gulp.task('build-browser', funcs.sequence( 'bower-browser'
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
gulp.task('build-node-webkit', funcs.sequence( 'bower-node-webkit'
                                             , 'npm-node-webkit'
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

gulp.task('compile-browser', funcs.compileLib('browser'));
gulp.task('compile-node-webkit', funcs.compileLib('node-webkit'));

gulp.task('jre-linux-chmod', funcs.jreChmod('linux'));
gulp.task('jre-linux-copy', funcs.jre('linux'));
gulp.task('jre-osx-chmod', funcs.jreChmod('osx'));
gulp.task('jre-osx-copy', funcs.jre('osx'));
gulp.task('jre-win-chmod', funcs.jreChmod('win'));
gulp.task('jre-win-copy', funcs.jre('win'));

gulp.task('jre-linux', funcs.sequence('jre-linux-copy', 'jre-linux-chmod'));
gulp.task('jre-osx', funcs.sequence('jre-osx-copy', 'jre-osx-chmod'));
gulp.task('jre-win', funcs.sequence('jre-win-copy', 'jre-win-chmod'));
gulp.task('jre', ['jre-linux', 'jre-osx', 'jre-win']);

gulp.task('npm-node-webkit', funcs.npmLib('node-webkit'));
