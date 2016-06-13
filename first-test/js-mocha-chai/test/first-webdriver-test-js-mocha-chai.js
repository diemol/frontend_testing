// Getting the Chai expect library for assertions
var expect = require('chai').expect;

// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');

describe('First WebDriver Test in JavaScript and Mocha', function() {
    // Global timeout for Mocha to wait for the callback function to be invoked
    this.timeout(30000);

    // Test to check the page title
    it('Page title should be Travel Business Partner', function(done) {

        // Use WebDriver to visit a search engine with Chrome
        var driver = new webDriver.Builder()
                .forBrowser("chrome")
                .build();

        // Maximize the window
        driver.manage().window().maximize();

        // Go to PHPTravels website
        driver.get("http://phptravels.net/");

        // Assert the title to the expected value
        driver.getTitle().then(function(title) {
            expect(title).to.equal('Travel Business Partner');
        });

        // Quitting the browser and invoking the callback function to tell Mocha that we are done
        driver.quit().then(done);
    });

});

