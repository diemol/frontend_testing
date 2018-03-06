var HomePage = require('../pageobjects/home.page');
var assert = require('chai').assert;

describe('login form', function () {
    var SearchResultsPage;
    var ProductDetailPage;
    var ShoppingCartPage;
    var expectedProductBrand;
    var expectedProductName;


    it('Loading https://www.zalando.de/...', function () {
        HomePage.open();
    });

    it('Type Nike in the search field...', function () {
        SearchResultsPage = HomePage.search('Nike');
    });

    it('Click on the first item..."', function () {
        ProductDetailPage = SearchResultsPage.clickOnFirstElement();
    });

    it('Click on the first available size...', function () {
        ProductDetailPage.clickOnFirstAvailableSize();
        expectedProductBrand = ProductDetailPage.getProductBrand();
        expectedProductName = ProductDetailPage.getProductName();
    });

    it('Get product name and brand...', function () {
        expectedProductBrand = ProductDetailPage.getProductBrand();
        expectedProductName = ProductDetailPage.getProductName();
    });

    it('Add product to shopping cart...', function () {
        ProductDetailPage.addToShoppingCart();
    });

    it('Go to shopping cart...', function () {
        ShoppingCartPage = ProductDetailPage.goToShoppingCart();
    });

    it('Get product brand and name...', function () {
        const productBrand = ShoppingCartPage.getProductBrand();
        const productName = ShoppingCartPage.getProductName();
        assert.include(productBrand, expectedProductBrand);
        assert.include(productName, expectedProductName);
    });


});