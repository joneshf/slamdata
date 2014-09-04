var qs = require('querystring')
  , config =
    { serverLocation: 'http://localhost'
    , serverPort: 8080
    , javaLocation: 'java'
    , sePort: 8080
    , seMountPath: '/'
    , seMongoURI: 'mongodb://localhost:27017'
    , seDatabase: 'test'
    }
  , search = qs.stringify(config)
  , index = './index.html'
  , defaultURL = index + '?' + search
  , screenshotDir = 'test/screenshots'
  , actions = require('../actions')
  ;

casper.test.setUp(function(done) {
    casper.start(defaultURL, function() {
        casper.viewport(1280, 720);
        casper.evaluate(function() {
            localStorage.clear();
        });
    }).run(done);
});

casper.test.begin('Changes in filesystem are isolated', 5, function(test) {
    casper.start(defaultURL, function() {
        actions.addNotebook(test);
    }).thenClick('#filesystem .tree-view_arrow', function() {
        // Make sure we only have the notebook and the add buttom.
        test.assertElementCount('#notebook .tabs .tab', 2);
    }).run(function() {
        test.done();
    })
});
