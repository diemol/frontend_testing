// Selenium Grid url
var dockerMachineHost = process.env.DOCKER_MACHINE_HOST;
var seleniumGridUrl = 'http://' + dockerMachineHost + ':4444/wd/hub';

// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');

// Provides wrappers around the following global functions from Mocha's BDD interface
var test = require('selenium-webdriver/testing');

function beforeTest(done) {
    // We declare that we want to run the test on Chrome + Linux
    var capabilities = new webDriver.Capabilities().
    set(webDriver.Capability.BROWSER_NAME, webDriver.Browser.CHROME).
    set(webDriver.Capability.PLATFORM, 'LINUX');

    // Create the connection through WebDriver to the Selenium Grid
    driver = new webDriver.Builder()
        .withCapabilities(capabilities)
        .usingServer(seleniumGridUrl)
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

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}

exports.makeSuite = makeSuite;
exports.formatDate = formatDate;