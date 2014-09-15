'use strict'

var assert = require('assert')
  // Folktale.
  , array = require('data.array')
  , op = require('core.operators')
  // Selenium junk.
  , cd = require('chromedriver')
  , wd = require('selenium-webdriver')
  , chrome = require('selenium-webdriver/chrome')
  , test = require('selenium-webdriver/testing')
  // Config stuff.
  , binary = require('../../platform').resolveNWBinary()
  , opts = new chrome.Options()
    .setChromeBinaryPath(binary)
  , service = new chrome.ServiceBuilder(cd.path)
    .build()
  , newDriver = function() {
        return chrome.createDriver(opts, service)
    }
  , createBlock = '#notebook .content.active .create-block-button'
  , createSQL = createBlock + ' [title="SQL"]'
  ;

function unique(arr) {
    return array.uniqueBy(op.equal)(arr);
}

function assertSorted(driver) {
    return driver.findElements({
        css: '#notebook .content.active .block-SQL .block-label'
    }).then(function(labels) {
        return wd.promise.map(labels, function(label) {
            return label.getText();
        });
    }).then(function(labels) {
        assert.equal(unique(labels).length, labels.length, 'Each label should be unique');
    });
}

test.describe('SQL block label', function() {
    var driver;

    test.before(function() {
        driver = newDriver();
    });

    test.it('we first need a notebook with some blocks', function() {
        driver.findElement({css: '#add-notebook'}).click();
        driver.findElement({css: createBlock}).click();
        driver.findElement({css: createSQL}).click();
        driver.findElement({css: createBlock}).click();
        driver.findElement({css: createSQL}).click();
        driver.findElement({css: createBlock}).click();
        driver.findElement({css: createSQL}).click();
        // Blur.
        driver.findElement({css: createBlock}).click();
        driver.findElement({css: createBlock}).click();
    });

    test.it('the out labels should be unique', function() {
        return assertSorted(driver);
    });

    test.it('after reevaluating some blocks', function() {
        driver.findElement({
            css: '#notebook .content.active .block-SQL .evaled-block'
        }).click();
        driver.findElement({css: createBlock}).click();
        driver.findElement({css: createBlock}).click();
    });

    test.it('nothing should have changed', function() {
        return assertSorted(driver);
    });

    test.after(function() {
        driver.close();
    });
});
