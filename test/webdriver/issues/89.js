'use strict'

var assert = require('assert')
  // Folktale.
  , lambda = require('core.lambda')
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
  , blockSelector = '#notebook .tabs-content .content.active .actual-content .block'
  ;

test.describe('Queries executed relative to notebooks', function() {
    var driver;

    test.before(function() {
        driver = newDriver();
    });

    test.it('we need a notebook with a SQL block', function() {
        driver.sleep(15000).then(function() {
            driver.findElement({css: '#add-notebook'}).click();
            driver.findElement({css: createBlock}).click();
            driver.findElement({css: createSQL}).click();
            driver.findElement({css: blockSelector + ' textarea.block-editor'})
                .sendKeys('select * from "../system/indexes"');
            // Blur.
            driver.findElement({css: createBlock}).click();
            driver.findElement({css: createBlock}).click();
        });
    });

    test.it('there should be something in there', function() {
        driver.sleep(15000).then(function() {
            return driver.findElement({css: blockSelector + ' .block-SQL .evaled-block span'});
        }).then(function(el) {
            return el.getText();
        }).then(lambda.compose(assert)(op.notEqual('')));
    });

    test.after(function() {
        driver.close();
    });
});
