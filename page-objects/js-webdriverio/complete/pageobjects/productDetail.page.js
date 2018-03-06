// productDetail.page.js
var Page = require('./page');
var ShoppingCartPage = require('./shoppingCart.page');

var ProductDetailPage = Object.create(Page, {
    /**
     * define elements
     */
    sizeDropDown: { get: function () { return browser.element(".h-container.h-dropdown-placeholder"); } },
    firstAvailableSize: { get: function () { return browser.element("h5[class*='h-color-black'][class*='title-4'][class*='h-all-caps']"); } },
    addToShoppingCartButton: { get: function () { return browser.element("#z-pdp-topSection-addToCartButton"); } },
    goToShoppingCartButton: { get: function () {
        var shoppingCartButtonSelector = "a[class='z-navicat-header_navToolItemLink']";
        browser.waitForVisible(shoppingCartButtonSelector, 10000);
        return browser.element(shoppingCartButtonSelector);
    } },
    productBrand: { get: function () { return browser.element("h2[class*='h-color-black'][class*='detail']"); } },
    productName: { get: function () { return browser.element("h1[class*='h-text']"); } },

    getProductBrand: { value: function() {
            return this.productBrand.getText();
        } },

    getProductName: { value: function() {
            return this.productName.getText();
        } },

    clickOnFirstAvailableSize: { value: function() {
            this.sizeDropDown.click();
            this.firstAvailableSize.click();
        } },

    addToShoppingCart: { value: function() {
            this.addToShoppingCartButton.click();
        } },

    goToShoppingCart: { value: function() {
            this.goToShoppingCartButton.click();
            return ShoppingCartPage;
        } }
});

module.exports = ProductDetailPage;