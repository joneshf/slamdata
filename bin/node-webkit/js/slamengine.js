var spawn = require('child_process').spawn
  , path = require('path')
  , javaHome = process.env.JAVA_HOME || 'jre' // Use a local jre if java is not provided.
  , java = path.join(javaHome, 'bin', 'java')
  , se = spawn(java, ['-jar', 'jar/slamengine_2.10-0.1-SNAPSHOT-one-jar.jar', '/home/joneshf/.config/slamdata/config.json'])
  , gui = require('nw.gui')
  ;

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
