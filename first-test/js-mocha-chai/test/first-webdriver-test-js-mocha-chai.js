const {Builder, By, Key, until} = require('selenium-webdriver');
// Getting the Chai expect library for assertions
const expect = require('chai').expect;

// Selenium Grid url
const seleniumGridUrl = 'http://localhost:4444/wd/hub';

// Create a new instance of WebDriver
const webDriver = require('selenium-webdriver');

describe('First WebDriver Test in JavaScript and Mocha', function() {
    // Global timeout for Mocha to wait for the callback function to be invoked
    this.timeout(60000);

    // Test to check the page title
    it('Page title should be Schuhe, Mode und Accessoires online kaufen | Schnelle Lieferung von Zalando', function(done) {

        // Use WebDriver to visit a search engine with Chrome
        let driver = new Builder()
            .forBrowser('chrome')
            .usingServer(seleniumGridUrl)
            .build();

        // Maximize the window
        driver.manage().window().maximize();

        // Go to Zalando website
        driver.get("https://www.zalando.de/");

        // Assert the title to the expected value
        driver.getTitle().then(function(title) {
            expect(title).to.equal('Schuhe, Mode und Accessoires online kaufen | Schnelle Lieferung von Zalando');
        });

        // Quitting the browser and invoking the callback function to tell Mocha that we are done
        driver.quit().then(done);
    });

});

