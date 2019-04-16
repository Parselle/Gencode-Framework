'use strict';

const gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  rimraf = require('rimraf'),
  browserSync = require('browser-sync'),
  watch = require('gulp-watch'),
  sourcemaps = require('gulp-sourcemaps'),

  webpack = require('webpack-stream'),

  uglifyJsPlugin = require('uglifyjs-webpack-plugin'),

  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  pxtorem = require('postcss-pxtorem'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),

  pug = require('gulp-pug'),

  imagemin = require('gulp-imagemin');

const path = {
  dist: {
    pug: 'dist/',
    js: 'dist/js/',
    sass: 'dist/css/',
    assets: {
      img: 'dist/img/',
      fonts: 'dist/fonts/',
      media: 'dist/media/',
      static: 'dist'
    }
  },

  src: {
    pug: 'src/pages/**/*.pug',
    js: 'src/index.js',
    sass: 'src/index.sass',
    assets: {
      img: 'src/assets/img/**/*.*',
      fonts: 'src/assets/fonts/**/*.*',
      media: 'src/assets/media/**/*.*',
      static: 'src/assets/static/**/*.*'
    }
  },

  watch: {
    pug: 'src/**/*.pug',
    js: 'src/**/*.js',
    sass: 'src/**/*.sass',
    assets: {
      img: 'src/assets/img/**/*.*',
      fonts: 'src/assets/fonts/**/*.*',
      media: 'src/assets/media/**/*.*',
      static: 'src/assets/static/**/*.*',
    }
  },
  
  clean: './dist'
};

const reload = browserSync.reload;

const postcssPlugins = [
  pxtorem({
    rootValue: 16,
    propList: ['*']
  }),
  autoprefixer({
    browsers: ['last 5 versions', 'not ie < 11'],
    grid: true,
    cascade: false
  }),
  cssnano({
    preset: 'default'
  })
];

gulp.task('webserver', function () {
  browserSync({
    server: {
      baseDir: './dist'
    },
    tunnel: false,
    host: 'localhost',
    port: 8080,
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
    .pipe(gulp.dest(path.dist.pug));
});

gulp.task('pug:prod', function () {
  return gulp.src(path.src.pug)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    // .pipe(rename({
    //   extname: '.php'
    // }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.dist.pug));
});

gulp.task('js', function () {
  return gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(webpack({
      devtool: 'source-map',
      mode: 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('js:prod', function () {
  return gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: 'main.js',
      },
      optimization: {
        minimizer: [
          new uglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
              compress: true,
              ecma: 6,
              mangle: true
            },
            sourceMap: false
          })
        ]
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('sass', function () {
  return gulp.src(path.src.sass)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(rename('main.css'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.dist.sass));
});

gulp.task('sass:prod', function () {
  return gulp.src(path.src.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(postcssPlugins))
    .pipe(rename('main.css'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.dist.sass));
});

gulp.task('assets:img', function () {
  return gulp.src(path.src.assets.img)
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.dist.assets.img));
});

gulp.task('assets:img:prod', function () {
  return gulp.src(path.src.assets.img)
    .pipe(plumber())
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.dist.assets.img));
});

gulp.task('assets:fonts', function() {
  return gulp.src(path.src.assets.fonts)
    .pipe(gulp.dest(path.dist.assets.fonts));
});

gulp.task('assets:fonts:prod', function() {
  return gulp.src(path.src.assets.fonts)
    .pipe(gulp.dest(path.dist.assets.fonts));
});

gulp.task('assets:media', function() {
  return gulp.src(path.src.assets.media)
    .pipe(gulp.dest(path.dist.assets.media));
});

gulp.task('assets:media:prod', function() {
  return gulp.src(path.src.assets.media)
    .pipe(gulp.dest(path.dist.assets.media));
});

gulp.task('assets:static', function() {
  return gulp.src(path.src.assets.static)
    .pipe(gulp.dest(path.dist.assets.static));
});

gulp.task('assets:static:prod', function() {
  return gulp.src(path.src.assets.static)
    .pipe(gulp.dest(path.dist.assets.static));
});

//--------------------------------------------------

gulp.task('watch:dev', function(){
  watch([path.watch.pug], gulp.series('pug', reload));
  watch([path.watch.js], gulp.series('js', reload));
  watch([path.watch.sass], {readDelay: 500}, gulp.series('sass', reload));
  watch([path.watch.assets.img], gulp.series('assets:img', reload));
  watch([path.watch.assets.fonts], gulp.series('assets:fonts', reload));
  watch([path.watch.assets.media], gulp.parallel('assets:media', reload));
});

gulp.task('watch:prod', function(){
  watch([path.watch.pug], gulp.series('pug:prod', reload));
  watch([path.watch.js], gulp.series('js:prod', reload));
  watch([path.watch.sass], {readDelay: 500}, gulp.series('sass:prod', reload));
  watch([path.watch.assets.img], gulp.series('assets:img:prod', reload));
  watch([path.watch.assets.fonts], gulp.series('assets:fonts:prod', reload));
  watch([path.watch.assets.media], gulp.parallel('assets:media:prod', reload));
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
  'watch:dev'
)));

gulp.task('prod-server', gulp.series('clean', 'build:prod', gulp.parallel(
  'webserver',
  'watch:prod'
)));