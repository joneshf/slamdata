'use strict';

// Requires.
var fjm = require('find-java-home')
  , fs = require('fs')
  , gui = require('nw.gui')
  , path = require('path')
  , spawn = require('child_process').spawn
  ;

// We need to resolve all of our environment variables.
var jre = path.join(path.dirname(process.execPath), 'jre')
  , seJar = path.join('jar', 'slamengine_2.10-0.1-SNAPSHOT-one-jar.jar')
  ;

// Find the config dir for each os.
if (process.platform === 'darwin') {
  var config = path.join(process.env.HOME,  'Library', 'Preferences', 'slamdata', 'config.json');
} else if (process.platform === 'linux') {
  var configDir = process.env.XDG_CONFIG_HOME || path.join(process.env.HOME, '.config')
    , config = path.join(configDir, 'slamdata', 'config.json')
    ;
} else if (process.platform === 'win32') {
  var config = path.join(process.env.LOCALAPPDATA, 'slamdata', 'config.json');
} // Should we do something for some other os, or do we not care?

// Try the local jre first, it exists for a reason.
if (fs.existsSync(jre)) {
  var java = path.join(jre, 'bin', 'java');
} else {
  var java = 'java';
}

var se = spawn(java, ['-jar', seJar, config]);

gui.Window.get().on('close', function() {
  se.kill();
  this.close(true);
});

se.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

se.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});
