'use strict';

//http://stackoverflow.com/questions/23506545/gulp-watch-and-nodemon-conflict

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var open = require('gulp-open');
var os = require('os');
var jscs = require('gulp-jscs');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var prettify = require('gulp-prettify');

var assets = 'app/**/*.js';

gulp.task('default',['daemon','launchapp'], function() {
  console.log('defualt task');
});

var browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ?  'firefox' : 'chrome'));

gulp.task('launchapp', function() {
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

gulp.task('watch', function() {
  gulp.watch(assets, ['lint']);
});

gulp.task('check',['lint'], function() {
  return gulp.src('*/*.js')
        .pipe(jscs());
});
/*
gulp.task('format', function() {
  gulp.src(assets)
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest('build/'));
});
*/
gulp.task('daemon', function() {
  nodemon({script: 'app/proxy.js'
          , ext: 'js'
          , ignore: ['ignored.js']
          , tasks: ['lint']})
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', function() {
      gulp.src(assets).pipe(notify('Reloading page, please wait...'));
      console.log('restarted!');
    });
});
