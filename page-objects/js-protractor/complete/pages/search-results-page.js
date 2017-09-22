var ArticleDetailPage = require('./product-detail-page.js');

SearchResultsPage = function SearchResultsPage() {
    this.firstItem = element.all(by.css('z-grid[class=z-nvg-cognac_articles]')).first();
};

SearchResultsPage.prototype.clickOnFirstArticle = function () {
    this.firstItem.click();
    return new ArticleDetailPage();
};

module.exports = SearchResultsPage;

