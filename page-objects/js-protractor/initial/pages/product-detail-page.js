ProductDetailPage = function ArticleDetailPage() {
    this.productContent = element(by.className('z-vegas-ui_article-brand-info_content'));
};

ProductDetailPage.prototype.getProductBrand = function() {
    return this.productContent.element(by.css('.z-vegas-ui_text.z-vegas-ui_text-vegas-detail-title')).getText();
};

ProductDetailPage.prototype.getProductName = function() {
    return this.productContent.element(by.css('.z-vegas-ui_text.z-vegas-ui_text-vegas-body')).getText();
};

module.exports = ProductDetailPage;
