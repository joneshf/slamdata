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

casper.test.begin('Content type is correct for SQL', 7, function(test) {
    casper.start(defaultURL, function() {
        actions.addNotebook(test);
        actions.addBlock('SQL', test);
    }).then(function() {
        casper.sendKeys( '#notebook .tabs-content .content .actual-content .block textarea'
                       , "select * from zips where city <> 'ABC%' limit 10"
                       );
        casper.capture(screenshotDir + '/evaled_sql_before_send.png');
        casper.waitForResource('data/fs/Untitled1/out0.json', function() {
          casper.capture(screenshotDir + '/evaled_sql_after_send.png');
        })
    }).run(function() {
        test.done();
    })
});
