function addBlock(blockType, test) {
    var count = casper.evaluate(function(block) {
        return { block: __utils__.findAll(block).length
               }
    }, blockSelector);
    casper.click('.create-block-button');
    casper.click('.create-block-button [title="' + blockType + '"]');
    // Make sure we added exactly one markdown block.
    test.assertExists(blockSelector, 'Added a block');
    test.assertElementCount(blockSelector, count.block + 1);
    test.assertSelectorHasText(blockTypeSelector, blockType, 'Block is titled ' + blockType);
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
};

function selectNotebook(n, test) {
    var nthTab = tabSelector + ':nth-of-type(' + n + ')';
    casper.click(nthTab + ' a');
    var className = casper.getElementAttribute(nthTab, 'class');
    test.assertMatch(className, /active/, 'Selected notebook ' + n)
};

module.exports =
    { addBlock: addBlock
    , addNotebook: addNotebook
    , removeBlock: removeBlock
    , removeNotebook: removeNotebook
    , selectNotebook: selectNotebook
    }
