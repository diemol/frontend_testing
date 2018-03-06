var assert = require('assert');

describe('Add item to Shopping Cart', function() {

    it('Loading https://www.zalando.de/...', function () {
        browser.windowHandleMaximize();
        browser.url('https://www.zalando.de');
    });

    it('Type Nike in the search field...', function () {
        const searchFieldSelector = ".z-navicat-header_searchInput";
        const searchField = $(searchFieldSelector);
        searchField.setValue('Nike');
        searchField.click();
        browser.keys('Enter');
    });

    it('Click on the first item..."', function () {
        const firstElementSelector = "z-grid[class='z-nvg-cognac_articles'] > z-grid-item:first-child";
        browser.click(firstElementSelector);
    });

    it('Get product brand and name...', function () {
        const expectedProductBrand = browser.getText("h2[class*='h-color-black'][class*='detail']");
        const expectedProductName = browser.getText("h1[class*='h-text']");
        console.log("expectedProductBrand -> " + expectedProductBrand);
        console.log("expectedProductName -> " + expectedProductName);
    });

    it('Click on the first available size...', function () {
        const sizeDropDownSelector = ".h-container.h-dropdown-placeholder";
        browser.click(sizeDropDownSelector);
        const firstAvailableSizeSelector = "h5[class*='h-color-black'][class*='title-4'][class*='h-all-caps']";
        browser.click(firstAvailableSizeSelector);
    });

    it('Add product to shopping cart...', function () {
        const addToShoppingCartSelector = "#z-pdp-topSection-addToCartButton";
        browser.click(addToShoppingCartSelector);
    });

    it('Go to shopping cart...', function () {
        const goToShoppingCartSelector = "a[class='z-navicat-header_navToolItemLink']";
        browser.waitForVisible(goToShoppingCartSelector, 10000);
        browser.click(goToShoppingCartSelector);
        const goToCheckoutButton = "button[data-id='z-coast-fjord_proceedToCheckout-bottom']";
        browser.waitForVisible(goToCheckoutButton);
    });

    it('Get product brand and name...', function () {
        const productInfo = browser.elements(".z-coast-fjord_link");
        const productBrand = productInfo.value[1].getText();
        const productName = productInfo.value[2].getText();
        console.log("productBrand -> " + productBrand);
        console.log("productName -> " + productName);
    });

});