"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify  = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var run = require("run-sequence");
var include = require("posthtml-include");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var del = require("del");
var watch = require('gulp-watch');

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("htmlcopy", function () {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("build/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("build/img/*.{png,jpg}")
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.html"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", ["css"]);
  gulp.watch("build/*.html").on("change", server.reload);
  gulp.watch("build/js/*.js").on("change", server.reload);
  gulp.watch("source/*.html", ["htmlcopy"]);
});

gulp.task("html", function() {
  return gulp.src("*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("sprite", function() {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task('clean', function () {
    return del('build');
});

gulp.task("build", function(done) {
  run("clean", "copy", "css", "images", "webp", "sprite", "html", done);
});

gulp.task("clean", function() {
  return del("build");
});
