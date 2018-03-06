// searchResults.page.js
var Page = require('./page');

var SearchResultsPage = Object.create(Page, {
    /**
     * define elements
     */
    firstElement: { get: function () { return browser.element("z-grid[class='z-nvg-cognac_articles'] > z-grid-item:first-child"); } },

    clickOnFirstElement: { value: function() {
            this.firstElement.click();
        } }
});

module.exports = SearchResultsPage;