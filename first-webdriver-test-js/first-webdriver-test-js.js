// Setting a longer timeout to invoke the async callback
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // in microseconds.

// Selenium Grid url
var seleniumGridUrl = 'http://192.168.99.100:4444/wd/hub';

// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');

describe('First WebDriver Test in JavaScript and Jasmine', function() {

    // Test to check the page title in Firefox
    it('Page title should be Travel Business Partner in Firefox', function(done) {

        // We declare that we want to run the test on Firefox + Linux
        var capabilities = new webDriver.Capabilities().
            set(webDriver.Capability.BROWSER_NAME, webDriver.Browser.FIREFOX).
            set(webDriver.Capability.PLATFORM, 'LINUX');

        // Create the connection through WebDriver to the Selenium Grid
        var driverFirefox = new webDriver.Builder()
            .withCapabilities(capabilities)
            .usingServer(seleniumGridUrl)
            .build();

        // Go to PHPTravels website
        driverFirefox.get("http://phptravels.net/");

        // Assert the title to the expected value
        driverFirefox.getTitle().then(function(title) {
            expect(title).toBe('Travel Business Partner');
        });

        // Quitting the browser and invoking the callback funtion to tell Jasmine that we are done
        driverFirefox.quit().then(done);
    });

    // Test to check the page title in Chrome
    it('Page title should be Travel Business Partner in Chrome', function(done) {

        // We declare that we want to run the test on Firefox + Linux
        var capabilities = new webDriver.Capabilities().
        set(webDriver.Capability.BROWSER_NAME, webDriver.Browser.CHROME).
        set(webDriver.Capability.PLATFORM, 'LINUX');

        // Create the connection through WebDriver to the Selenium Grid
        var driverChrome = new webDriver.Builder()
            .withCapabilities(capabilities)
            .usingServer(seleniumGridUrl)
            .build();

        // Go to PHPTravels website
        driverChrome.get("http://phptravels.net/");

        // Assert the title to the expected value
        driverChrome.getTitle().then(function(title) {
            expect(title).toBe('Travel Business Partner');
        });

        // Quitting the browser and invoking the callback funtion to tell Jasmine that we are done
        driverChrome.quit().then(done);
    });

});

