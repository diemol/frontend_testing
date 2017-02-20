describe('Add item to Shopping Cart', function() {

    var expectedArticleBrand;
    var expectedArticleName;

    beforeEach(function() {
        // Needed since we are not testing an Angular app.
        browser.ignoreSynchronization = true;
    });

    it('Load Zalando home page', function() {
        browser.driver.manage().window().maximize();
        browser.get('https://www.zalando.de/');
        expect(browser.getTitle()).toEqual('Schuhe & Mode online kaufen | ZALANDO Online Shop');
    });

    it('Type Nike in the search field', function() {
        element(by.id('searchContent')).sendKeys('Nike');
        element(by.id('searchContent')).submit();
    });

    it('Click on the first item', function() {
        var firstItem = element.all(by.className('catalogArticlesList_item')).first();
        firstItem.click();
    });

    it('Get article brand and name', function() {
        var productContent = element(by.className('z-vegas-ui_article-brand-info_content'));
        expectedProductBrand = productContent.element(by.css('.z-vegas-ui_text.z-vegas-ui_text-vegas-detail-title')).getText();
        expectedProductName = productContent.element(by.css('.z-vegas-ui_text.z-vegas-ui_text-vegas-body')).getText();
    });
});

