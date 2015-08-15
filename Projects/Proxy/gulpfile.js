'use strict';

//http://stackoverflow.com/questions/23506545/gulp-watch-and-nodemon-conflict

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    open = require('gulp-open'),
    os = require('os');

var assets = 'app/**/*.js';

var notify = require('gulp-notify'),
    livereload = require('gulp-livereload');
 


gulp.task('default',['demon','launchapp'], function() {
  console.log('defualt task');
});

var browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ?  'firefox' : 'chrome'));

gulp.task('launchapp', function(){
  var options = {
    uri: 'localhost:1337',
    app: browser
  };
  gulp.src('')
  .pipe(open(options));
});

gulp.task('lint', function() {
  return gulp.src(assets)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
    /*.pipe(jshint.reporter('fail'));*/
});
gulp.task('watch', function () {
  gulp.watch(assets, ['lint']);
});

gulp.task('demon', function () {
  nodemon({ script: 'app/proxy.js'
          , ext: 'js'
          , ignore: ['ignored.js']
          , tasks: ['lint'] })
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', function () {
      gulp.src(assets)
           .pipe(notify('Reloading page, please wait...'));
      console.log('restarted!');
    })
})