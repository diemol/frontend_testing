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
        var articleContent = element(by.className('z-vegas-ui_article-brand-info_content'));
        var articleInfoBrand = articleContent.all(by.css('.z-vegas-ui_text.z-vegas-ui_text-standard'));
        expectedArticleBrand = articleInfoBrand.first().getText();
        expectedArticleName = articleInfoBrand.last().getText();
    });

    it('Click on select size drop down', function() {
        element(by.className('z-vegas-ui_dropover-facet')).click();
    });

    it('Click on the first available size', function() {
        var availableSize = '.z-vegas-ui_sizeDropdown_sizeListItem.z-vegas-ui_sizeDropdown_sizeListItem-available';
        var availableSizeLocator = element.all(by.css(availableSize)).first();
        availableSizeLocator.click();
    });

    it('Add product to shopping cart', function() {
        var button = '.z-button.z-button-primary.z-button-button.z-button_mouse';
        element(by.css(button)).click();
    });

    it('Go to shopping cart', function() {
        // Not possible to get a visible unique element for the shopping cart, and there are currently 5 elements
        // with the same class. The shopping cart is the last one. The test may break when they change the order.
        var shoppingCart = element.all(by.css('div[class="z-navicat-header_userAccNaviItem"]')).last();
        shoppingCart.click();
    });

    it('Assert article brand and name', function() {
        var articleInfo = element.all(by.className('z-coast-fjord_link'));
        var articleBrand = articleInfo.get(1);
        articleBrand.getText().then(function (text) {
            expect(expectedArticleBrand).toEqual(text.toUpperCase());
        });
        var articleName = articleInfo.last().element(by.css('.z-text.z-text-default')).getText();
        expect(expectedArticleName).toEqual(articleName);
    });
});

