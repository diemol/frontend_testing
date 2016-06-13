// Selenium Grid url
var dockerMachineHost = (typeof process.env.DOCKER_MACHINE_HOST === "undefined") ?
    "localhost" : process.env.DOCKER_MACHINE_HOST;
var seleniumGridUrl = 'http://' + dockerMachineHost + ':4444/wd/hub';
var driver;

// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');
var By = webDriver.By;
var until = webDriver.until;

// Getting the Chai expect library for assertions
var expect = require('chai').expect;

const mochaTimeOut = 30000; //ms


describe('Hotel Booking Test', function() {
    this.timeout(mochaTimeOut);

    beforeEach(function() {
        var capabilities = new webDriver.Capabilities().
        set(webDriver.Capability.BROWSER_NAME, webDriver.Browser.CHROME).
        set(webDriver.Capability.PLATFORM, 'LINUX');

        driver = new webDriver.Builder()
            .withCapabilities(capabilities)
            .usingServer(seleniumGridUrl)
            .build();

        driver.manage().window().maximize();
    });

    it('Book Hotel And Select Pay At Hotel Should Leave Booking Reserved', function(done) {

        // Go to the register page
        driver.get("http://phptravels.net/hotels").then(done);

    });

    afterEach(function(done) {
        // Quitting the browser
        driver.quit().then(done);
    });
});
