'use strict'

var assert = require('assert')
  , cd = require('chromedriver')
  , wd = require('selenium-webdriver')
  , chrome = require('selenium-webdriver/chrome')
  , test = require('selenium-webdriver/testing')
  , binary = require('../platform').resolveNWBinary()
  , opts = new chrome.Options()
    .setChromeBinaryPath(binary)
  , service = new chrome.ServiceBuilder(cd.path)
    .build()
  , newDriver = function() {
        return chrome.createDriver(opts, service)
    }
  ;

test.describe('Title', function() {
    var driver;

    test.before(function() {
        driver = newDriver();
    });

    test.it('is set set properly', function() {
        driver.getTitle().then(function(title) {
            assert.equal(title, 'SlamData');
        });
    });

    test.after(function() {
        driver.close();
    });
});
