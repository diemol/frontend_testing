var webDriver = require('selenium-webdriver');
var By = webDriver.By;

var BagPage = require('./bag-page.js');

ArticleDetailPage = function ArticleDetailPage(driver) {
    this.driver = driver;
    this.sizeSelect = By.id("sizeSelect");
    this.articlesListLocator = By.className("catalogArticlesList_productBox");
    this.articleBrand = By.css("span[itemprop='brand']");
    this.articleName = By.css("span[itemprop='name']");
    this.addToBagButton = By.id("ajaxAddToCartBtn");
    this.goToBagButton = By.name("head.text:cart.x:4.y:1");
};

ArticleDetailPage.prototype.selectFirstAvailableSize = function() {
    this.driver.findElement(this.sizeSelect).click();
    this.driver.findElements(By.css("li[class='available sizeLine']")).then(function(availableSizes){
        if (availableSizes.length > 0) {
            availableSizes[0].click();
        }
    });
};

ArticleDetailPage.prototype.getArticleName = function() {
     return this.driver.findElement(this.articleName).getText();
};

ArticleDetailPage.prototype.getArticleBrand = function() {
    return this.driver.findElement(this.articleBrand).getText();
};

ArticleDetailPage.prototype.addToBag = function() {
    this.driver.findElement(this.addToBagButton).click();
};

ArticleDetailPage.prototype.goToBag = function() {
    this.driver.findElement(this.goToBagButton).click();
    return new BagPage(this.driver);
};

module.exports = ArticleDetailPage;
