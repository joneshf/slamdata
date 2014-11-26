'use strict'

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , nwBuilder = require('node-webkit-builder')
  ;

gulp.task('dist-node-webkit', function() {
    var nw = new nwBuilder({
        buildDir: 'dist',
        files: 'bin/node-webkit/**',
        macIcns: 'imgs/slamdata.icns',
        platforms: ['linux64', 'osx', 'win'],
        winIco: 'imgs/slamdata.ico'
    });
    return nw.on('log', gutil.log).build();
});

gulp.task('dist-node-webkit-platform', function() {
    var opts = {
        buildDir: 'dist',
        files: 'bin/node-webkit/**',
    };
    if (process.platform === 'linux') {
        opts.platforms = ['linux64'];
    } else if (process.platform === 'darwin') {
        opts.platforms = ['osx'];
        opts.macIcns = 'imgs/slamdata.icns';
    } else {
        opts.platforms = ['win']
        opts.winIco = 'imgs/slamdata.ico';
    }
    var nw = new nwBuilder(opts);
    return nw.on('log', gutil.log).build();
});
