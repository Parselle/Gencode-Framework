//Gulp 4

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
    pug = require('gulp-pug'),

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
    
    //Way for complete(build) files
    build: {
        pug_core: 'build/',
        js_core: 'build/js/',
        sass_core: 'build/css/',
        assets: {
            img: 'build/img/',
            fonts: 'build/fonts/',
            other: 'build/'
        }
    },
	
	//Way for src(dev) files
	src: {
        pug: 'src/pug-core/*.pug',
        js_core: 'src/js-core/main.js',
        sass_core: 'src/sass-core/main.sass',
        assets: {
            img: 'src/assets/img/**/*.*',
            fonts: 'src/assets/fonts/**/*.*',
            other: [
                'src/assets/**/*.*',
                '!src/assets/img/**/*.*',
                '!src/assets/fonts/**/*.*'
              ]
        }
    },
	
	//Files to watch
    watch: {
        pug: 'src/pug-core/**/*.pug',
        js_core: 'src/js-core/**/*.js',
        sass_core: 'src/sass-core/**/*.sass',
        assets: {
            img: 'src/assets/img/**/*.*',
            fonts: 'src/assets/fonts/**/*.*'
        }
    },
    
    //Clean folder (output)
    clean: './build'
};

//Server config
let config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 3001,
    logPrefix: "localhost"
};

//LiveReload
gulp.task('webserver', function () {
    browserSync(config);
});

//Merge Pug files (Dev-build)
gulp.task('pug_core', function () {
    return gulp.src(path.src.pug) //Choose files
        .pipe(plumber()) //Run error handler
        .pipe(rigger()) //Tunnel to rigger
        .pipe(htmlhint()) //Validate html
        .pipe(plumber.stop()) //Stop error handler
        .pipe(pug())
        .pipe(gulp.dest(path.build.pug_core)) //Past to build folder
        .pipe(reload({stream: true})); //Restart server
});

//Merge Pug files (Prod-build)
gulp.task('pug_core:prod', function () {
    return gulp.src(path.src.pug) //Choose files
        .pipe(plumber()) //Run error handler
        .pipe(rigger()) //Tunnel to rigger
        .pipe(htmlhint()) //Validate html
        .pipe(plumber.stop()) //Stop error handler
        .pipe(pug())
        .pipe(gulp.dest(path.build.pug_core)) //Past to build folder
        .pipe(reload({stream: true})); //Restart server
});

//Merge JS files (Dev-build)
gulp.task('js_core', function () {
    return gulp.src(path.src.js_core) //Choose main.js
        .pipe(plumber()) //Run error handler
        .pipe(rigger()) //Tunnel to rigger
        .pipe(plumber.stop()) //Stop error handler
        .pipe(gulp.dest(path.build.js_core)); //Past to build folder
});

//Merge JS files (Prod-build)
gulp.task('js_core:prod', function () {
    return gulp.src(path.src.js_core) //Choose main.js
        .pipe(plumber()) //Run error handler
        .pipe(rigger()) //Tunnel to rigger
        .pipe(sourcemaps.init()) //Initializing sourcemap
        .pipe(uglify()) //Min ES6+
        //.pipe(concat('app.js')) //Merge all files
        .pipe(sourcemaps.write()) //Write Maps
        .pipe(plumber.stop()) //Stop error handler
        .pipe(gulp.dest(path.build.js_core)); //Past to build folder
});

//Merge Sass files (Dev-build)
gulp.task('sass_core', function () {
	
	let plugins = [  //Init postcss plugins
	    mqpacker //Merge same @media
	];
	
    return gulp.src(path.src.sass_core) //Choose main.sass
        .pipe(plumber()) //Run error handler
        .pipe(wait(500))
        .pipe(sass()) //Compilation
        .pipe(autoprefixer()) //Add prefixes
        .pipe(pxrem({rootPX: 16})) // Convert PX to REM
        .pipe(plumber.stop()) //Stop error handler
        .pipe(gulp.dest(path.build.sass_core)) //Past to build folder
        .pipe(reload({stream: true}));  //Restart server
});

//Merge Sass files (Prod-build)
gulp.task('sass_core:prod', function () {
	
	let plugins = [  //Init postcss plugins
	    mqpacker //Merge same @media
	];
	
    return gulp.src(path.src.sass_core) //Choose main.sass
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
        .pipe(gulp.dest(path.build.sass_core)) //Past to build folder
        .pipe(reload({stream: true}));  //Restart server
});

//Copy images (Dev-build)
gulp.task('assets:img', function () {
    return gulp.src(path.src.assets.img) //Choose images
        .pipe(plumber()) //Run error handler
        .pipe(plumber.stop()) //Stop error handler
        .pipe(gulp.dest(path.build.assets.img)) //Past to build folder
        .pipe(reload({stream: true}));  //Restart server
});

//Copy images (Prod-build)
gulp.task('assets:img:prod', function () {
    return gulp.src(path.src.assets.img) //Choose images
        .pipe(plumber()) //Run error handler
        .pipe(imagemin({ //Minimalize
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(plumber.stop()) //Stop error handler
        .pipe(gulp.dest(path.build.assets.img)) //Past to build folder
        .pipe(reload({stream: true}));  //Restart server
});

//Copy fonts (Dev-build)
gulp.task('assets:fonts', function() {
    return gulp.src(path.src.assets.fonts)
        .pipe(gulp.dest(path.build.assets.fonts))
});

//Copy fonts (Prod-build)
gulp.task('assets:fonts:prod', function() {
    return gulp.src(path.src.assets.fonts)
        .pipe(gulp.dest(path.build.assets.fonts))
});

//Copy other assets (Dev-build)
gulp.task('assets:other', function() {
    return gulp.src(path.src.assets.other)
        .pipe(gulp.dest(path.build.assets.other))
});

//Copy other assets (Prod-build)
gulp.task('assets:other:prod', function() {
    return gulp.src(path.src.assets.other)
        .pipe(gulp.dest(path.build.assets.other))
});

//--------------------------------------------------

//Watch Tasks
gulp.task('watch', function(){
    watch([path.watch.pug_core], function(event, cb) {
        gulp.start('pug_core');
    });

    watch([path.watch.js_core], function(event, cb) {
        gulp.start('js_core');
    });

    watch([path.watch.sass_core], function(event, cb) {
        gulp.start('sass_core');
    });

    watch([path.watch.assets.img], function(event, cb) {
        gulp.start('assets:img');
    });

    watch([path.watch.assets.fonts], function(event, cb) {
        gulp.start('assets:fonts');
    });

    watch([path.watch.assets.other], function(event, cb) {
        gulp.start('assets:other');
    });
});

//Clean build folder
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

//--------------------------------------------------


//Dev-build Task
gulp.task('build:dev', gulp.parallel(
    'pug_core',
    'js_core',
    'sass_core',
    'assets:img',
    'assets:fonts',
    'assets:other'
));

//Prod-build Task
gulp.task('build:prod', gulp.parallel(
    'pug_core:prod',
    'js_core:prod',
    'sass_core:prod',
    'assets:img:prod',
    'assets:fonts:prod',
    'assets:other:prod'
));

//Final Task
gulp.task('dev', gulp.series('clean', 'build:dev', 'webserver', 'watch'));
gulp.task('prod', gulp.series('clean', 'build:prod', 'webserver'));