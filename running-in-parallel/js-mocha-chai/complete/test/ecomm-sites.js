// Getting the Chai expect library for assertions
var expect = require('chai').expect;

// Create a new instance of WebDriver and other helpful methods from WebDriver
var driver;

var createDriver = require('./base').createDriver;

const mochaTimeOut = 100000; //ms
const waitTime = 1000 * 15;

describe('Check Ecomm Sites Test', function() {
    this.timeout(mochaTimeOut);

    beforeEach(function() {

        driver = createDriver(this.currentTest.title);

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
        // Quitting the browser
        driver.quit().then(done);
    });
});

