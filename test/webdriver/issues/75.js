'use strict'

var assert = require('assert')
  // Folktale.
  , op = require('core.operators')
  , lambda = require('core.lambda')
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
  ;

test.describe('Save notebook button', function() {
    var driver;

    test.before(function() {
        driver = newDriver();
    });

    test.it('first we should make sure it is enabled for a new notebook', function() {
        driver.sleep(5000).then(function() {
            driver.findElement({css: '#add-notebook'}).click();
            return driver.sleep(1000);
        }).then(function() {
            return driver.findElement({css: '#notebook .tabs-content .content.active .toolbar a[title="Save"]'})
        }).then(function(el) {
            return el.getAttribute('disabled');
        }).then(lambda.compose(assert)(op.not));
    });

    test.it('then we should save it and make sure it becomes disabled', function() {
        driver.sleep(1000).then(function() {
            driver.findElement({css: '#notebook .content.active [title="Save"]'}).click();
            return driver.sleep(1000);
        }).then(function() {
            // Since it's the first save, we have to confirm the name.
            driver.findElement({css: '#notebook .tab.active input'}).click();
            return driver.sleep(1000);
        }).then(function() {
            // Blur it to confirm.
            driver.findElement({tagName: 'body'}).click();
            return driver.sleep(1000)
        }).then(function() {
            return driver.findElement({css: '#notebook .tabs-content .content.active .toolbar a[title="Save"]'})
        }).then(function(el) {
            return el.getAttribute('disabled');
        }).then(assert);
    });

    test.after(function() {
        driver.close();
    });
});
