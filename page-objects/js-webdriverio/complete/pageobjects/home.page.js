// home.page.js
var Page = require('./page')
var SearchResultsPage = require('./searchResults.page');

var HomePage = Object.create(Page, {
    /**
     * define elements
     */
    searchField: { get: function () { return browser.element('.z-navicat-header_searchInput'); } },

    /**
     * define or overwrite page methods
     */
    open: { value: function() {
            Page.open.call(this, '/');
        } },

    search: { value: function(searchText) {
            this.searchField.setValue(searchText);
            this.searchField.click();
            browser.keys('Enter');
            return SearchResultsPage;
        } }
});

module.exports = HomePage;