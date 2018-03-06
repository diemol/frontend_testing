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

describe('Check Ecomm Sites Test', function() {
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

    it('Load Zalando Page And Check Title', function(done) {

        // Go to the homepage
        driver.get("http://www.zalando.de");

        driver.sleep(waitTime);

        // Assert the title to the expected value
        driver.getTitle().then(function(title) {
            expect(title).to.equal('Schuhe, Mode und Accessoires online kaufen | Schnelle Lieferung von Zalando');
            done();
        });

    });

    it('Load Amazon Page And Check Title', function(done) {

        // Go to the homepage
        driver.get("http://www.amazon.de");

        driver.sleep(waitTime);

        // Assert the title to the expected value
        driver.getTitle().then(function(title) {
            expect(title).to.equal('Amazon.de: Günstige Preise für Elektronik & Foto, Filme, Musik, Bücher, ' +
                'Games, Spielzeug & mehr');
            done();
        });

    });

    it('Load Otto Page And Check Title', function(done) {

        // Go to the homepage
        driver.get("http://www.otto.de");

        driver.sleep(waitTime);

        // Assert the title to the expected value
        driver.getTitle().then(function(title) {
            expect(title).to.equal('OTTO - Mode, Möbel & Technik » Zum Online-Shop');
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

