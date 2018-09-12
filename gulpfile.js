//Gulp 4

'use strict';

const gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  rimraf = require('rimraf'),
  browserSync = require('browser-sync'),
  watch = require('gulp-watch'),
  sourcemaps = require('gulp-sourcemaps'),

  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),

  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  pxtorem = require('postcss-pxtorem'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require('css-mqpacker'),
  cssClean = require('postcss-clean'),

  pug = require('gulp-pug'),

  imagemin = require('gulp-imagemin');

const path = {
  build: {
    pug: 'build/',
    js: 'build/js/',
    sass: 'build/css/',
    assets: {
      img: 'build/img/',
      fonts: 'build/fonts/',
      media: 'build/media/'
    }
  },

  src: {
    pug: 'src/pug/*.pug',
    js: ['src/js/abstract/**/*.js', 'src/js/components/**/*.js'],
    sass: 'src/sass/main.sass',
    assets: {
      img: 'src/assets/img/**/*.*',
      fonts: 'src/assets/fonts/**/*.*',
      media: 'src/assets/media/**/*.*',
    }
  },

  watch: {
    pug: 'src/pug/**/*.pug',
    js: 'src/js/**/*.js',
    sass: 'src/sass/**/*.sass',
    assets: {
      img: 'src/assets/img/**/*.*',
      fonts: 'src/assets/fonts/**/*.*',
      media: 'src/assets/media/**/*.*'
    }
  },
  
  clean: './build'
};

const reload = browserSync.reload;

const postcssPlugins = [
  pxtorem({
    rootValue: 16,
    propList: ['*']
  }),
  autoprefixer({
    browsers: ['last 50 versions', '>1%'],
    grid: true,
    cascade: false
  }),
  mqpacker(),
  cssClean()
];

gulp.task('webserver', function () {
  browserSync({
    server: {
      baseDir: './build'
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: 'localhost'
  });
});

gulp.task('pug', function () {
  return gulp.src(path.src.pug)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(pug())
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.build.pug));
});

gulp.task('pug:prod', function () {
  return gulp.src(path.src.pug)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(path.build.pug));
});

gulp.task('js', function () {
  return gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.build.js));
});

gulp.task('js:prod', function () {
  return gulp.src(path.src.js)
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js));
});

gulp.task('sass', function () {
  return gulp.src(path.src.sass)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.build.sass));
});

gulp.task('sass:prod', function () {
  return gulp.src(path.src.sass)
    .pipe(sass())
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest(path.build.sass));
});

gulp.task('assets:img', function () {
  return gulp.src(path.src.assets.img)
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.build.assets.img));
});

gulp.task('assets:img:prod', function () {
  return gulp.src(path.src.assets.img)
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.assets.img));
});

gulp.task('assets:fonts', function() {
  return gulp.src(path.src.assets.fonts)
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.build.assets.fonts));
});

gulp.task('assets:fonts:prod', function() {
  return gulp.src(path.src.assets.fonts)
    .pipe(gulp.dest(path.build.assets.fonts));
});

gulp.task('assets:media', function() {
  return gulp.src(path.src.assets.media)
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.build.assets.media));
});

gulp.task('assets:media:prod', function() {
  return gulp.src(path.src.assets.media)
    .pipe(gulp.dest(path.build.assets.media));
});

//--------------------------------------------------

gulp.task('watch', function(){
  watch([path.watch.pug], gulp.series('pug', reload));
  watch([path.watch.js], gulp.series('js', reload));
  watch([path.watch.sass], gulp.series('sass', reload));
  watch([path.watch.assets.img], gulp.series('assets:img', reload));
  watch([path.watch.assets.fonts], gulp.series('assets:fonts', reload));
  watch([path.watch.assets.media], gulp.parallel('assets:media', reload));
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

//--------------------------------------------------

gulp.task('build:dev', gulp.parallel(
  'pug',
  'js',
  'sass',
  'assets:img',
  'assets:fonts',
  'assets:media'
));

gulp.task('build:prod', gulp.parallel(
  'pug:prod',
  'js:prod',
  'sass:prod',
  'assets:img:prod',
  'assets:fonts:prod',
  'assets:media:prod'
));

gulp.task('dev', gulp.series('clean', 'build:dev'));

gulp.task('prod', gulp.series('clean', 'build:prod'));

gulp.task('dev-server', gulp.series('clean', 'build:dev', gulp.parallel(
  'webserver',
  'watch'
)));

gulp.task('prod-server', gulp.series('clean', 'build:prod', gulp.parallel(
  'webserver',
  'watch'
)));