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
  , editorSQL = blockSelector + ' textarea.block-editor'
  , evaledSQL = blockSelector + ' .block-SQL .evaled-block span'
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
        });
    });

    test.it('`select * from "/system/indexes" limit 5`', function() {
        driver.findElement({css: editorSQL})
            .sendKeys('select * from "/system/indexes" limit 5');
        // Blur.
        driver.findElement({css: createBlock}).click();
        driver.findElement({css: createBlock}).click();
    });

    test.it('should give back some results', function() {
        driver.sleep(15000).then(function() {
            return driver.findElement({css: evaledSQL});
        }).then(function(el) {
            return el.getText();
        }).then(lambda.compose(assert)(op.notEqual('')));
    });

    // TODO: Reenable this after SE supports relative paths.
    // test.it('`select * from "../system/indexes" limit 5`', function() {
    //     driver.findElement({css: evaledSQL}).click();
    //     driver.findElement({css: editorSQL}).clear();
    //     driver.findElement({css: editorSQL})
    //         .sendKeys('select * from "../system/indexes" limit 5');
    //     // Blur.
    //     driver.findElement({css: createBlock}).click();
    //     driver.findElement({css: createBlock}).click();
    // });

    // test.it('should give back some results', function() {
    //     driver.sleep(15000).then(function() {
    //         return driver.findElement({css: evaledSQL});
    //     }).then(function(el) {
    //         return el.getText();
    //     }).then(lambda.compose(assert)(op.notEqual('')));
    // });

    test.it('adding another SQL block', function() {
        driver.findElement({css: createBlock}).click();
        driver.findElement({css: createSQL}).click();
    });

    test.it('`select * from out0 limit 5`', function() {
        driver.findElement({css: editorSQL})
            .sendKeys('select * from out0 limit 5');
        // Blur.
        driver.findElement({css: createBlock}).click();
        driver.findElement({css: createBlock}).click();
    });

    test.it('should give back some results', function() {
        driver.sleep(15000).then(function() {
            return driver.findElement({css: evaledSQL});
        }).then(function(el) {
            return el.getText();
        }).then(lambda.compose(assert)(op.notEqual('')));
    });

    test.it('`select * from "system/indexes" limit 5`', function() {
        driver.findElement({css: evaledSQL}).click();
        driver.findElement({css: editorSQL}).clear();
        driver.findElement({css: editorSQL})
            .sendKeys('select * from "system/indexes" limit 5');
        // Blur.
        driver.findElement({css: createBlock}).click();
        driver.findElement({css: createBlock}).click();
    });

    test.it('should give back no results', function() {
        driver.sleep(15000).then(function() {
            return driver.findElement({css: evaledSQL});
        }).then(function(el) {
            return el.getText();
        }).then(lambda.compose(assert)(op.equal('')));
    });

    test.after(function() {
        driver.close();
    });
});
