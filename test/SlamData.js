var qs = require('querystring')
  , config =
    { serverLocation: 'http://localhost'
    , serverPort: 8080
    , javaLocation: '/usr/bin/java'
    , sePort: 8080
    , seMountPath: '/'
    , seMongoURI: 'mongodb://localhost:27017'
    , seDatabase: 'test'
    }
  , search = qs.stringify(config)
  , index = './bin/browser/index.html'
  ;

casper.test.begin('SlamData layout is proper', 1, function(test) {
    // This suite should ensure that the basic layout
    // stays proper throughout any changes.
    casper.start(index + '?' + search, function() {
        test.assertTitle('SlamData', 'Title set properly');
    }).run(function() {
        test.done();
    });
});

casper.test.begin('Config is read properly', 9, function(test) {
    casper.start(index + '?' + search, function() {
        this.viewport(1280, 720).then(function() {
            this.capture('test/screenshots/empty.png');
        });
    }).thenClick('#menu-button-Edit', function() {
        this.capture('test/screenshots/edit_button.png');

        test.assertVisible('#menu-command-Settings', 'Settings command is visible');
    }).thenClick('#menu-command-Settings', function() {
        this.capture('test/screenshots/settings_command.png');

        test.assertVisible('#notebook-Settings', 'Settings notebook visible');
    }).thenClick('#notebook-Settings', function() {
        this.capture('test/screenshots/notebook_settings_slamengine.png');

        test.assertField('slamengine-port', config.sePort.toString(), '`slamengine-port` should match `config.sePort`');
        test.assertField('mongodb-path', config.seMountPath, '`mongodb-path` should match `config.seMountPath`');
        test.assertField('mongodb-mongouri', config.seMongoURI, '`mongodb-mongouri` should match `config.seMongoURI`');
        test.assertField('mongodb-database', config.seDatabase, '`mongodb-database` should match `config.seDatabase`');
        test.assertField('java-binary', config.javaLocation, '`java-binary` should match `config.javaLocation`');
    }).thenClick('#settings-SlamData', function() {
        this.capture('test/screenshots/notebook_settings_slamdata.png');

        test.assertField('server-location', config.serverLocation, '`server-location` should match `config.serverLocation`');
        test.assertField('server-port', config.serverPort.toString(), '`server-port` should match `config.serverPort`');
    }).run(function() {
        test.done();
    });
});
