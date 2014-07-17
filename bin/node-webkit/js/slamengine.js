'use strict';

// Requires.
var gui = require('nw.gui')
  , guiWindow = gui.Window.get()
  , path = require('path')
  , spawn = require('child_process').spawn
  , sdConfigName = 'slamdata-config.json'
  , seConfigName = 'slamengine-config.json'
  , seJar = path.join('jar', 'slamengine_2.10-0.1-SNAPSHOT-one-jar.jar')
  ;

// Find the config dir for each os.
if (process.platform === 'darwin') {
  var configDir = path.join(process.env.HOME,  'Library', 'Preferences', 'slamdata');
} else if (process.platform === 'linux') {
  var xdgConfigHome = process.env.XDG_CONFIG_HOME || path.join(process.env.HOME, '.config')
    , configDir = path.join(xdgConfigHome, 'slamdata')
    ;
} else if (process.platform === 'win32') {
  var configDir = path.join(process.env.LOCALAPPDATA, 'slamdata');
} // Should we do something for some other os, or do we not care?

var sdConfigFile = path.join(configDir, sdConfigName)
  , seConfigFile = path.join(configDir, seConfigName)
  , sdConfig = require(sdConfigFile)
  // Grab the java location from the config file.
  , java = sdConfig['node-webkit'].java
  // Start up slamengine.
  , se = spawn(java, ['-jar', seJar, seConfigFile])
  ;

guiWindow.showDevTools();

window.history.replaceState('', '',
  '?serverLocation=' + sdConfig['server'].location +
  '&serverPort=' + sdConfig['server'].port);

guiWindow.on('close', function() {
  se.kill();
  this.close(true);
});

guiWindow.on('new-win-policy', function(frame, url, policy) {
  gui.Shell.openExternal(url);
  policy.ignore();
});

se.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

se.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});
