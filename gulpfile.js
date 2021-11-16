var { src, dest, watch, series } = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('cssnano')
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var avif = require('gulp-avif');

function css(done) {
    src('src/scss/*.scss')
        .pipe( sourcemaps.init())
        .pipe( sass({outputStyle:'expanded'}).on('error', sass.logError))
        .pipe( postcss([ autoprefixer(), cssnano() ]))
        .pipe( sourcemaps.write('.'))
        .pipe( dest("src/css") )

done();
}

function img (done) {
    src('imagenes/**/*')
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe(dest('src/img'));
done();
}

function imgwebp () {
    var options ={
        quality: 50
    }
    return src('imagenes/**/*.{jpg,png}')
    .pipe ( webp(options) )
    .pipe(dest('src/img'))   
}

function imgavif () {
    var options ={
        quality: 50
    }
    return src('imagenes/**/*.{jpg,png}')
    .pipe(avif(options))
    .pipe(dest('src/img'))
}

function see() {
    watch ('src/scss/**/*.scss', css);
    watch ('imagenes/**/*', img)
}


exports.css=css;
exports.see=see;
exports.img = img;
exports.imgwebp = imgwebp;
exports.imgavif = imgavif;
exports.default = series(img,css,see);


// const gulp = require('gulp');
// const sass = require('gulp-sass')(require('sass'));

// gulp.task('sass', function () {
//     return gulp.src('src/scss/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest("src/css"));
// });

// gulp.task('watch', function () {
//     return gulp.watch('src/scss/*.scss', gulp.series('sass'));
// });

