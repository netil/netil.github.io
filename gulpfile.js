'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Lint JavaScript
/*gulp.task('jshint', function() {
    return gulp.src(['app/scripts/!**!/!*.js', 'app/styleguide/!**!/!*.js'])
        .pipe(reload({stream: true, once: true}))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});*/

// Watch Files For Changes & Reload
gulp.task('serve', function() {
    browserSync({
        notify: false,
        // Customize the BrowserSync console logging prefix
        logPrefix: 'NETIL',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: 'demo',
        baseDir: 'demo'
    });

    gulp.watch(['demo/**/*'], reload);
    /*gulp.watch(['app/!**!/!**!/!**!/!*.{scss,css}'], ['styles', reload]);
    gulp.watch(['app/scripts/!**!/!*.js','app/styleguide/!**!/!*.js'], ['jshint']);
    gulp.watch(['app/images/!**!/!*'], reload);*/
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function(cb) {
    //runSequence('styles', ['html', 'scripts', 'styles', 'images', 'fonts', 'sounds', 'copy', 'copy-workerscripts'], cb);
});

gulp.task('sw-precache', function(callback) {
    var path = require('path');
    var swPrecache = require('sw-precache');
    var rootDir = 'demo';

    swPrecache.write(path.join(rootDir, 'sw.js'), {
        staticFileGlobs: [ rootDir + '/**/*.{js,html,css,png,jpg,gif}' ],
        stripPrefix: rootDir

        // 런타임 캐싱 사용시, 생성되는 sw.js에 sw-toolbox가 자동으로 포함
        // https://github.com/GoogleChrome/sw-precache#runtimecaching-arrayobject
        /*,runtimeCaching: [{
             urlPattern: /\.cloudflare\.com\/(.*)/i,
             handler: 'fastest',
                 options: {
                 cache: {
                     maxEntries: 10,
                     name: 'cdnjs'
                 }
             }
         }],*/
    }, callback);
});