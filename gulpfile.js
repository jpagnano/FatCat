(function() {
  var $, gulp, manifest, mergeStream, runSequence, shelljs;

  gulp = require('gulp');

  shelljs = require('shelljs');

  mergeStream = require('merge-stream');

  runSequence = require('run-sequence');

  manifest = require('./package.json');

  $ = require('gulp-load-plugins')();

  gulp.task('clean', function() {
    shelljs.rm('-rf', './app.nw/build');
    return shelljs.rm('-rf', './app.nw/dist');
  });

  ['win32', 'osx64', 'linux32', 'linux64'].forEach(function(platform) {
    return gulp.task('build:' + platform, function() {
      if (process.argv.indexOf('--toolbar') > 0) {
        shelljs.sed('-i', '"toolbar": false', '"toolbar": true', './app.nw/package.json');
      }
      return gulp.src('./app.nw/**').pipe($.nodeWebkitBuilder({
        platforms: [platform],
        version: '0.12.3',
        winIco: process.argv.indexOf('--noicon') > 0 ? void 0 : './app.nw/assets/icon.ico',
        macIcns: './app.nw/assets/icon.png',
        macZip: true,
        macPlist: {
          NSHumanReadableCopyright: 'jpagnano.com',
          CFBundleIdentifier: 'com.jpagnano.fcqueue'
        }
      })).on('end', function() {
        if (process.argv.indexOf('--toolbar') > 0) {
          return shelljs.sed('-i', '"toolbar": true', '"toolbar": false', './app.nw/package.json');
        }
      });
    });
  });

  gulp.task('sign:osx64', ['build:osx64'], function() {
    shelljs.exec('codesign -v -f -s "jpagnano apps" ./app.nw/build/FatCatQueue/osx64/FatCatQueue.app/Contents/Frameworks/*');
    shelljs.exec('codesign -v -f -s "jpagnano apps" ./app.nw/build/FatCatQueue/osx64/FatCatQueue.app');
    shelljs.exec('codesign -v --display ./app.nw/build/FatCatQueue/osx64/FatCatQueue.app');
    return shelljs.exec('codesign -v --verify ./app.nw/build/FatCatQueue/osx64/FatCatQueue.app');
  });

  gulp.task('pack:osx64', ['sign:osx64'], function() {
    shelljs.mkdir('-p', './app.nw/dist');
    shelljs.rm('-f', './app.nw/dist/FatCatQueue.dmg');
    return gulp.src([]).pipe(require('gulp-appdmg')({
      source: './app.nw/assets/dmg.json',
      target: './app.nw/dist/FatCatQueue.dmg'
    }));
  });

  gulp.task('pack:win32', ['build:win32'], function() {
    return shelljs.exec('makensis ./app.nw/assets/installer.nsi');
  });

  gulp.task('pack:all', function(callback) {
    return runSequence('pack:osx64', 'pack:win32', 'pack:linux32:deb', 'pack:linux64:deb', callback);
  });

  gulp.task('run:osx64', ['build:osx64'], function() {
    return shelljs.exec('open ./app.nw/build/FatCatQueue/osx64/FatCatQueue.app');
  });

  gulp.task('open:osx64', function() {
    return shelljs.exec('open ./app.nw/build/FatCatQueue/osx64/FatCatQueue.app');
  });

  gulp.task('release', ['pack:all'], function(callback) {
    return gulp.src('./app.nw/dist/*').pipe($.githubRelease({
      draft: true,
      manifest: manifest
    }));
  });

  gulp.task('default', ['pack:all']);

}).call(this);
