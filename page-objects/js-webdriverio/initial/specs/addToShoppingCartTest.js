var HomePage = require('../pageobjects/home.page');

describe('login form', function () {
    var SearchResultsPage;

    it('Loading https://www.zalando.de/...', function () {
        HomePage.open();
    });

    it('Type Nike in the search field...', function () {
        SearchResultsPage = HomePage.search('Nike');
    });

    it('Click on the first item..."', function () {
        SearchResultsPage.clickOnFirstElement();
    });
});