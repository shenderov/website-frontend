let gulp = require('gulp');
let minifyCSS = require('gulp-csso');
let concat = require('gulp-concat');
let sass = require('gulp-sass');
let minifyHtml = require("gulp-minify-html");
sass.compiler = require('node-sass');
let browserSync = require('browser-sync').create();
let inject = require('gulp-inject');
let npmDist = require('gulp-npm-dist');
let rename = require('gulp-rename');
let clean = require('gulp-rimraf');
let filter = require('gulp-filter');
let uglify = require('gulp-uglify-es').default;
let ngAnnotate = require('gulp-ng-annotate');
let fs = require('fs');
let jsonFormat = require('gulp-json-format');
let jsonModify = require('gulp-json-modify');

let paths = {
    html: 'src/**/*.html',
    sass: 'src/sass/**/*.sass',
    js: ['src/js/**/*.js', '!*.min.js'],
    config: "src/config/**",
};

let excludes = ['**/**/core.js', '**/**/jquery.slim.min.js', '**/**/index.js'];

gulp.task('copy:config', function() {
    return gulp.src(paths.config)
        .pipe(gulp.dest('dist/config'))
});

gulp.task('copy:build', function() {
    let packageJson = JSON.parse(fs.readFileSync('./package.json').toString());
    return gulp.src('src/build.json.template')
        .pipe(jsonModify({ key: ['build.name'], value: packageJson.name }))
        .pipe(jsonModify({ key: ['build.description'], value: packageJson.description }))
        .pipe(jsonModify({ key: ['build.author'], value: packageJson.author }))
        .pipe(jsonModify({ key: ['build.version'], value: packageJson.version }))
        .pipe(rename('build.json'))
        .pipe(jsonFormat(4))
        .pipe(gulp.dest('dist/'))
});

gulp.task('copy:libs', function() {
    return gulp.src(npmDist({
        excludes: excludes
    }), {base:'./node_modules'})
        .pipe(rename(function(path) {
            path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
        }))
        .pipe(gulp.dest('dist/libs'));
});

gulp.task('html', function(){
    let sources = gulp.src(['dist/js/**/*.js', 'dist/css/**/*.css'], {read: false});
    let libraries = gulp.src(['dist/libs/**/*.js', 'dist/libs/**/*.css', '!dist/libs/**/source/*.css', '!dist/libs/**/source/**/*.css'], {read: false});
    return gulp.src(paths.html)
        .pipe(inject(libraries, { ignorePath: 'dist/', addRootSlash: false, name: 'libraries' }))
        .pipe(inject(sources, { ignorePath: 'dist/', addRootSlash: false }))
        .pipe(filter(function(a){ return a.stat && a.stat.size }))
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist'))
});

gulp.task('html-dev', function(){
    let sources = gulp.src(['dist/js/**/*.js', 'dist/css/**/*.css'], {read: false});
    let libraries = gulp.src(['dist/libs/**/*.js', 'dist/libs/**/*.css', '!dist/libs/**/source/*.css', '!dist/libs/**/source/**/*.css'], {read: false});
    return gulp.src(paths.html)
        .pipe(inject(libraries, { ignorePath: 'dist/', addRootSlash: false, name: 'libraries' }))
        .pipe(inject(sources, { ignorePath: 'dist/', addRootSlash: false }))
        .pipe(gulp.dest('dist'))
});

gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(filter(function(a){ return a.stat && a.stat.size }))
        .pipe(concat('style.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('sass-dev', function () {
    return gulp.src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(filter(function(a){ return a.stat && a.stat.size }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function(){
    return gulp.src(paths.js)
        .pipe(filter(function(a){ return a.stat && a.stat.size }))
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('js-dev', function(){
    return gulp.src(paths.js)
        .pipe(filter(function(a){ return a.stat && a.stat.size }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('watch', function() {
    browserSync.init({
        server: "dist"
    });
    gulp.watch(paths.config, gulp.series('copy:config')).on('change', browserSync.reload);
    gulp.watch(paths.sass, gulp.series('sass-dev')).on('change', browserSync.reload);
    gulp.watch(paths.js, gulp.series('js-dev')).on('change', browserSync.reload);
    gulp.watch(paths.html, gulp.series('html-dev')).on('change', browserSync.reload);
});

gulp.task('clean', function() {
    return gulp.src("dist/*", { read: false })
        .pipe(clean());
});

gulp.task('build', gulp.series('clean', 'copy:config', 'copy:build', 'copy:libs', 'js', 'sass', 'html'));
gulp.task('default', gulp.series('copy:config', 'copy:build', 'copy:libs', 'js-dev', 'sass-dev', 'html-dev'));