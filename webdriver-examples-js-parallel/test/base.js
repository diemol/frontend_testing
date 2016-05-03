// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');

// Provides wrappers around the following global functions from Mocha's BDD interface
var test = require('selenium-webdriver/testing');

// SauceLabs environment variables
var userName,
    accessKey;

function beforeTest(done) {
    // Retrieve the userName and accessKey from the environment
    userName = process.env.SAUCE_USERNAME;
    accessKey = process.env.SAUCE_ACCESS_KEY;
    var sauceLabsUrl = "http://" + userName + ":" + accessKey + "@ondemand.saucelabs.com:80/wd/hub";

    // We declare that we want to run the test on Chrome + Linux
    /*
    var capabilities = new webDriver.Capabilities().
    set(webDriver.Capability.BROWSER_NAME, webDriver.Browser.CHROME).
    set(webDriver.Capability.PLATFORM, 'LINUX');
    */

    var desiredCaps = {
        'browserName': webDriver.Browser.CHROME,
        'platform': 'LINUX',
        //'version': version,
        'username': userName,
        'accessKey': accessKey,
        'name': this.currentTest.title
    };

    // Create the connection through WebDriver to the Selenium Grid
    driver = new webDriver.Builder()
        .withCapabilities(desiredCaps)
        .usingServer(sauceLabsUrl)
        .build();

    driver.manage().window().maximize();
    driver.get("http://phptravels.net/").then(done);
}

function afterTest(done) {
    // Quitting the browser and invoking the callback function to tell Mocha that we are done
    driver.quit().then(done);
}

function makeSuite(desc, cb) {
    test.describe(desc, function() {
        this.timeout(60000);
        test.beforeEach(beforeTest);
        cb();
        test.afterEach(afterTest);
    });
}

exports.makeSuite = makeSuite;