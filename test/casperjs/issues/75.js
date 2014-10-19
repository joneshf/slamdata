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

casper.test.begin('Save notebook button', 7, function(test) {
    casper.start(defaultURL, function() {
        actions.addNotebook(test);
    }).then(function() {
        var disabled = casper.getElementAttribute('#notebook .content.active [title="Save"]', 'disabled');
        test.assertNot(disabled, 'new notebooks have save button enabled');
    }).then(function() {
        casper.capture(screenshotDir + '/notebook_save_before_first_save.png');
        actions.firstSaveNotebook(test);
        casper.waitForResource('data/fs/Untitled.nb/index.nb', function() {
            var disabled = casper.getElementAttribute('#notebook .content.active [title="Save"]', 'disabled');
            test.assertEquals(disabled, 'true', 'saved notebooks have save button disabled');
        })
    }).run(function() {
        test.done();
    })
});
