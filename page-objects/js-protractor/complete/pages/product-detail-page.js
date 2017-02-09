var ShoppingCartPage = require('./shopping-cart-page.js');

ProductDetailPage = function ProductDetailPage() {
    this.productContent = element(by.className('z-vegas-ui_article-brand-info_content'));
    this.productInfoBrand = this.productContent.all(by.css('.z-vegas-ui_text.z-vegas-ui_text-standard'));
    this.availableSize = '.z-vegas-ui_sizeDropdown_sizeListItem.z-vegas-ui_sizeDropdown_sizeListItem-available';
    this.availableSizeLocator = element.all(by.css(this.availableSize));
    this.addToShoppingCartButtonLocator = '.z-button.z-button-primary.z-button-button.z-button_mouse';
    this.addToShoppingCartButton = element(by.css(this.addToShoppingCartButtonLocator));
    this.shoppingCart = element.all(by.css('div[class="z-navicat-header_userAccNaviItem"]')).last();
    this.sizeDropDownListLocator = by.className('z-vegas-ui_dropover-facet');
    this.availableSizesLocator = by.css('.z-vegas-ui_sizeItem.z-vegas-ui_interactable.z-vegas-ui_sizeList_listItem');
};

ProductDetailPage.prototype.getProductBrand = function() {
    return this.productInfoBrand.first().getText();
};

ProductDetailPage.prototype.getProductName = function() {
    return this.productInfoBrand.last().getText();
};

ProductDetailPage.prototype.selectFirstAvailableSize = function() {
    var self = this;
    element(self.sizeDropDownListLocator).isPresent().then(function (isPresent) {
        if (isPresent) {
            element(self.sizeDropDownListLocator).click();
            self.availableSizeLocator.first().click();
        } else {
            element.all(self.availableSizesLocator).first().click();
        }
    });
};

ProductDetailPage.prototype.addToShoppingCart = function() {
    this.addToShoppingCartButton.click();
};

ProductDetailPage.prototype.goToShoppingCart = function() {
    this.shoppingCart.click();
    return new ShoppingCartPage();
};

module.exports = ProductDetailPage;
