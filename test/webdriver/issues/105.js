'use strict'

var assert = require('assert')
  , cd = require('chromedriver')
  , wd = require('selenium-webdriver')
  , chrome = require('selenium-webdriver/chrome')
  , http = require('selenium-webdriver/http')
  , util = require('selenium-webdriver/http/util')
  , test = require('selenium-webdriver/testing')
  , binary = require('../../platform').resolveNWBinary()
  , opts = new chrome.Options()
    .setChromeBinaryPath(binary)
  , service = new chrome.ServiceBuilder(cd.path)
    .build()
  , newDriver = function() {
        return chrome.createDriver(opts, service)
    }
  , serverURL = 'http://localhost:20223'
  ;

function promiseAssertComparison(cmp, msg) {
    var prom = new wd.promise.Deferred();
    var req = new http.Request('GET', '/metadata/fs/Untitled1/');
    var client = new http.HttpClient(serverURL);
    client.send(req, function(err, res) {
        if (err) {
            prom.reject(err.message);
        } else if (cmp(JSON.parse(res.body).children.length)) {
            prom.fulfill();
        } else {
            prom.reject(msg);
        }
    });
    return prom;
}

test.describe('Renaming a notebook', function() {
    var driver;

    test.before(function() {
        driver = newDriver();
    });

    test.it('we first need a notebook with some blocks', function() {
        // We have to wait to ensure that the server is up before continuing.
        // We need a much better way of ensuring the server is running than sleeping.
        driver.sleep(15000).then(function() {
            driver.findElement({css: '#add-notebook'}).click();
            driver.findElement({css: '#notebook .content.active .create-block-button'}).click();
            driver.findElement({css: '#notebook .content.active .create-block-button [title="SQL"]'}).click();
            driver.findElement({css: '#notebook .content.active [title="Save"]'}).click()
            // We should have a better way to confirm the notebook was saved.
            // See https://github.com/slamdata/slamdata/issues/75
            driver.sleep(10000).then(function() {
                return promiseAssertComparison(function(len) { return len > 0; }, 'Nothing stored inside notebook');
            });
        });
    });

    test.it('after moving the location of the notebook', function() {
        driver.findElement({css: '#notebook .content.active [title="Rename"]'}).click();
        driver.findElement({css: '#notebook .tab.active input'}).clear();
        driver.findElement({css: '#notebook .tab.active input'}).sendKeys('Foo');
        // Blur it.
        driver.findElement({tagName: 'body'}).click();
    });

    test.it('all files in the notebook should have moved', function() {
        driver.sleep(10000).then(function() {
            return promiseAssertComparison(function(len) { return len === 0; }, 'Left something behind');
        });
    });

    test.after(function() {
        // Some sort of race condition here.
        driver.sleep(2000);
        driver.close();
    });
});
