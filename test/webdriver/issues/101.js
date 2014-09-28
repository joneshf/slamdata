'use strict'

var assert = require('assert')
  // Folktale.
  , array = require('data.array')
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

test.describe('SQL block label', function() {
    var driver;

    test.before(function() {
        driver = newDriver();
    });

    test.it('we first need a notebook with a SQL block', function() {
        driver.sleep(15000).then(function() {
            driver.findElement({css: '#add-notebook'}).click();
            return driver.sleep(1000);
        }).then(function() {
            driver.findElement({css: createBlock}).click();
            return driver.sleep(1000);
        }).then(function() {
            driver.findElement({css: createSQL}).click();
            return driver.sleep(1000);
        }).then(function() {
            // Blur.
            driver.findElement({css: createBlock}).click();
            return driver.sleep(1000);
        }).then(function() {
            driver.findElement({css: createBlock}).click();
            return driver.sleep(1000);
        });
    });

    test.it('the out labels should have an assignment thing at the end', function() {
        return driver.findElements({
            css: '#notebook .content.active .block-SQL .block-label'
        }).then(function(labels) {
            return wd.promise.map(labels, function(label) {
                return label.getText();
            });
        }).then(function(labels) {
            var assigned = array.all(function(l) {return l.indexOf(':=') >= 0})(labels);
            assert(assigned, 'Each label should have an assignment thing');
        });
    });

    test.after(function() {
        driver.close();
    });
});
