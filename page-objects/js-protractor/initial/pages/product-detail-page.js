ProductDetailPage = function ArticleDetailPage() {
    this.productContent = element(by.className('z-vegas-ui_article-brand-info_content'));
    this.productInfoBrand = this.productContent.all(by.css('.z-vegas-ui_text.z-vegas-ui_text-standard'));
};

ProductDetailPage.prototype.getProductBrand = function() {
    return this.productInfoBrand.first().getText();
};

ProductDetailPage.prototype.getProductName = function() {
    return this.productInfoBrand.last().getText();
};

module.exports = ProductDetailPage;
