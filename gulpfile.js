var gulp = require('gulp')
  , spawn = require('child_process').spawn
  , clean = require('gulp-clean')
  , concat = require('gulp-concat')
  , nwBuilder = require('node-webkit-builder')
  , purescript = require('gulp-purescript')
  , sass = require('gulp-sass')
  , es = require('event-stream')
  ;

// Configuration.
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
        browser: {
            css: 'bin/browser/css',
            fonts: 'bin/browser/fonts',
            imgs: 'bin/browser/imgs',
            index: 'bin/browser',
            js: 'bin/browser/js'
        },
        'node-webkit': {
            css: 'bin/node-webkit/css',
            fonts: 'bin/node-webkit/fonts',
            imgs: 'bin/node-webkit/imgs',
            index: 'bin/node-webkit',
            jar: 'bin/node-webkit/jar',
            js: 'bin/node-webkit/js'
        }
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

// Functions.
var concatJs = function(target) {
    return gulp.src(paths.concat.js)
      .pipe(concat(options.build.js))
      .pipe(gulp.dest(paths.build[target].js));
};

var concatCss = function(target) {
    var fa = gulp.src(paths.concat.css);
    var styles = gulp.src(paths.style)
        .pipe(sass());

    return es.concat(fa, styles)
        .pipe(concat(options.build.css))
        .pipe(gulp.dest(paths.build[target].css));
};

var fonts = function(target) {
    return gulp.src(paths.concat.fonts)
      .pipe(gulp.dest(paths.build[target].fonts));
};

var entypo = function(target) {
    return gulp.src(paths.concat.entypo)
      .pipe(gulp.dest(paths.build[target].css));
};

var imgs = function(target) {
    return gulp.src(paths.imgs)
      .pipe(gulp.dest(paths.build[target].imgs));
};

// Workhorse tasks.
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

gulp.task('slamengine-jar', function() {
    return gulp.src('../slamengine/target/scala-2.10/slamengine_2.10-0.1-SNAPSHOT-one-jar.jar')
        .pipe(gulp.dest(paths.build['node-webkit'].jar));
});

gulp.task('slamengine-js', function() {
    return gulp.src('lib/node-webkit/js/slamengine.js')
        .pipe(gulp.dest(paths.build['node-webkit'].js));
});

gulp.task('concat-js-browser', function() {return concatJs('browser');});
gulp.task('concat-css-browser', function() {return concatCss('browser');});
gulp.task('fonts-browser', function() {return fonts('browser');});
gulp.task('entypo-browser', function() {return entypo('browser');});
gulp.task('imgs-browser', function() {return imgs('browser');});

gulp.task('concat-js-node-webkit', function() {return concatJs('node-webkit');});
gulp.task('concat-css-node-webkit', function() {return concatCss('node-webkit');});
gulp.task('fonts-node-webkit', function() {return fonts('node-webkit');});
gulp.task('entypo-node-webkit', function() {return entypo('node-webkit');});
gulp.task('imgs-node-webkit', function() {return imgs('node-webkit');});

gulp.task('build-browser', [
    'compile',
    'concat-js-browser',
    'concat-css-browser',
    'fonts-browser',
    'entypo-browser',
    'imgs-browser'
]);
gulp.task('build-node-webkit', [
    'compile',
    'concat-js-node-webkit',
    'concat-css-node-webkit',
    'fonts-node-webkit',
    'entypo-node-webkit',
    'imgs-node-webkit',
    'slamengine-jar',
    'slamengine-js'
]);

gulp.task('dist-node-webkit', function() {
    nw = new nwBuilder({
        files: 'bin/node-webkit/**',
        platforms: ['linux64', 'osx', 'win'],
        buildDir: 'dist'
    });
    return nw.build();
});

// Main tasks.
gulp.task('build', ['build-browser', 'build-node-webkit']);
gulp.task('default', ['compile', 'sass']);
gulp.task('dist', ['build', 'dist-node-webkit']);
gulp.task('test', ['build']);
gulp.task('watch', function() {
    gulp.watch(paths.src, ['compile']);
    gulp.watch(paths.style, ['sass']);
});
