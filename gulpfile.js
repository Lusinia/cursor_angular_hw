"use strict";
var gulp = require("gulp"),
    del = require("del"),
    less = require("gulp-less"),
    path = require("path"),
    concat = require("gulp-concat"),
    spritesmith = require("gulp-spritesmith"),
    gulpif = require("gulp-if"),
    concatCss = require("gulp-concat-css"),
    csso = require("gulp-csso"),
    jshint = require("gulp-jshint"),
    autoprefixer = require("gulp-autoprefixer"),
    templateCache = require("gulp-angular-templatecache"),
    minifyHtml = require("gulp-minify-html"),
    uglify = require("gulp-uglify"),
    pump = require("pump"),
    series = require("gulp-sequence"),
    sourcemaps = require("gulp-sourcemaps"),
    babel = require("gulp-babel"),
    browserSync = require("browser-sync").create();


gulp.task("clean", function (cb) {
    return del(["./src/js/es5", "./build" ], cb);
});

gulp.task("css", function () {
    return gulp.src("./src/styles/less/main.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./src/styles/css"))
        .pipe(browserSync.stream())

});

gulp.task("concatCss", ["css", "sprite"], function () {
    return gulp.src(["./src/styles/libs/*.css", "./src/styles/css/*.css"])
        .pipe(concatCss("style.css"))
        .pipe(autoprefixer({browsers: ["last 3 version", "> 1%", "ie 8", "ie 9", "Opera 12.1"]}))
        .pipe(csso())
        .pipe(gulp.dest("./build/styles"))

});

gulp.task("es6", function () {
    return gulp.src("./src/js/es6/**/*.js")
        .pipe(jshint(".jshintrc"))
        .pipe(jshint.reporter("jshint-stylish", {beep: true}))
        .pipe(babel({
            "presets": ["es2015"]
        }))

        .pipe(gulp.dest("./src/js/es5"))
});

gulp.task("js", ["es6", "templateCache"], function (cb) {
    pump([
            gulp.src([
                "./src/js/libs/*.js",
                "./src/js/es5/utils/utils.js",
                "./src/js/es5/app.js",
                "./src/temp/*.js",
                "./src/js/es5/factories/*.js",
                "./src/js/es5/controllers/*.js"
            ]),
            sourcemaps.init(),
            concat("app.js"),
            uglify(),
            sourcemaps.write(),
            gulp.dest("./build/js"),

        ], cb
    );
});
gulp.task("sprite", function () {
    return gulp.src(["./src/img/*.png"])
        .pipe(spritesmith({
            imgName: "sprite.png",
            styleName: "sprite.css",
            imgPath: "../img/sprite.png"
        }))
        .pipe(gulpif("*.png", gulp.dest("./build/img/")))
        .pipe(gulpif("*.css", gulp.dest("./src/styles/css")));
});

gulp.task("templateCache", function () {
    return gulp.src("src/partials/**/*.html")
        .pipe(minifyHtml())
        .pipe(templateCache("templates.js", {
            module: "shopApp",
            standAlone: false,
            root: "../partials/"
        }))
        .pipe(gulp.dest("src/temp"));
});

gulp.task("copy", function () {
    return gulp.src(["./src/img/**/*.jpg", "./src/img/bg/*.png", "./src/img/*.jpg"])
        .pipe(gulp.dest("./build/img"))
});

gulp.task("index", function () {
    del(["./src/temp", "./src/styles/css"]);
    return gulp.src("./index.html")
        .pipe(gulp.dest("./build"))


});

gulp.task("server", function () {
    browserSync.init({
        open: true,
        server: "./build"
    });
    browserSync.watch([
        "./build/index.html", "./build/styles/*.css", "./build/js/app.js"
    ]).on("change", browserSync.reload);
});

gulp.task("watch", function () {
    gulp.watch(["./index.html"], ["index"]);
    gulp.watch(["./src/img/**/*.jpg", "./src/img/bg/*.png", "./src/img/*.jpg"], ["copy"]);
    gulp.watch(["./src/js/es6/**/*.js", "./src/partials/*.html"], ["js"]);
    gulp.watch(["./src/styles/less/*.less", "./src/img/*.png"], ["concatCss"]);
});

gulp.task("build", series("clean", "js", "copy", "concatCss", "index"));
gulp.task("default", series("build", ["server", "watch"]));
