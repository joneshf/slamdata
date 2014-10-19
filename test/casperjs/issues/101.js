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

casper.test.begin('SQL block label', 7, function(test) {
    casper.start(defaultURL, function() {
        actions.addNotebook(test);
        actions.addBlock('SQL', test);
    }).then(function() {
        casper.capture(screenshotDir + '/sql_block_label_before_blur.png');
        casper.sendKeys( '#notebook .tabs-content .content .actual-content .block textarea'
                       , 'select * from foo limit 10' // we have to force a new collection until SE does it by default.
                       );
        casper.waitForResource('data/fs/Untitled/out0', function() {
            casper.capture(screenshotDir + '/sql_block_label_after_blur.png');
            test.assertSelectorHasText('#notebook .content.active .block-SQL .block-label', ':=')
        })
    }).run(function() {
        test.done();
    })
});
