// Getting the Chai expect library for assertions
var expect = require('chai').expect;

// Selenium Grid url
var dockerMachineHost = process.env.DOCKER_MACHINE_HOST;
var seleniumGridUrl = 'http://' + dockerMachineHost + ':4444/wd/hub';

// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');

describe('First WebDriver Test in JavaScript and Mocha', function() {
    // Global timeout for Mocha to wait for the callback function to be invoked
    this.timeout(30000);

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
            expect(title).to.equal('Travel Business Partner');
        });

        // Quitting the browser and invoking the callback function to tell Jasmine that we are done
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
            expect(title).to.equal('Travel Business Partner');
        });

        // Quitting the browser and invoking the callback function to tell Jasmine that we are done
        driverChrome.quit().then(done);
    });

});

