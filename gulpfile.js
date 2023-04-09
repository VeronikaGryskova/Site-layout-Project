var gulp = require("gulp"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass")(require("sass")),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync").create(),
  concatCss = require("gulp-concat-css");

function scss_style(done) {
  gulp
    .src("scss/**/default.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
  done();
}

function sync(done) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
  });
}

function browserReload(done) {
  browserSync.reload();
  done();
}

function watchFile() {
  gulp.watch("scss/**/*.scss", scss_style);
  gulp.watch("./**/*.html", browserReload);
}

gulp.task("default", gulp.parallel(sync, watchFile));
