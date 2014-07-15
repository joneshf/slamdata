'use strict';

// Requires.
var fs = require('fs')
  , gui = require('nw.gui')
  , guiWindow = gui.Window.get()
  , path = require('path')
  , spawn = require('child_process').spawn
  , sdConfigName = 'slamdata-config.json'
  , seConfigName = 'slamengine-config.json'
  ;

// We need to resolve all of our environment variables.
var jre = path.join(path.dirname(process.execPath), 'jre')
  , seJar = path.join('jar', 'slamengine_2.10-0.1-SNAPSHOT-one-jar.jar')
  ;

// Find the config dir for each os.
if (process.platform === 'darwin') {
  var sdConfig = path.join(process.env.HOME,  'Library', 'Preferences', 'slamdata', sdConfigName);
  var seConfig = path.join(process.env.HOME,  'Library', 'Preferences', 'slamdata', seConfigName);
} else if (process.platform === 'linux') {
  var configDir = process.env.XDG_CONFIG_HOME || path.join(process.env.HOME, '.config')
    , sdConfig = path.join(configDir, 'slamdata', sdConfigName)
    , seConfig = path.join(configDir, 'slamdata', seConfigName)
    ;
} else if (process.platform === 'win32') {
  var sdConfig = path.join(process.env.LOCALAPPDATA, 'slamdata', sdConfigName);
  var seConfig = path.join(process.env.LOCALAPPDATA, 'slamdata', seConfigName);
} // Should we do something for some other os, or do we not care?

// Try the local jre first, it exists for a reason.
if (fs.existsSync(jre)) {
  var java = path.join(jre, 'bin', 'java');
} else {
  var java = require(sdConfig)['node-webkit'].java;
}

var se = spawn(java, ['-jar', seJar, seConfig]);

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
