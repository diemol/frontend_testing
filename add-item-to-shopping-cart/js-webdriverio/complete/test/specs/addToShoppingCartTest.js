describe('Add item to Shopping Cart', function() {

    it('Visit HomePage', function () {
        browser.windowHandleMaximize();
        browser.url('https://www.zalando.de');
    });

    it('Search for Nike', function () {
        const searchFieldSelector = ".z-navicat-header_searchInput";
        const searchField = $(searchFieldSelector);
        searchField.setValue('Nike');
        searchField.click();
        browser.keys('Enter');
    });

    it('Click on first Item', function () {
        const firstElementSelector = "z-grid[class='z-nvg-cognac_articles'] > z-grid-item:first-child";
        browser.click(firstElementSelector);
    });

});