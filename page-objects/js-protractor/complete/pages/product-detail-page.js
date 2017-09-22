var ShoppingCartPage = require('./shopping-cart-page.js');

ProductDetailPage = function ProductDetailPage() {
    this.productNameLocator = '.z-hlwd-text.z-hlwd-color-black.title-2.z-hlwd-clamp-2';
    this.productBrandLocator = '.z-hlwd-text.z-hlwd-color-black.detail.z-hlwd-p-bottom-xs.z-hlwd-bold.z-hlwd-truncate';
    this.sizeDropDownLocator = '.z-hlwd-container.z-hlwd-dropdown-placeholder.z-hlwd-align-left';
    this.availableSizesLocator = 'h5[class="z-hlwd-text z-hlwd-color-black title-4  z-hlwd-all-caps"]';
    this.buttonLocator = 'z-pdp-topSection-addToCartButton';
    this.shoppingCartLocator = 'a[tracking="click.header.cart"]';
};

ProductDetailPage.prototype.getProductBrand = function() {
    return element(by.css(this.productBrandLocator)).getText();
};

ProductDetailPage.prototype.getProductName = function() {
    return element(by.css(this.productNameLocator)).getText();
};

ProductDetailPage.prototype.selectFirstAvailableSize = function() {
    var sizeDropDown = element(by.css(this.sizeDropDownLocator));
    sizeDropDown.click();
    var availableSizes = element.all(by.css(this.availableSizesLocator));
    availableSizes.first().click();
};

ProductDetailPage.prototype.addToShoppingCart = function() {
    var button = element(by.id(this.buttonLocator));
    button.click();
};

ProductDetailPage.prototype.goToShoppingCart = function() {
    var shoppingCart = element(by.css(this.shoppingCartLocator));
    shoppingCart.click();
    return new ShoppingCartPage();
};

module.exports = ProductDetailPage;
