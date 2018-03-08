const path = require('path');

const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');
const rename = require('gulp-rename');

const conf = require('../conf/gulp.conf');

gulp.task('clean', clean);
gulp.task('other', other);
gulp.task('templates', templates);
gulp.task('webconfig', webconfig);

function clean() {
  return del([conf.paths.dist, conf.paths.tmp]);
}

function other() {
  const fileFilter = filter(file => file.stat.isFile());

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{scss,ts,html,release.js}'),
    path.join(`!${conf.paths.src}`, '/**/images/**/*'),
    path.join(`!${conf.paths.src}`, '/**/styles/**/*')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.dist));
}

function templates() {
  const fileFilter = filter(file => file.stat.isFile());

  return gulp.src([
    path.join(`${conf.paths.src}`, '/**/templates/**/*'),
    path.join(`${conf.paths.src}`, '/**/images/newsbg.jpg')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.dist));
}

function webconfig() {
  return gulp.src([
    path.join(`${conf.paths.src}`, '/**/web.config.release.js')
  ])
    .pipe(rename('web.config.js'))
    .pipe(gulp.dest(conf.paths.dist));
}
