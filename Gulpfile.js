var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  del = require('del'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	concat = require('gulp-concat'),
  clean = require('gulp-clean'),
  wiredep = require('wiredep').stream,
  webpack = require('gulp-webpack');


gulp.task('build', function(callback) {
  runSequence(
    'clean',
    [
      'js',
      'copy_static', 
      'scss'/*, 
      'bower'*/
    ],
    callback
  );
});

gulp.task('lint', function() {
  return gulp.src('public_src/js/**/*.js')
    .pipe(jshint({ debug: true }))
    .pipe(jshint.reporter('default'));
});

gulp.task('clean', function () {
  return del(['build/**/*']);
});

gulp.task('scss', function() {
  return gulp.src('app/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('js', function(){
  return gulp.src('app/index.jsx')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('build/'));
});

gulp.task('bower', function () {
  gulp.src('app/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('build/'));
});

//copy static files
gulp.task('copy_static', function(){
  return gulp.src(['app/index.html', 'app/lib/**/*', 'app/assets/**/*'], {
      base: 'app'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  	gulp.watch('app/**/*', ['build']);
});

gulp.task('default', ['build', 'watch'], function() {});
