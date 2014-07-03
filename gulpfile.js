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
        'bower_components/purescript-*/src/**/*.purs',
        'bower_components/purescript-*/src/**/*.purs.hs'
    ],
    dest: 'js',
    style: 'style/**/*.scss',
    css: 'css',
    imgs: 'imgs/*',
    build: {
        css: 'bin/css',
        fonts: 'bin/fonts',
        index: 'bin',
        imgs: 'bin/imgs',
        js: 'bin/js'
    },
    concat: {
        js: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/c3/c3.js',
            'bower_components/d3/d3.js',
            'bower_components/fastclick/lib/fastclick.js',
            'bower_components/foundation/js/foundation.js',
            'bower_components/modernizr/modernizr.js',
            'bower_components/node-uuid/uuid.js',
            'bower_components/oboe/dist/oboe-browser.js',
            'bower_components/react/react-with-addons.js',
            'bower_components/showdown/src/showdown.js',
            'js/slamdata.js'
        ],
        css: [
            'bower_components/c3/c3.css',
            'bower_components/entypo/font/entypo.css',
            'bower_components/fontawesome/css/font-awesome.css'
        ],
        fonts: [
            'bower_components/fontawesome/fonts/*'
        ],
        entypo: [
            'bower_components/entypo/font/entypo.eot',
            'bower_components/entypo/font/entypo.svg',
            'bower_components/entypo/font/entypo.ttf',
            'bower_components/entypo/font/entypo.woff'
        ]
    }
}

options = {
    compile: {
        main: 'SlamData',
        output: 'slamdata.js'
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
    return gulp.src(paths.concat.js)
      .pipe(concat(options.build.js))
      .pipe(gulp.dest(paths.build.js));
});

gulp.task('concat-css', function(){
    var fa = gulp.src(paths.concat.css);
    var styles = gulp.src(paths.style)
        .pipe(sass());

    return es.concat(fa, styles)
        .pipe(concat(options.build.css))
        .pipe(gulp.dest(paths.build.css));
});

gulp.task('fonts', function() {
    return gulp.src(paths.concat.fonts)
      .pipe(gulp.dest(paths.build.fonts));
});

gulp.task('entypo', function() {
    return gulp.src(paths.concat.entypo)
      .pipe(gulp.dest(paths.build.css));
});

gulp.task('imgs', function() {
    return gulp.src(paths.imgs)
      .pipe(gulp.dest(paths.build.imgs));
});

gulp.task('test', ['build'], function() {
    // Placeholder for test task.
});

gulp.task('build', ['compile', 'concat', 'fonts', 'entypo', 'imgs']);
gulp.task('concat', ['concat-js', 'concat-css']);
gulp.task('default', ['compile', 'sass']);
