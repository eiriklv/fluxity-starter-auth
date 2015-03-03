'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const filter = require('gulp-filter');
const replace = require('gulp-replace');
const autoprefixer = require('gulp-autoprefixer');
const jshint = require('gulp-jshint');
const react = require('gulp-react');
const cachebust = new require('gulp-cachebust')();
const fs = require('fs-extra');
const minifyCSS = require('gulp-minify-css');
const sass = require('gulp-ruby-sass');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const notifier = require('node-notifier');

const paths = {
  build: 'build/',
  public: 'public/',
  sass: 'style/main.scss',
  server: [
    'package.json',
    'app.js',
    'app-init-setup.js',
    'white-listed-env-vars.js',
    'cachebuster.js',
    'config.js',
    'flux/**',
    'server-api/**'
  ]
};

const pkg = require('./package.json');

function notifyError(err) {
  if (!err) {
    return;
  }
  gutil.log(err.message);
  gutil.beep();
  notifier.notify({
    title: 'Building ' + pkg.name,
    message: err.message
  });
}

gulp.task('build', ['clean', 'sass', 'webpack', 'copy', 'bust'], function() {
  notifier.notify({
    icon: null,
    contentImage: __dirname + '/public/images/favicon.png',
    title: pkg.name,
    sound: 'Glass',
    message: 'Build: done.',
    open: 'file://' + __dirname + '/' + paths.build
  });

  gutil.log('[build] Run `./scripts/prod` to test the built app.');
});

gulp.task('sass', function() {
  let filterCSS = filter('**/*.css');

  return gulp.src(paths.sass)
    .pipe(sass())
    .on('error', notifyError)
    .pipe(filterCSS)
    .pipe(autoprefixer())
    .on('error', notifyError)
    .pipe(filterCSS.restore())
    .pipe(gulp.dest(paths.public + 'css'));
});

gulp.task('clean', function(callback) {
  fs.remove(paths.build, callback);
});

gulp.task('webpack', ['clean'], function(callback) {
  webpack(webpackConfig, function(err, stats) {
    if (err) return notifyError(err);

    gutil.log('[webpack]', stats.toString({
      colors: true,
      hash: false,
      timings: false,
      assets: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: true
    }));

    callback();
  });
});

gulp.task('copy', ['copy:server', 'copy:public']);

gulp.task('copy:server', ['clean'], function() {
  return gulp.src(paths.server, {
      base: '.'
    })
    .pipe(gulp.dest(paths.build));
});

gulp.task('copy:public', ['clean', 'sass'], function() {
  let src = [paths.public + '**/*', '!**/*.map'];
  let filterCSS = filter('**/*.css');

  return gulp.src(src, {
    base: '.'
  })
  .pipe(filterCSS)
  .pipe(minifyCSS({
    keepBreaks: true
  }))
  .pipe(filterCSS.restore())
  .pipe(gulp.dest(paths.build));
});

const bustSrc = gulp.task('bust', ['bust:collect', 'bust:replace']);

gulp.task('bust:collect', ['sass', 'webpack', 'copy'], function() {
  let src = [].concat(paths.public + '**/*');

  return gulp.src(src, {
      cwd: paths.build,
      base: paths.build + paths.public
    })
    .pipe(cachebust.resources());
});

gulp.task('bust:replace', ['bust:collect'], function() {
  gutil.log('[bust:replace]', 'Busting ' + Object.keys(cachebust.mappings).length + ' asset(s)...');

  return gulp.src(paths.server, {
      cwd: paths.build,
      base: paths.build
    })
    .pipe(cachebust.references())
    .pipe(gulp.dest(paths.build));
});
