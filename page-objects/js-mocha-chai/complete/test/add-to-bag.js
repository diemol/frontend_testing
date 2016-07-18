// Selenium Grid url
var dockerMachineHost = (typeof process.env.DOCKER_MACHINE_HOST === "undefined") ?
    "localhost" : process.env.DOCKER_MACHINE_HOST;
var seleniumGridUrl = 'http://' + dockerMachineHost + ':4444/wd/hub';
var driver;

// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');
var By = webDriver.By;

// Getting the Chai expect library for assertions
var expect = require('chai').expect;

const mochaTimeOut = 150000; //ms

// Page Objects
var HomePage = require('../pages/home-page.js');


describe('Add to Bag', function(done) {
    this.timeout(mochaTimeOut);

    beforeEach(function() {
        var capabilities = new webDriver.Capabilities().
        set(webDriver.Capability.BROWSER_NAME, webDriver.Browser.CHROME).
        set(webDriver.Capability.PLATFORM, 'LINUX');

        driver = new webDriver.Builder()
            .withCapabilities(capabilities)
            .usingServer(seleniumGridUrl)
            .build();

        driver.manage().window().maximize().then(done);
    });

    it('Add article to bag and assert title', function(done) {

        // Go to the homepage
        var homePage = new HomePage(driver);
        homePage.visit();

        // Type "Nike" in the search field
        var searchResultsPage = homePage.search("Nike");

        // Click on the first article
        var articleDetailPage = searchResultsPage.clickOnFirstArticle();

        // Click on the size select drop down
        articleDetailPage.selectFirstAvailableSize();

        // Get article name for further assertion
        var expectedArticleBrand = "";
        articleDetailPage.getArticleBrand().then(function(brand) {
            expectedArticleBrand = brand;
        });
        var expectedArticleName = "";
        articleDetailPage.getArticleName().then(function(name) {
            expectedArticleName = name;
        });

        // Add to bag and go to it
        articleDetailPage.addToBag();
        var bagPage = articleDetailPage.goToBag();

        // Assert article's name
        bagPage.getArticleName().then(function(actualArticleName) {
            var expectedArticleFullName = expectedArticleBrand + " " + expectedArticleName;
            expect(actualArticleName).to.equal(expectedArticleFullName, "Article name is different.");
            done();
        });
    });

    afterEach(function(done) {
        // Quitting the browser
        driver.quit().then(done);
    });
});

