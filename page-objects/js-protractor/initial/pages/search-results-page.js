
SearchResultsPage = function SearchResultsPage() {
    this.articleList = element.all(by.className('catalogArticlesList_item'));
    this.articleList.isPresent().then(function (isPresent) {
        if (!isPresent) {
            this.articleList = element.all(by.css('z-grid[class=z-nvg-cognac_articles]')).first();
        }
    });
};

SearchResultsPage.prototype.clickOnFirstArticle = function () {
    this.articleList.first().click();
};

module.exports = SearchResultsPage;