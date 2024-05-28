import gulp from 'gulp';
import del from 'del';
import stylus from 'gulp-stylus';
import prefix from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import imagemin, { mozjpeg, optipng } from 'gulp-imagemin';

function clean(cb){
  const deletedPaths = del.sync(["source/dist/*"]);
  cb();
}

function cssMinify(){
  gulp.src("source/css/main.styl")
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest("source/dist/css"));
}

function cssPrefix(){
  gulp.src("source/dist/css/main.min.css")
    .pipe(prefix())
    .pipe(gulp.dest("source/dist/css"));
}

function jsMinify(){
  gulp.src("source/js/*.js")
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(uglify())
    .pipe(gulp.dest("source/dist/js"));
}

function imageMinify(){
  gulp.src(["source/images/*.jpeg*", "source/images/*.png"])
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(imagemin([
      mozjpeg({quality:70, progressive: true}),
      optipng()
    ]))
    .pipe(gulp.dest("source/dist/images"));
  gulp.src("source/images/*.svg").pipe(gulp.dest("source/dist/images"));
}

function buildAll(cb){
  cssMinify();
  jsMinify();
  imageMinify();
  cb();
}
function minImg(cb){
  imageMinify();
  cb();
}
function minCss(cb){
  cssMinify();
  cb();
}
function minJs(cb){
  jsMinify();
  cb();
}
function prefixCss(cb){
  cssPrefix();
  cb();
}

export default buildAll;
export {
  buildAll,
  clean,
  minImg,
  minCss,
  prefixCss,
  minJs
}