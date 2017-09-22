
ShoppingCartPage = function ShoppingCartPage() {
    this.productInfo = element.all(by.className('z-coast-fjord_link'));
    this.productBrand = this.productInfo.get(1);
    this.productName = this.productInfo.last();
};

ShoppingCartPage.prototype.getProductName = function() {
    return this.productName.getText();
};

ShoppingCartPage.prototype.getProductBrand = function() {
    return this.productBrand.getText();
};


module.exports = ShoppingCartPage;
