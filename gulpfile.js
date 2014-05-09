var gulp = require('gulp')
  , purescript = require('gulp-purescript');

paths = {
    src: [
        'src/**/*.purs',
        'bower_components/purescript-*/src/**/*.purs'
    ]
}

options = {
    compile: {
        main: 'SlamData',
        output: 'js/slamdata.js'
    }
}

gulp.task('compile', function() {
    // We need this hack for now until gulp does something about
    // https://github.com/gulpjs/gulp/issues/71
    var psc = purescript.psc(options.compile);
    psc.on('error', function(e) {
        console.error(e.message);
        psc.end();
    });
    return gulp.src(paths.src)
        .pipe(psc);
});

gulp.task('watch', function() {
    gulp.watch(paths.src, ['compile']);
});

gulp.task('default', ['compile', 'watch']);
