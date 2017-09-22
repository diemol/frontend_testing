var SearchResultsPage = require('./search-results-page.js');

HomePage = function HomePage() {
    this.searchField = element(by.id('searchContent'));
};

HomePage.prototype.visit = function () {
    browser.get('https://www.zalando.de/mosaic-mosaic-catalog');
};

HomePage.prototype.search = function (searchText) {
    this.searchField.sendKeys(searchText);
    this.searchField.submit();
    return new SearchResultsPage();
};

module.exports = HomePage;