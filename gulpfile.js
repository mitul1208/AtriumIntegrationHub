// get the dependencies
var childProcess = require('child_process');
var electron     = require('electron-prebuilt');
var gulp         = require('gulp');
var jetpack      = require('fs-jetpack');
var usemin       = require('gulp-usemin');
var uglify       = require('gulp-uglify');
var htmlmin      = require('gulp-htmlmin');
var cleanCss     = require('gulp-clean-css');
var rev          = require('gulp-rev');
var gutil        = require('gulp-util');
var pump         = require('pump');
var ngAnnotate   = require('gulp-ng-annotate');
const jshint     = require('gulp-jshint');

var projectDir   = jetpack;
var appDir       = projectDir.cwd('./app');
var buildDir     = projectDir.cwd('./build');
var distDir      = projectDir.cwd('./dist');

// create the gulp task
gulp.task('run', function () {
  childProcess.spawn(electron, ['--debug=9222','./app'], { stdio: 'inherit' });
});
gulp.task('run-build', function () {
  childProcess.spawn(electron, ['--debug=9222','./build'], { stdio: 'inherit' });
});
gulp.task('run-dist', function () {
  childProcess.spawn('./dist/windows/atrium-web-server.exe', { stdio: 'inherit' });
});

gulp.task('lint', function() {
    return gulp.src([appDir.path('components/**/*.js'), appDir.path('shared/**/*.js'), appDir.path('*.js')])
      .pipe(jshint({ asi: true, esversion: 6 }))
      .pipe(jshint.reporter(function (res) {
        var len = res.length;
        var str = "";
        res.forEach(function (r) {
          var file = r.file;
          var err = r.error;
          str += file + ": line " + err.line + ", col " +
            err.character + ", " + err.reason + "\n";
        });
        if (str) {
          process.stdout.write(str + "\n" + len + " error" +
            ((len === 1) ? "" : "s") + "\n");
        }
      }));
});

gulp.task('clean', function (callback) {
    return buildDir.dirAsync('.', { empty: true });
});
gulp.task('clean-dist', function () {
    return distDir.dirAsync('.', { empty: true });
});

gulp.task('copy', ['clean'], function () {
    return projectDir.copyAsync('app', buildDir.path(), {
        overwrite: true, matching: [
            'main.js',
            '*.ico',
            '**/res/*',
            '**/img/*',
            '**/font/*',
            'package.json'
       ]
    });
});

gulp.task('build', ['copy', 'lint'], function() {
  return gulp.src('./app/**/*.html')
    .pipe(usemin({
      css: [ rev ],
      html: [ function () {return htmlmin({ removeComments: true, collapseWhitespace: true });} ],
      js: [ function () {return ngAnnotate();},
            function () {return rev();} ]
    //   inlinejs: [ uglify() ],
    //   inlinecss: [ cleanCss(), 'concat' ]
    }))
    .pipe(gulp.dest(buildDir.path()));
});

gulp.task('uglify', ['build'], function() {
  return gulp.src('./build/js/*.js')
    .pipe(ngAnnotate())
    // .pipe(uglify())
    .pipe(gulp.dest(buildDir.path() + "/js"));
});

var release_windows = require('./build.windows');
var os = require('os');
gulp.task('build-electron', ['uglify'], function () {
     switch (os.platform()) {
         case 'darwin':
         // execute build.osx.js
         break;
         case 'linux':
         //execute build.linux.js
         break;
         case 'win32':
         return release_windows.build();
     }
});

gulp.task('build-installer', ['build-electron'], function () {
     switch (os.platform()) {
         case 'darwin':
         // execute build.osx.js
         break;
         case 'linux':
         //execute build.linux.js
         break;
         case 'win32':
         return release_windows.createInstaller();
     }
});
