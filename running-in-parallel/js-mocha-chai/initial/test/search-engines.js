// Retrieve the userName and accessKey from the environment Sauce Labs
var seleniumGridUrl = "http://localhost:4444/wd/hub";
var driver;

// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');

// Getting the Chai expect library for assertions
var expect = require('chai').expect;

const mochaTimeOut = 100000; //ms
const waitTime = 1000 * 15;

// For today's date;
Date.prototype.today = function () {
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") +
        (this.getMonth()+1) +"/"+ this.getFullYear();
};

// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") +
        this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};

describe('Search Engines Test', function() {
    this.timeout(mochaTimeOut);

    beforeEach(function() {
        // We declare that we want to run the test on Chrome + Linux
        var capabilities = {
            'browserName': webDriver.Browser.CHROME,
            'platform': 'LINUX',
            'name': this.currentTest.title
        };

        var datetime = "LastSync: " + new Date().today() + " @ " + new Date().timeNow();
        console.log("START " + datetime + " -> " + this.currentTest.title);

        driver = new webDriver.Builder()
            .withCapabilities(capabilities)
            .usingServer(seleniumGridUrl)
            .build();

        driver.manage().window().maximize();
    });

    it('Load Google Page And Check Title', function(done) {

        // Go to the homepage
        driver.get("http://www.google.com");

        driver.sleep(waitTime);

        // Assert the title to the expected value
        driver.getTitle().then(function(title) {
            expect(title).to.equal('Google');
            done();
        });
    });

    it('Load Bing Page And Check Title', function(done) {

        // Go to the homepage
        driver.get("http://www.bing.com");

        driver.sleep(waitTime);

        // Assert the title to the expected value
        driver.getTitle().then(function(title) {
            expect(title).to.equal('Bing');
            done();
        });

    });

    it('Load DuckDuckGo Page And Check Title', function(done) {

        // Go to the homepage
        driver.get("http://www.duckduckgo.com");

        driver.sleep(waitTime);

        // Assert the title to the expected value
        driver.getTitle().then(function(title) {
            expect(title).to.equal('DuckDuckGo Search Engine');
            done();
        });

    });


    afterEach(function(done) {
        var datetime = "LastSync: " + new Date().today() + " @ " + new Date().timeNow();
        console.log("FINISH " + datetime + " -> " + this.currentTest.title);
        // Quitting the browser
        driver.quit().then(done);
    });

});

