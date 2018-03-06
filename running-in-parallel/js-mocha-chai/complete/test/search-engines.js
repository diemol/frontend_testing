// Getting the Chai expect library for assertions
var expect = require('chai').expect;

// Create a new instance of WebDriver and other helpful methods from WebDriver
var driver;

var createDriver = require('./base').createDriver;

const mochaTimeOut = 100000; //ms
const waitTime = 1000 * 15;

describe('Search Engines Test', function() {
    this.timeout(mochaTimeOut);

    beforeEach(function() {

        driver = createDriver(this.currentTest.title);

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
        // Quitting the browser
        driver.quit().then(done);
    });
});

