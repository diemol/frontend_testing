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
        driver.get("https://www.zalando.de/").then(function() {
            console.log("Loading https://www.zalando.de/...");
        });

        // Type "Nike" in the search field
        var searchField = driver.findElement(By.id("searchContent"));
        searchField.sendKeys("Nike");
        searchField.submit().then(function(){
            console.log("Typing Nike in the search field...");
        });

        // Click on the first article
        driver.findElements(By.className("catalogArticlesList_productBox")).then(function(articlesList){
            articlesList[0].click();
            console.log("Clicking on the first article...");
            done();
        });

    });

    afterEach(function(done) {
        // Quitting the browser
        driver.quit().then(done);
    });
});

