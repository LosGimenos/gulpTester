// REQUIRE
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const compass = require('gulp-compass');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');

// TASKS
gulp.task('scripts', function() {
  gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
    .pipe(plumber())
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

//STYLES COMPASS SASS TASKS
gulp.task('compass', function() {
  gulp.src('app/scss/styles.scss')
    .pipe(plumber())
    .pipe(compass({
      config_file: './config.rb',
      css: 'app/css',
      sass: 'app/scss',
      require: ['susy'],
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('app/css/'))
    .pipe(reload({ stream: true }));
});

//HTML TASK
gulp.task('html', function() {
  gulp.src('app/**/*.html');
});

//BROWSER SYNC TASKS
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './app'
    }
  });
});

// WATCH TASK
gulp.task('watch', function() {
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/scss/**/*.scss', ['compass']);
  gulp.watch('app/**/*.html', ['html']);
});

// DEFUALT TASKS
gulp.task('default', ['scripts']);
