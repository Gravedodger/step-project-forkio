
const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

const scssFiles = ['./src/scss/**/*.scss'];
const jsFiles = ['./src/js/**/*.js'];


function styles() {
    return gulp.src(scssFiles).
    pipe(concat('main.css')).
    pipe(sass()).
    pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    })).
    pipe(cleanCSS({
        level: 2
    })).
    pipe(gulp.dest('./src/dist')).
    pipe(browserSync.stream());
}


function scripts() {
    return gulp.src(jsFiles).
    pipe(concat('script.js')).
    pipe(uglify({
        toplevel: true
    })).
    pipe(gulp.dest('./src/dist')).
    pipe(browserSync.stream());
}


function imageSquash() {
    return gulp.src('./src/img/**/*.{png, svg, jpeg}').
    pipe(imagemin()).
    pipe(gulp.dest('./src/dist/images-minified')).
    pipe(browserSync.stream());
}


function clean() {
    return del(['dist/'])
}


function watch() {
    browserSync.init ({
        server: {
            baseDir: './'
        }
    });
    gulp.watch(scssFiles, styles);
    gulp.watch(jsFiles, scripts);
    gulp.watch('./*.html').on('change', browserSync.reload);
}


gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('imageSquash', imageSquash);
gulp.task('watch', () => {gulp.watch('./src/img/**/*.{jpeg, png, svg}', imageSquash)});
gulp.task('default', gulp.series('imageSquash', 'watch'));
gulp.task('build', gulp.series(clean, gulp.parallel(styles,scripts)));
gulp.task('dev', gulp.series('build', 'watch'));
