let theme_name = 'moseki';

let gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    cleaCSS = require('gulp-clean-css'),
    lineec = require('gulp-line-ending-corrector');


let root = '../' + theme_name + '/',
    scss = root + 'sass/',
    css = root + 'css/';

let twigWatchFiles =  root + '**/*.html.twig',
    styleWatchFiles = scss + '**/*.scss';


function sassNew() {
    return gulp.src([scss + 'styles.scss'])
           .pipe(sass({ outputStyle: 'expanded'}).on('error', sass.logError))
           .pipe(autoprefixer('last 2 versions'))
           .pipe(lineec())
           .pipe(gulp.dest(css));
}

function watch() {
    browserSync.init({
        open: 'external',
        proxy: 'http://d8-learning.dd:8083',
        port: 8888
    });
    gulp.watch(styleWatchFiles, gulp.series(['sassNew']));
    gulp.watch([twigWatchFiles, css + 'styles.css']).on('change', browserSync.reload);
}

exports.sassNew = sassNew;
exports.watch = watch;

let build = gulp.parallel(watch);
gulp.task('default', build);
