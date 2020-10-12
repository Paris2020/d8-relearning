let theme_name = 'web/themes/moseki';

let gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    globbing = require('gulp-css-globbing'),
    sourcemaps = require('gulp-sourcemaps'),
    php = require('gulp-connect-php');


let root = theme_name + '/',
    scss = root + 'sass/',
    js = root + 'js/';

let styleWatchFiles = scss + '**/*.scss';
let cssSRC = root + 'css/styles.css';
let jsSRC = root + 'js/behaviors.js';


/*--- FUNCTIONS ---*/
function css() {
    return gulp.src([scss + 'styles.scss'])
        .pipe(globbing({ extensions: ['.scss'] }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(root));
}

function printCSS() {
    return gulp.src(cssSRC)
        .pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
        .pipe(gulp.dest(root));
}

function phpConnect() {
    return php.server({
        base: './',
        port: 8888,
        keepalive: true
    });
}

function watch() {
    browserSync.init({
        open: 'external',
        proxy: 'http://127.0.0.1:8888'
    });
    gulp.watch(styleWatchFiles, gulp.series([css,printCSS]));
    gulp.watch([root + 'styles.css']).on('change', browserSync.reload);
}

exports.css = css;
exports.printCSS = printCSS;
exports.watch = watch;
exports.phpConnect = phpConnect;


let build = gulp.parallel(watch, phpConnect);
gulp.task('default', build);
