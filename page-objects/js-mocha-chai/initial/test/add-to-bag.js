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

    it('Add article to bag and assert title and price', function(done) {

        // Go to the homepage
        var homePage = new HomePage(driver);
        homePage.visit();

        // Type "Nike" in the search field
        var searchResultsPage = homePage.search("Nike");

        // Click on the first article
        searchResultsPage.clickOnFirstArticle();

        // Click on the size select drop down
        var sizeSelect = driver.findElement(By.id("sizeSelect"));
        sizeSelect.click().then(function() {
            console.log("Selecting the first available size...");
        });

        // Get article name for further assertion
        var expectedArticleBrand = "";
        driver.findElement(By.css("span[itemprop='brand']")).getText().then(function(text) {
            expectedArticleBrand = text;
        });
        var expectedArticleName = "";
        driver.findElement(By.css("span[itemprop='name']")).getText().then(function(text) {
            expectedArticleName = text;
        });

        // Select the first available size from the list
        driver.findElements(By.css("li[class='available sizeLine']")).then(function(availableSizes){
            if (availableSizes.length > 0) {
                availableSizes[0].click();
            } else {
                driver.findElements(By.css("li[class='available sizeLine active']")).then(function(availableSizesActive){
                    availableSizesActive[0].click();
                });
            }
        });

        var expectedArticlePrice = "";
        driver.findElement(By.id("articlePrice")).getText().then(function(text) {
            expectedArticlePrice = text;
        });

        // Add to bag and go to it
        var addToBagButton = driver.findElement(By.id("ajaxAddToCartBtn"));
        addToBagButton.click();
        var goToBagButton = driver.findElement(By.name("head.text:cart.x:4.y:1"));
        goToBagButton.click().then(function() {
            console.log("Adding to bag and going to bag page...");
        });

        // Assert article's name and price
        driver.findElement(By.name("cart.product.name")).getText().then(function(actualArticleName) {
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

