var webDriver = require('selenium-webdriver');
var By = webDriver.By;

var SearchResultsPage = require('./search-results-page.js');

HomePage = function HomePage(driver) {
    this.driver = driver;
    this.searchField = By.id("searchContent");
};

HomePage.prototype.visit = function() {
    this.driver.get('https://www.zalando.de/');
    return webDriver.promise.fulfilled(true);
};

HomePage.prototype.search = function(searchText) {
    this.driver.findElement(this.searchField).sendKeys(searchText);
    this.driver.findElement(this.searchField).submit();
    return new SearchResultsPage(this.driver);
};

module.exports = HomePage;