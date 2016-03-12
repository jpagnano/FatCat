var gui = require('nw.gui');
var win = gui.Window.get();

var platform = require('./js/components/platform.js');
var updater = require('./js/components/updater.js');
var menus = require('./js/components/menus.js');
var settings = require('./js/components/settings.js');
var windowBehaviour = require('./js/components/windowBehavior.js');
var dispatcher = require('./js/components/dispatcher.js');

// Ensure there's an app shortcut for toast notifications to work on Windows
if (platform.isWindows) {
  gui.App.createShortcut(process.env.APPDATA + "\\Microsoft\\Windows\\Start Menu\\Programs\\FatCatQueue.lnk");
}

// Add dispatcher events
dispatcher.addEventListener('win.alert', function(data) {
  data.win.window.alert(data.message);
});

dispatcher.addEventListener('win.confirm', function(data) {
  data.callback(data.win.window.confirm(data.message));
});

// Window state
windowBehaviour.restoreWindowState(win);
windowBehaviour.bindWindowStateEvents(win);

// Check for update
if (settings.checkUpdateOnLaunch) {
  updater.checkAndPrompt(gui.App.manifest, win);
}

// Run as menu bar app
if (settings.asMenuBarAppOSX) {
  win.setShowInTaskbar(false);
  menus.loadTrayIcon(win);
}

// Load the app menus
menus.loadMenuBar(win)
if (platform.isWindows) {
  menus.loadTrayIcon(win);
}

// Adjust the default behaviour of the main window
windowBehaviour.set(win);
windowBehaviour.setNewWinPolicy(win);

// Add a context menu
menus.injectContextMenu(win, window, document);

// Reload the app periodically until it loads
var reloadIntervalId = setInterval(function() {
  if (win.window.navigator.onLine) {
    clearInterval(reloadIntervalId);
  } else {
    win.reload();
  }
}, 10 * 1000);
