var rc = require('rc')
var packageJson = require('../package.json')
var minimist = require('minimist')
var argv = require('./argv.js')

var defaults = {
	debug: true,
	appName: packageJson.name,
	logLevel: 'info',
	height: packageJson.window.min_height,
	width: packageJson.window.min_width,
	fullscreen: packageJson.window.fullscreen,
	nw: packageJson.dependencies.nw
}

module.exports = rc(packageJson.name, defaults, minimist(argv.get()))
