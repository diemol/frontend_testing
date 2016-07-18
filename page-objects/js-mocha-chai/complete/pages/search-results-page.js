var webDriver = require('selenium-webdriver');
var By = webDriver.By;

var ArticleDetailPage = require('./article-detail-page.js');

SearchResultsPage = function SearchResultsPage(driver) {
    this.driver = driver;
    this.articlesListLocator = By.className("catalogArticlesList_productBox");
};

SearchResultsPage.prototype.clickOnFirstArticle = function() {
    this.driver.findElements(this.articlesListLocator).then(function(articlesList){
        articlesList[0].click();
    });
    return new ArticleDetailPage(this.driver);
};

module.exports = SearchResultsPage;
