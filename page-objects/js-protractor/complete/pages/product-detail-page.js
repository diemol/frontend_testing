var ShoppingCartPage = require('./shopping-cart-page.js');

ProductDetailPage = function ProductDetailPage() {
    this.newPdp = false;
    this.productNameLocator = '.z-hlwd-text.z-hlwd-color-black.title-2.z-hlwd-clamp-2';
    this.productBrandLocator = '.z-hlwd-text.z-hlwd-color-black.detail.z-hlwd-p-bottom-xs.z-hlwd-bold.z-hlwd-truncate';
    var productName = element(by.css(this.productNameLocator));
    productName.isPresent().then(function (isPresent) {
        if (isPresent) {
            this.newPdp = true;
        } else {
            this.productNameLocator = '.z-text.zvui-product-title-productname.z-text-block.z-text-body.z-text-black';
            this.productBrandLocator = '.z-text.zvui-product-title-brandname.z-text-block.z-text-body.z-text-black';
        }
    });

};

ProductDetailPage.prototype.getProductBrand = function() {
    return element(by.css(this.productBrandLocator)).getText();
};

ProductDetailPage.prototype.getProductName = function() {
    return element(by.css(this.productNameLocator)).getText();
};

ProductDetailPage.prototype.selectFirstAvailableSize = function() {
    var sizeDropDown = element(by.css('.z-hlwd-container.z-hlwd-dropdown-placeholder.z-hlwd-align-left'));
    sizeDropDown.click();
    var availableSizes = element.all(by.css('div[class="z-hlwd-size-picker-option-section z-hlwd-col-9"] > h5[class="z-hlwd-text z-hlwd-color-black title-4 z-hlwd-all-caps"]'));
    availableSizes.first().click();
};

ProductDetailPage.prototype.addToShoppingCart = function() {
    var buttonLocator = 'z-pdp-topSection-addToCartButton';
    var button = element(by.id(buttonLocator));
    button.click();
};

ProductDetailPage.prototype.goToShoppingCart = function() {
    var shoppingCart = element(by.css('a[tracking="click.header.cart"]'));
    shoppingCart.click();
    return new ShoppingCartPage();
};

module.exports = ProductDetailPage;
