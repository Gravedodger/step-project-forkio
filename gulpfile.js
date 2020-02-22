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
const jsFiles = ['./src/js/*.js'];

function styles() {
    return gulp.src(scssFiles).
    pipe(concat('main.css')).
    pipe(sass()).
    pipe(autoprefixer()).
    pipe(cleanCSS({level: 2})).
    pipe(gulp.dest('./dist')).
    pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(jsFiles).
    pipe(concat('script.js')).
    pipe(uglify()).
    pipe(gulp.dest('./dist')).
    pipe(browserSync.stream());
}

function image() {
    return gulp.src('./src/img/**/*.{png, svg, jpeg}')
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('./dist/images--optimized'));
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
gulp.task('image', image);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, image, gulp.parallel(styles,scripts)));
gulp.task('dev', gulp.series('build', 'watch'));