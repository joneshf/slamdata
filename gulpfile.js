var gulp = require('gulp')
  , clean = require('gulp-clean')
  , concat = require('gulp-concat')
  , purescript = require('gulp-purescript')
  , sass = require('gulp-sass');

paths = {
    src: [
        'src/**/*.purs',
        'bower_components/purescript-*/src/**/*.purs'
    ],
    dest: 'js',
    style: 'style/**/*.scss',
    css: 'css',
    build: {
        js: 'bin/js',
        css: 'bin/css',
        index: 'bin/index.html'
    },
    concat: [
        'bower_components/modernizr/modernizr.js',
        'bower_components/showdown/src/showdown.js',
        'bower_components/react/react-with-addons.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/fastclick/lib/fastclick.js',
        'bower_components/foundation/js/foundation.js',
        'js/slamdata.js'
    ]
}

options = {
    compile: {
        main: 'SlamData',
        output: 'slamdata.js'
    },
    build: {
        main: 'SlamData',
        output: 'slamdata.js'
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
        .pipe(psc)
        .pipe(gulp.dest(paths.dest));
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

gulp.task('sass-build', function() {
    var scss = sass();
    scss.on('error', function(e) {
        console.error(e.message);
        scss.end();
    });
    // There's something wonky going on with gulp-sass.
    // Removing the return allows things to operate more fluidly.
    gulp.src(paths.style)
        .pipe(scss)
        .pipe(gulp.dest(paths.build.css));
});

gulp.task('concat', function() {
    return gulp.src(paths.concat)
      .pipe(concat(options.build.output))
      .pipe(gulp.dest(paths.build.js));
});

gulp.task('default', ['compile', 'sass', 'watch']);
gulp.task('build', ['compile', 'sass-build', 'concat']);
