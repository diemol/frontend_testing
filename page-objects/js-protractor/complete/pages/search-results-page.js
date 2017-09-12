var ArticleDetailPage = require('./product-detail-page.js');

SearchResultsPage = function SearchResultsPage() {
};

SearchResultsPage.prototype.clickOnFirstArticle = function () {
    var articleList = element.all(by.className('catalogArticlesList_item'));
    articleList.isPresent().then(function (isPresent) {
        if (!isPresent) {
            articleList = element.all(by.css('z-grid[class=z-nvg-cognac_articles]')).first();
        }
        articleList.first().click();
    });
    return new ArticleDetailPage();
};

module.exports = SearchResultsPage;

