const gulp = require('gulp'),
      inject = require('gulp-inject'),
      webserver = require('gulp-webserver'),
      htmlclean = require('gulp-htmlclean'),
      cleanCSS = require('gulp-clean-css'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify-es').default,
      gutil = require('gulp-util'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      changed = require('gulp-changed'),
      imagemin = require('gulp-imagemin');

const paths = {
  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcCSS: 'src/**/*.scss',
  srcJS: 'src/**/*.js',
  srcIMG: 'src/**/*.+(png|jpg|gif)',

  tmp: 'tmp',
  tmpIndex: 'tmp/index.html',
  tmpCSS: 'tmp/**/*.css',
  tmpJS: 'tmp/**/*.js',
  tmpIMG: 'tmp/**/*.+(png|jpg|gif)',

  dist: 'dist',
  distIndex: 'dist/index.html',
  distCSS: 'dist/**/*.css',
  distJS: 'dist/**/*.js',
  distIMG: 'dist/**/*.+(png|jpg|gif)'
};

gulp.task('default', ['watch']);

gulp.task('html', () => {
  return gulp.src(paths.srcHTML)
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('sass', () => {
  return gulp.src(paths.srcCSS)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('js', () => {
  return gulp.src(paths.srcJS)
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('img', () => {
  return gulp.src(paths.srcIMG)
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('copy', ['html', 'sass', 'js', 'img']);

gulp.task('inject', ['copy'], () => {
  const css = gulp.src(paths.tmpCSS);
  const js = gulp.src(paths.tmpJS);
  return gulp.src(paths.tmpIndex)
    .pipe(inject( css, { relative: true } ))
    .pipe(inject( js, { relative: true } ))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('serve', ['inject'], () => {
  return gulp.src(paths.tmp)
    .pipe(webserver({
      port: 3000,
      livereload: true
    }));
});

gulp.task('watch', ['serve'], () => {
  gulp.watch(paths.srcCSS, ['sass']);
  gulp.watch(paths.src, ['inject']);
});

gulp.task('html:dist', () => {
  return gulp.src(paths.srcHTML)
    .pipe(htmlclean())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('css:dist', () => {
  return gulp.src(paths.srcCSS)
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('js:dist', () => {
  return gulp.src(paths.srcJS)
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(paths.dist));
});

gulp.task('img:dist', () => {
  return gulp.src(paths.srcIMG)
    .pipe(changed(paths.distIMG))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('copy:dist', ['html:dist', 'css:dist', 'js:dist', 'img:dist']);

gulp.task('inject:dist', ['copy:dist'], () => {
  const css = gulp.src(paths.distCSS);
  const js = gulp.src(paths.distJS);
  return gulp.src(paths.distIndex)
    .pipe(inject( css, { relative:true } ))
    .pipe(inject( js, { relative:true } ))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['inject:dist']);
