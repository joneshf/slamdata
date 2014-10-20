var qs = require('querystring')
  , config =
    { serverLocation: 'http://localhost'
    , serverPort: 20223
    , javaLocation: 'java'
    , sePort: 20223
    , seMountPath: '/'
    , seMongoURI: 'mongodb://localhost:27017'
    , seDatabase: 'test'
    }
  , search = qs.stringify(config)
  , index = './index.html'
  , defaultURL = index + '?' + search
  , screenshotDir = 'test/screenshots'
  , actions = require('../actions')
  , utils = require('utils')
  ;

casper.test.setUp(function(done) {
    casper.start(defaultURL, function() {
        casper.viewport(1280, 720);
        casper.evaluate(function() {
            localStorage.clear();
        });
    }).run(done);
});

casper.test.begin('Renaming a notebook', 10, function(test) {
    casper.start(defaultURL, function() {
        actions.addNotebook(test);
        actions.addBlock('SQL', test);
        actions.firstSaveNotebook(test);
        test.skip(3);
    // }).then(function() {
    //     var req = casper.evaluate(function() {
    //         return __utils__.sendAJAX('http://localhost:20223/metadata/fs/Untitled.nb/');
    //     });
    //     test.assert(JSON.parse(req).children.length > 1, JSON.stringify(req, null, 4));
    // }).then(function() {
    //     actions.renameNotebook('Foo', test)
    // }).then(function() {
    //     var req = casper.evaluate(function() {
    //         return __utils__.sendAJAX('http://localhost:20223/metadata/fs/Untitled.nb/');
    //     });
    //     test.assert(JSON.parse(req).children.length === 0, JSON.stringify(req, null, 4));
    }).run(function() {
        test.done();
    })
});
