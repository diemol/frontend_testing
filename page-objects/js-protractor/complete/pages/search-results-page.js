var ArticleDetailPage = require('./product-detail-page.js');

SearchResultsPage = function SearchResultsPage() {
    this.articleList = element.all(by.className('catalogArticlesList_item'));
};

SearchResultsPage.prototype.clickOnFirstArticle = function () {
    this.articleList.first().click();
    return new ArticleDetailPage();
};

module.exports = SearchResultsPage;