import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';

const $ = gulpLoadPlugins();

const dirs = {
  src: 'src',
  build: 'build',
  buildVendor: 'build/vendor',
  node: 'node_modules',
  bower: 'bower_components'
};

const allFiles = `${dirs.src}/**`;
const revManifest = `${dirs.build}/rev-manifest.json`;

const js = {
  all: ['**/*.js', `!${dirs.build}/**`, `!${dirs.node}/**`, `!${dirs.bower}/**`],
  src: `${dirs.src}/js/**/*.js`,
  build: `${dirs.build}/js`,
  app: `${dirs.src}/js/app.js`,
  modules: `${dirs.src}/js/**/*.module.js`,
  vendor: {
    src: [
      `${dirs.bower}/angular/angular.min.js`,
      `${dirs.bower}/angular/angular.min.js.map`,
      `${dirs.bower}//angular-animate/angular-animate.min.js`,
      `${dirs.bower}//angular-animate/angular-animate.min.js.map`,
      `${dirs.bower}//angular-bootstrap/ui-bootstrap-tpls.min.js`,
      `${dirs.bower}//angular-clipboard/angular-clipboard.js`
    ],
    build: `${dirs.buildVendor}/js`
  }
};

const html = {
  src: `${dirs.src}/**/*.html`
};

const css = {
  src: `${dirs.src}/css/**/*.css`,
  build: `${dirs.build}/css`,
  vendor: {
    src: [
      `${dirs.bower}/bootstrap/dist/css/bootstrap.min.css`
    ],
    build: `${dirs.buildVendor}/css`
  }
};

const fonts = {
  vendor: {
    src: `${dirs.bower}/bootstrap/dist/fonts/glyphicons-halflings-regular.*`,
    build: `${dirs.buildVendor}/fonts`
  }
};

gulp.task('default', ['build']);

gulp.task('build', () => {
  return runSequence(
    'clean',
    ['js:lint', 'js:compile', 'css:compile'],
    ['js:vendor', 'css:vendor', 'fonts:vendor', 'html:compile']
  );
});

gulp.task('clean', () => {
  return del(dirs.build);
});

gulp.task('watch', ['build'], () => {
  gulp.watch(allFiles, ['build']);
});

gulp.task('html:compile', () => {
  const manifest = gulp.src(revManifest);

  gulp.src(html.src)
    .pipe($.revReplace({ manifest: manifest }))
    .pipe(gulp.dest(dirs.build));

  del(revManifest);
});

gulp.task('js:lint', () => {
  return gulp.src(js.all)
    .pipe($.eslint())
    .pipe($.eslint.format());
});

gulp.task('js:compile', () => {
  return gulp.src([js.app, js.modules, js.src])
    .pipe($.sourcemaps.init())
      .pipe($.ngAnnotate())
      .pipe($.babel())
      .pipe($.concat('js/app.min.js'))
      .pipe($.uglify())
      .pipe($.rev())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(dirs.build))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(dirs.build));
});

gulp.task('css:compile', () => {
  return gulp.src([css.src])
    .pipe(gulp.dest(css.build));
});

gulp.task('js:vendor', () => {
  return gulp.src(js.vendor.src)
    .pipe(gulp.dest(js.vendor.build));
});

gulp.task('css:vendor', () => {
  return gulp.src(css.vendor.src)
    .pipe(gulp.dest(css.vendor.build));
});

gulp.task('fonts:vendor', () => {
  return gulp.src(fonts.vendor.src)
    .pipe(gulp.dest(fonts.vendor.build));
});

gulp.task('server', () => {
  $.connect.server({
    root: dirs.build,
    port: 8080
  });
});
