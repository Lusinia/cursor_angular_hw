"use strict";
var gulp = require("gulp"),
    del = require("del"),
    less = require("gulp-less"),
    path = require("path"),
    concat = require("gulp-concat"),
    concatCss = require("gulp-concat-css"),
    csso = require("gulp-csso"),
    jshint = require("gulp-jshint"),
    autoprefixer = require("gulp-autoprefixer"),
    uglify = require("gulp-uglify"),
    pump = require("pump"),
    series = require("gulp-sequence"),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    browserSync = require("browser-sync").create();


gulp.task("clean", function (cb) {
    return del(['./src/js/es5', "./build"], cb);
});

gulp.task("css", function () {
    return gulp.src("./src/styles/less/main.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(concatCss("style.css"))
        .pipe(autoprefixer({browsers: ["last 3 version", "> 1%", "ie 8", "ie 9", "Opera 12.1"]}))
        .pipe(csso())
        .pipe(gulp.dest("./build/styles"))
        .pipe(browserSync.stream())

});


gulp.task("es6", function () {
    return gulp.src("./src/js/es6/**/*.js")
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish', {beep: true}))
        .pipe(babel({
            'presets': ['es2015']
        }))

        .pipe(gulp.dest("./src/js/es5"))
});

gulp.task("js", ['es6'], function (cb) {
    pump([
            gulp.src(["./src/js/libs/*.js", "./src/js/es5/app.js", "./src/js/es5/factories/*.js", "./src/js/es5/controllers/*.js"]),
            sourcemaps.init(),
            concat('app.js'),
            uglify(),
            sourcemaps.write(),
            gulp.dest("./build/js")
        ], cb
    )
    ;
});

gulp.task("copy", function () {
    return gulp.src("./src/img/*.*")
        .pipe(gulp.dest("./build/img"))
});

gulp.task("index", function () {
    return gulp.src("./index.html")
        .pipe(gulp.dest("./build"))
});
gulp.task("html", function () {
    return gulp.src("./src/partials/*.html")
        .pipe(gulp.dest("./build/partials"))
});

gulp.task("server", function () {
    browserSync.init({
        open: true,
        server: "./build"
    });
    browserSync.watch([
        "./build/partials/*.html", './build/index.html', './build/styles/*.css', './build/js/es6/app.js'
    ]).on("change", browserSync.reload);
});

gulp.task('watch', function () {
    gulp.watch(['./index.html'], ['index']);
    gulp.watch(['./src/partials/*.html'], ['html']);
    gulp.watch(['./src/img/*.*'], ['copy']);
    gulp.watch(['./src/js/es6/**/*.js'], ['js']);
    gulp.watch(['./src/styles/less/*.less'], ['css']);
});

gulp.task('build', series('clean', 'js', 'copy', 'css', 'index', 'html'));
gulp.task('default', series('build', ['server', 'watch']));
