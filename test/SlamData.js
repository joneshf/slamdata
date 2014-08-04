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
  , defaultURL = index + '?' + search
  , screenshotDir = 'test/screenshots'
  ;

casper.test.setUp(function(done) {
    casper.start(defaultURL, function() {
        this.evaluate(function() {
            localStorage.clear();
        });
    }).run(done);
});

casper.test.begin('SlamData layout is proper', 1, function(test) {
    // This suite should ensure that the basic layout
    // stays proper throughout any changes.
    casper.start(defaultURL, function() {
        test.assertTitle('SlamData', 'Title set properly');
    }).run(function() {
        test.done();
    });
});

casper.test.begin('Basic Notebook Functionality', 13, function(test) {
    var contentSelector = '#notebook .tabs-content .content'
      , blockSelector = contentSelector + ' ' + '.actual-content .block'
      , blockButtonBarSelector = blockSelector + ' ' + '.block-toolbar'
      , blockTypeSelector = blockButtonBarSelector + ' ' + '.block-type span'
      , tabSelector = '#notebook .tabs .tab'
      ;
    casper.start(defaultURL, function() {
        this.viewport(1280, 720);
    }).then(function() {
        // For a fresh notebook we should not have anything stored.
        // Make sure we only have the add button.
        test.assertElementCount(tabSelector, 1);
        // And, we don't have any notebooks in the content.
        test.assertDoesntExist(contentSelector, 'There is no notebook content');
    }).thenClick('#add-notebook', function() {
        // Make sure we added exactly one notebook.
        test.assertElementCount(tabSelector, 2);
        // Make sure we the notebook has an empty content.
        test.assertExists(contentSelector, 'The notebook has content');
        test.assertElementCount(contentSelector, 1);
        // Make sure there aren't any blocks in a new notebook.
        test.assertDoesntExist(blockSelector, 'There are no blocks');
    }).thenClick(contentSelector + ' ' + '.toolbar [title="Markdown"]', function() {
        // Make sure we added exactly one markdown block.
        test.assertExists(blockSelector, 'Added a block');
        test.assertElementCount(blockSelector, 1);
        test.assertSelectorHasText(blockTypeSelector, 'Markdown', 'Block is titled "Markdown"');
    }).then(function() {
        // Give it some markdown.
        this.sendKeys(blockSelector + ' ' + 'textarea', '#wat', {keepFocus: true});
        // We should be able to evaluate it with <ctrl>+<enter>,
        this.sendKeys(blockSelector + ' ' + 'textarea', this.page.event.key.Enter, {modifiers: 'ctrl', keepFocus: true});
        this.capture(screenshotDir + '/evaled_markdown_ctrl_enter.png');
        // or on blur.
        this.click(blockSelector + ' ' + '.evaled-block');
        this.sendKeys(blockSelector + ' ' + 'textarea', '## wat ');
        this.capture(screenshotDir + '/evaled_markdown_blur.png');
    }).thenClick(blockButtonBarSelector + ' ' + '[title="Close"]', function() {
        // Make sure the block was removed.
        test.assertDoesntExist(blockSelector, 'Removed a block');
        test.assertElementCount(blockSelector, 0);
    }).thenClick(tabSelector + ' ' + '> a i', function() {
        // Make sure we only have the add button.
        test.assertElementCount(tabSelector, 1);
        // And, we don't have any notebooks in the content.
        test.assertDoesntExist(contentSelector, 'There is no notebook content');
    }).run(function() {
        test.done();
    });
});

casper.test.begin('Config is read properly', 9, function(test) {
    casper.start(defaultURL, function() {
        this.viewport(1280, 720).then(function() {
            this.capture(screenshotDir + '/empty.png');
        });
    }).thenClick('#menu-button-Edit', function() {
        this.capture(screenshotDir + '/edit_button.png');

        test.assertVisible('#menu-command-Settings', 'Settings command is visible');
    }).thenClick('#menu-command-Settings', function() {
        this.capture(screenshotDir + '/settings_command.png');

        test.assertVisible('#notebook-Settings', 'Settings notebook visible');
    }).thenClick('#notebook-Settings', function() {
        this.capture(screenshotDir + '/notebook_settings_slamengine.png');

        test.assertField('slamengine-port', config.sePort.toString(), '`slamengine-port` should match `config.sePort`');
        test.assertField('mongodb-path', config.seMountPath, '`mongodb-path` should match `config.seMountPath`');
        test.assertField('mongodb-mongouri', config.seMongoURI, '`mongodb-mongouri` should match `config.seMongoURI`');
        test.assertField('mongodb-database', config.seDatabase, '`mongodb-database` should match `config.seDatabase`');
        test.assertField('java-binary', config.javaLocation, '`java-binary` should match `config.javaLocation`');
    }).thenClick('#settings-SlamData', function() {
        this.capture(screenshotDir + '/notebook_settings_slamdata.png');

        test.assertField('server-location', config.serverLocation, '`server-location` should match `config.serverLocation`');
        test.assertField('server-port', config.serverPort.toString(), '`server-port` should match `config.serverPort`');
    }).run(function() {
        test.done();
    });
});
