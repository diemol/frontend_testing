describe('Add item to Shopping Cart', function() {

    var expectedProductBrand;
    var expectedProductName;

    beforeEach(function() {
        // Needed since we are not testing an Angular app.
        browser.ignoreSynchronization = true;
    });

    it('Load Zalando home page', function() {
        browser.driver.manage().window().maximize();
        browser.get('https://www.zalando.de/');
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
        expectedProductBrand = element(by.css('.z-text-block.zvui-product-title-brandname.z-text.z-text-body.z-text-black')).getText();
        expectedProductName = element(by.css('.z-text-block.zvui-product-title-productname.z-text.z-text-body.z-text-black')).getText();
    });

    it('Click the first available size', function() {
        var sizeDropDown = element.all(by.className('zvui-size-select-dropdown-placeholder')).first();
        sizeDropDown.isPresent().then(function (isPresent) {
            if (isPresent) {
                sizeDropDown.click();
                var availableSizeLocator = element.all(by.className("zvui-size-select-dropdown-option")).first();
                availableSizeLocator.click();
            } else {
                var availableSizes = element.all(by.css('.z-vegas-ui_sizeItem.z-vegas-ui_interactable.z-vegas-ui_sizeList_listItem'));
                availableSizes.first().click();
            }
        });
    });

    it('Add product to shopping cart', function() {
        var button = '.z-richButton.z-richButton-primary';
        element(by.css(button)).click();
    });

    it('Go to shopping cart', function() {
        // Not possible to get a visible unique element for the shopping cart, and there are currently 5 elements
        // with the same class. The shopping cart is the last one. The test may break when they change the order.
        var shoppingCart = element.all(by.css('div[class="z-navicat-header_userAccNaviItem"]')).last();
        shoppingCart.click();
    });

    it('Assert article brand and name', function() {
        var productInfo = element.all(by.className('z-coast-fjord_link'));
        var productBrand = productInfo.get(1);
        expect(expectedProductBrand).toEqual(productBrand.getText());
        var articleName = productInfo.last().element(by.css('.z-text.z-text-default')).getText();
        expect(expectedProductName).toEqual(articleName);
    });
});

