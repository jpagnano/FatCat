var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
  files: './app.nw/**',
  buildDir: './build',
  cacheDir: './cache',
  zip: true,
  platform: ['osx32', 'osx64', 'win32', 'win64'],
  version: '0.12.3'
});

nw.on('log', console.log);

nw.build().then(function () {
   console.log('all done!');
}).catch(function (error) {
    console.error(error);
});
