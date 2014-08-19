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

function addBlock(blockType, test) {
    var count = casper.evaluate(function(block) {
        return { block: __utils__.findAll(block).length
               }
    }, blockSelector);
    casper.click(contentSelector + ' ' + '.toolbar [title="' + blockType + '"]');
    // Make sure we added exactly one markdown block.
    test.assertExists(blockSelector, 'Added a block');
    test.assertElementCount(blockSelector, count.block + 1);
    test.assertSelectorHasText(blockTypeSelector, blockType, 'Block is titled ' + blockType);
};

function addMultipleNotebooks(test) {
    addNotebook(test);
    addNotebook(test);
    addNotebook(test);
};

function addNotebook(test) {
    var count = casper.evaluate(function(tabs, content) {
        return { tabs: __utils__.findAll(tabs).length
               , content: __utils__.findAll(content).length
               }
    }, tabSelector, contentSelector);
    casper.click('#add-notebook');
    // Make sure we added exactly one notebook.
    test.assertElementCount(tabSelector, count.tabs + 1);
    // Make sure we the notebook has an empty content.
    test.assertExists(contentSelector, 'The notebook has content');
    test.assertElementCount(contentSelector, count.content + 1);
    // Make sure there aren't any blocks in a new notebook.
    test.assertDoesntExist(blockSelector, 'There are no blocks');
};

function removeBlock(test) {
    var count = casper.evaluate(function(block) {
        return { block: __utils__.findAll(block).length
               }
    }, blockSelector);
    casper.click(blockButtonBarSelector + ' ' + '[title="Close"]');
    // Make sure the block was removed.
    test.assertDoesntExist(blockSelector, 'Removed a block');
    test.assertElementCount(blockSelector, count.block - 1);
};

function removeMultipleNotebooks(test) {
    removeNotebook(test);
    removeNotebook(test);
    removeNotebook(test);
};

function removeNotebook(test) {
    var count = casper.evaluate(function(tabs, content) {
        return { tabs: __utils__.findAll(tabs).length
               , content: __utils__.findAll(content).length
               }
    }, tabSelector, contentSelector);
    casper.click(tabSelector + ' ' + '> a i')
    // Make sure we removed exactly one notebook.
    test.assertElementCount(tabSelector, count.tabs - 1);
    test.assertElementCount(contentSelector, count.content - 1);
}

function selectNotebook(n, test) {
    var nthTab = tabSelector + ':nth-of-type(' + n + ')';
    casper.click(nthTab + ' a');
    var className = casper.getElementAttribute(nthTab, 'class');
    test.assertMatch(className, /active/, 'Selected notebook ' + n)
}

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

casper.test.begin('Basic Notebook Functionality', 15, function(test) {
    casper.start(defaultURL).then(function() {
        onlyAddButton(test);
        addNotebook(test);
        addBlock('Markdown', test);
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
        removeBlock(test);
        removeNotebook(test);
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
        selectNotebook(2, test);
        selectNotebook(1, test);
        selectNotebook(3, test);
        selectNotebook(1, test);
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

        test.assertField('slamengine-port', config.sePort.toString(), '`slamengine-port` should match `config.sePort`');
        test.assertField('mongodb-path', config.seMountPath, '`mongodb-path` should match `config.seMountPath`');
        test.assertField('mongodb-mongouri', config.seMongoURI, '`mongodb-mongouri` should match `config.seMongoURI`');
        test.assertField('mongodb-database', config.seDatabase, '`mongodb-database` should match `config.seDatabase`');
        test.assertField('java-binary', config.javaLocation, '`java-binary` should match `config.javaLocation`');
    }).thenClick('#settings-SlamData', function() {
        casper.capture(screenshotDir + '/notebook_settings_slamdata.png');

        test.assertField('server-location', config.serverLocation, '`server-location` should match `config.serverLocation`');
        test.assertField('server-port', config.serverPort.toString(), '`server-port` should match `config.serverPort`');
    }).run(function() {
        test.done();
    });
});
