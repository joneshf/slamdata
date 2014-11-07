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
  ;

casper.test.setUp(function(done) {
    casper.start(defaultURL, function() {
        casper.viewport(1280, 720);
        casper.evaluate(function() {
            localStorage.clear();
        });
    }).run(done);
});

casper.test.begin('SQL run button evaluates query', 6, function(test) {
    casper.start(defaultURL, function() {
        actions.addNotebook(test);
        actions.addBlock('SQL', test);
    }).then(function() {
        casper.capture(screenshotDir + '/sql_block_label_before_blur.png');
        casper.sendKeys( '#notebook .tabs-content .content .actual-content .block textarea'
                       , 'select * from foo limit 10'
                       );
        casper.click('#notebook .tabs-content .content .actual-content .block .block-toolbar .button-bar .left [title="Run"]');
        casper.waitForResource('data/fs/Untitled.nb/out0', function() {});
    }).run(function() {
        test.done();
    })
});
