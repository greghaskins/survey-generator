'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');

var p = {
  src: 'src/**/*',
  build: 'build',
  gulpfile: 'gulpfile.js',
  revManifest: 'build/rev-manifest.json',

  html: {
    src: 'src/**/*.html'
  },

  js: {
    src: 'src/js/**/*.js',
    build: 'build/js',
    buildVendor: 'build/vendor/js',
    app: 'src/js/app.js',
    modules: 'src/js/**/*.module.js',
    vendor: [
      'bower_components/angular/angular.min.js',
      'bower_components/angular/angular.min.js.map',
      'bower_components/angular-animate/angular-animate.min.js',
      'bower_components/angular-animate/angular-animate.min.js.map',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/angular-clipboard/angular-clipboard.js'
    ]
  },

  css: {
    src: 'src/css/app.css',
    build: 'build/css',
    vendor: ['bower_components/bootstrap/dist/css/bootstrap.min.css'],
    buildVendor: 'build/vendor/css'
  },

  fonts: {
    vendor: ['bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.*'],
    buildVendor: 'build/vendor/fonts'
  }
};

gulp.task('default', ['build']);

gulp.task('build', function() {
  runSequence('clean', ['js:lint', 'js:compile', 'css:compile'], ['js:vendor', 'css:vendor', 'fonts:vendor', 'html:compile']);
});

gulp.task('clean', function() {
  return del(p.build);
});

gulp.task('watch', ['build'], function() {
  gulp.watch(p.src, ['build']);
});

gulp.task('html:compile', function() {
  var manifest = gulp.src(p.revManifest);

  gulp.src(p.html.src)
    .pipe($.revReplace({ manifest: manifest }))
    .pipe(gulp.dest(p.build));

  del(p.revManifest);
});

gulp.task('js:lint', function() {
  return gulp.src([p.js.src, p.gulpfile])
    .pipe($.eslint())
    .pipe($.eslint.format());
});

gulp.task('js:compile', function() {
  return gulp.src([p.js.app, p.js.modules, p.js.src])
    .pipe($.sourcemaps.init())
      .pipe($.ngAnnotate())
      .pipe($.concat('js/app.min.js'))
      .pipe($.uglify())
      .pipe($.rev())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(p.build))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(p.build));
});

gulp.task('css:compile', function() {
  return gulp.src([p.css.src])
    .pipe(gulp.dest(p.css.build));
});

gulp.task('js:vendor', function() {
  return gulp.src(p.js.vendor)
    .pipe(gulp.dest(p.js.buildVendor));
});

gulp.task('css:vendor', function() {
  return gulp.src(p.css.vendor)
    .pipe(gulp.dest(p.css.buildVendor));
});

gulp.task('fonts:vendor', function() {
  return gulp.src(p.fonts.vendor)
    .pipe(gulp.dest(p.fonts.buildVendor));
});

gulp.task('server', function() {
  $.connect.server({
    root: p.build,
    port: 8080
  });
});
