var webDriver = require('selenium-webdriver');
var By = webDriver.By;

// var SearchResultsPage = require('./search-results-page.js');

BagPage = function BagPage(driver) {
    this.driver = driver;
    this.articleName = By.name("cart.product.name");
};

BagPage.prototype.getArticleName = function() {
    return this.driver.findElement(this.articleName).getText();
};


module.exports = BagPage;
