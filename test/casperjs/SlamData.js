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

var contentSelector = '#notebook .tabs-content .content'
  , blockSelector = contentSelector + ' ' + '.actual-content .block'
  , blockButtonBarSelector = blockSelector + ' ' + '.block-toolbar'
  , blockTypeSelector = blockButtonBarSelector + ' ' + '.block-type span'
  , tabSelector = '#notebook .tabs .tab'
  ;

function onlyAddButton(test) {
    // For a fresh notebook we should not have anything stored.
    // Make sure we only have the add button.
    test.assertElementCount(tabSelector, 1);
    // And, we don't have any notebooks in the content.
    test.assertDoesntExist(contentSelector, 'There is no notebook content');
};

function addMultipleNotebooks(test) {
    actions.addNotebook(test);
    actions.addNotebook(test);
    actions.addNotebook(test);
};

function removeMultipleNotebooks(test) {
    actions.removeNotebook(test);
    actions.removeNotebook(test);
    actions.removeNotebook(test);
};

casper.test.setUp(function(done) {
    casper.start(defaultURL, function() {
        casper.viewport(1280, 720);
        casper.evaluate(function() {
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

casper.test.begin('Basic Notebook Functionality', 14, function(test) {
    casper.start(defaultURL).then(function() {
        onlyAddButton(test);
        actions.addNotebook(test);
        actions.addBlock('Markdown', test);
    }).then(function() {
        // Give it some markdown.
        casper.sendKeys(blockSelector + ' ' + 'textarea', '#wat', {keepFocus: true});
        // We should be able to evaluate it with <ctrl>+<enter>,
        casper.sendKeys(blockSelector + ' ' + 'textarea', casper.page.event.key.Enter, {modifiers: 'ctrl', keepFocus: true});
        casper.capture(screenshotDir + '/evaled_markdown_ctrl_enter.png');
        // or on blur.
        casper.click(blockSelector + ' ' + '.evaled-block');
        casper.sendKeys(blockSelector + ' ' + 'textarea', '## wat ');
        casper.capture(screenshotDir + '/evaled_markdown_blur.png');
    }).then(function() {
        actions.removeBlock(test);
        actions.removeNotebook(test);
        onlyAddButton(test);
    }).run(function() {
        test.done();
    });
});

casper.test.begin('Multiple notebooks', 26, function(test) {
    casper.start(defaultURL).then(function() {
        onlyAddButton(test);
    }).then(function() {
        addMultipleNotebooks(test);
        actions.selectNotebook(2, test);
        actions.selectNotebook(1, test);
        actions.selectNotebook(3, test);
        actions.selectNotebook(1, test);
        removeMultipleNotebooks(test);
    }).then(function() {
        onlyAddButton(test);
    }).run(function() {
        test.done();
    });
});

casper.test.begin('Config is read properly', 9, function(test) {
    casper.start(defaultURL, function() {
        casper.capture(screenshotDir + '/empty.png');
    }).thenClick('#menu-button-Edit', function() {
        casper.capture(screenshotDir + '/edit_button.png');

        test.assertVisible('#menu-command-Settings', 'Settings command is visible');
    }).thenClick('#menu-command-Settings', function() {
        casper.capture(screenshotDir + '/settings_command.png');

        test.assertVisible('#notebook-Settings', 'Settings notebook visible');
    }).thenClick('#notebook-Settings', function() {
        casper.capture(screenshotDir + '/notebook_settings_slamengine.png');

        test.assertFieldCSS('#notebook [name="slamengine-port"]', config.sePort.toString(), '`slamengine-port` should match `config.sePort`');
        test.assertFieldCSS('#notebook [name="mongodb-path"]', config.seMountPath, '`mongodb-path` should match `config.seMountPath`');
        test.assertFieldCSS('#notebook [name="mongodb-mongouri"]', config.seMongoURI, '`mongodb-mongouri` should match `config.seMongoURI`');
        test.assertFieldCSS('#notebook [name="mongodb-database"]', config.seDatabase, '`mongodb-database` should match `config.seDatabase`');
        test.assertFieldCSS('#notebook [name="java-binary"]', config.javaLocation, '`java-binary` should match `config.javaLocation`');
    }).thenClick('#settings-SlamData', function() {
        casper.capture(screenshotDir + '/notebook_settings_slamdata.png');

        test.assertFieldCSS('#notebook [name="server-location"]', config.serverLocation, '`server-location` should match `config.serverLocation`');
        test.assertFieldCSS('#notebook [name="server-port"]', config.serverPort.toString(), '`server-port` should match `config.serverPort`');
    }).run(function() {
        test.done();
    });
});
