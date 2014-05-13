var gulp = require('gulp')
  , clean = require('gulp-clean')
  , purescript = require('gulp-purescript')
  , sass = require('gulp-sass');

paths = {
    src: [
        'src/**/*.purs',
        'bower_components/purescript-*/src/**/*.purs'
    ],
    style: 'style/**/*.scss',
    css: 'css'
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

gulp.task('clean-sass', function() {
    return gulp.src(paths.css)
      .pipe(clean());
});

gulp.task('sass', ['clean-sass'], function() {
    var scss = sass();
    scss.on('error', function(e) {
        console.error(e.message);
        scss.end();
    });
    // There's something wonky going on with gulp-sass.
    // Removing the return allows things to operate more fluidly.
    gulp.src(paths.style)
        .pipe(scss)
        .pipe(gulp.dest(paths.css));
});

gulp.task('watch', function() {
    gulp.watch(paths.src, ['compile']);
    gulp.watch(paths.style, ['sass']);
});

gulp.task('default', ['compile', 'sass', 'watch']);
