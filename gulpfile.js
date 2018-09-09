var gulp = require('gulp');
var mocha = require('gulp-mocha');
var babel = require('babel-register');
var nodemon = require('gulp-nodemon');

gulp.task('test', function () {
    return gulp.src(['tests/*.js'])
        .pipe(mocha({
            compilers: babel
        }))
});

gulp.task('start', ['test'], function(){
    nodemon({
        script: 'server.js',
        ext: 'js'
      })
      .on('restart', function() {
        console.log('>> node restart');
      })
});

gulp.task('run', ['start']);