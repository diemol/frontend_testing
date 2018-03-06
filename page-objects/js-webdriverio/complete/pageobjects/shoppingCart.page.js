// shoppingCart.page.js
var Page = require('./page');

var ShoppingCartPage = Object.create(Page, {
    /**
     * define elements
     */
    productInfo: { get: function () {
            var productInfoSelector = ".z-coast-fjord_link";
            browser.waitForVisible(productInfoSelector, 10000);
            return browser.elements(productInfoSelector);
        } },

    getProductBrand: { value: function() {
            return this.productInfo.value[1].getText();
        } },

    getProductName: { value: function() {
            return this.productInfo.value[2].getText();
        } }
});

module.exports = ShoppingCartPage;