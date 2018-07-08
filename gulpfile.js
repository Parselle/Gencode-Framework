'use strict';

//Add plugin
let gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    watch = require('gulp-watch'),
    rimraf = require('rimraf'),
    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),
    wait = require('gulp-wait'),

    htmlhint = require('gulp-htmlhint'),

    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('gulp-autoprefixer'),
    mqpacker = require('css-mqpacker'),
    csso = require('gulp-csso'),
    pxrem = require('gulp-px-to-rem'),

    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyes'),

    imagemin = require('gulp-imagemin'),
    pngquant = require('gulp-pngquant'),

    reload = browserSync.reload;
	

	//Variable Path
	let path = {
		
    build: { // Way for complete(build) files
        html: 'build/',
        php: 'build/',
        js_app: 'build/js/',
        js_vendor: 'build/js/vendor/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
	
	
	src: { //Way for src(dev) files
        html: 'src/*.html',
        php: 'src/*.php',
        js_app: 'src/js/app/*.js',
        js_jquery: 'src/js/vendor/jquery.min.js',
        js_vendor: ['src/js/vendor/*.js', '!src/js/vendor/jquery.min.js'],
        css: 'src/css/**/*.scss',
        css_or: 'src/css/override.css',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
	
	
    watch: {  //Files to watch
        html: 'src/**/*.html',
        php: 'src/*.php',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
	
    clean: './build'
};



//Dev-server
let config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9009,
    logPrefix: "localhost"
};


//LiveReload
gulp.task('webserver', function () {
    browserSync(config);
});


//------------------------------------------------------


//Merge HTML files
gulp.task('html:build', function () {
    gulp.src(path.src.html) //Choose files
        .pipe(plumber()) //Run error handler
        .pipe(rigger()) //Tunnel to rigger
        .pipe(htmlhint()) //Validate html
        .pipe(plumber.stop()) //Stop error handler
        .pipe(gulp.dest(path.build.html)) //Past to build folder
        .pipe(reload({stream: true})); //Restart server
});

//Merge PHP files
gulp.task('php:build', function () {
    gulp.src(path.src.php) //Choose files
        .pipe(plumber()) //Run error handler
        .pipe(plumber.stop()) //Stop error handler
        .pipe(gulp.dest(path.build.php)) //Past to build folder
        .pipe(reload({stream: true})); //Restart server
});


//Merge JS files
gulp.task('js:build', function () {
    gulp.src(path.src.js_app) //Choose main.js
        .pipe(plumber()) //Run error handler
        .pipe(rigger()) //Tunnel to rigger
        .pipe(sourcemaps.init()) //Initializing sourcemap
        .pipe(uglify()) //Min ES6+
        .pipe(concat('app.js')) //Merge all files
        .pipe(sourcemaps.write()) //Write Maps
        .pipe(plumber.stop()) //Stop error handler
        .pipe(gulp.dest(path.build.js_app)); //Past to build folder

    gulp.src(path.src.js_jquery)
        .pipe(plumber()) //Run error handler
        .pipe(rigger())
        .pipe(plumber.stop()) //Stop error handler
        .pipe(gulp.dest(path.build.js_vendor)); //Past to build folder
    
    gulp.src(path.src.js_vendor)
        .pipe(plumber()) //Run error handler
        .pipe(rigger()) //Tunnel to rigger
        .pipe(sourcemaps.init()) //Initializing sourcemap
        .pipe(uglify()) //Min ES6+
        .pipe(concat('vendor.min.js'))
        .pipe(sourcemaps.write()) //Write Maps
        .pipe(plumber.stop()) //Stop error handler
        .pipe(gulp.dest(path.build.js_vendor)) //Past to build folder
        .pipe(reload({stream: true})); //Restart server
});


//Merge Style files
gulp.task('css:build', function () {
	
	let plugins = [  //Init postcss plugins
	    mqpacker //Merge same @media
	];
	
    gulp.src(path.src.css) //Choose main.scss
        .pipe(plumber()) //Run error handler
        .pipe(wait(500))
        .pipe(sourcemaps.init()) //Initializing sourcemap
        .pipe(sass()) //Compilation
        .pipe(autoprefixer()) //Add prefixes
        .pipe(postcss(plugins))  //Run postcss plugins
        .pipe(csso()) //Minify and optimize css
        .pipe(pxrem({rootPX: 16})) // Convert PX to REM
        .pipe(sourcemaps.write())  //Write Maps
        .pipe(plumber.stop()) //Stop error handler
        .pipe(gulp.dest(path.build.css)) //Past to build folder
        .pipe(reload({stream: true}));  //Restart server

    gulp.src(path.src.css_or) //Choose overwrite.css
        .pipe(gulp.dest(path.build.css)); //Past to build folder
});





//Minimalize images
gulp.task('image:build', function () {
    gulp.src(path.src.img) //Choose images
        .pipe(plumber()) //Run error handler
        /*.pipe(imagemin({ //Minimalize
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))*/
        .pipe(plumber.stop()) //Stop error handler
        .pipe(gulp.dest(path.build.img)) //Past to build folder
        .pipe(reload({stream: true}));  //Restart server
});


//Copy fonts without any compression
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


//--------------------------------------------------

//Watch
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.php], function(event, cb) {
        gulp.start('php:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


//Clean build folder
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

//--------------------------------------------------


//Build Task
gulp.task('build', [
    'clean',
    'html:build',
    'php:build',
    'js:build',
    'css:build',
    'fonts:build',
    'image:build'
]);

//Final Task to start all
gulp.task('default', ['build', 'webserver', 'watch']);