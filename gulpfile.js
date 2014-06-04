var gulp = require('gulp')
  , clean = require('gulp-clean')
  , concat = require('gulp-concat')
  , purescript = require('gulp-purescript')
  , sass = require('gulp-sass')
  , es = require('event-stream')
  ;

paths = {
    src: [
        'src/**/*.purs',
        'bower_components/purescript-*/src/**/*.purs'
    ],
    dest: 'js',
    style: 'style/**/*.scss',
    css: 'css',
    build: {
        css: 'bin/css',
        fonts: 'bin/fonts',
        index: 'bin',
        js: 'bin/js'
    },
    concat: [
        'bower_components/modernizr/modernizr.js',
        'bower_components/showdown/src/showdown.js',
        'bower_components/react/react-with-addons.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/fastclick/lib/fastclick.js',
        'bower_components/foundation/js/foundation.js',
        'js/slamdata.js'
    ],
    fontawesome: {
        css: 'bower_components/fontawesome/css/font-awesome.css',
        fonts: 'bower_components/fontawesome/fonts/*'
    }
}

options = {
    compile: {
        main: 'SlamData',
        js: 'slamdata.js'
    },
    build: {
        main: 'SlamData',
        css: 'slamdata.css',
        index: 'index.html',
        js: 'slamdata.js'
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


gulp.task('concat-js', function() {
    return gulp.src(paths.concat)
      .pipe(concat(options.build.js))
      .pipe(gulp.dest(paths.build.js));
});

gulp.task('concat-css', function(){
    var fa = gulp.src(paths.fontawesome.css);
    var styles = gulp.src(paths.style)
        .pipe(sass());

    return es.concat(fa, styles)
        .pipe(concat(options.build.css))
        .pipe(gulp.dest(paths.build.css));
});

gulp.task('fonts', function() {
    return gulp.src(paths.fontawesome.fonts)
      .pipe(gulp.dest(paths.build.fonts));
});

gulp.task('build', ['compile', 'concat', 'fonts']);
gulp.task('concat', ['concat-js', 'concat-css']);
gulp.task('default', ['compile', 'sass', 'watch']);
