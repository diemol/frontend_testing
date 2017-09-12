describe('Add item to Shopping Cart', function() {

    var expectedProductBrand;
    var expectedProductName;
    var newPdp = false;

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
        var firstItem = element.all(by.className('catalogArticlesList_item'));
        firstItem.isPresent().then(function (isPresent) {
            if (isPresent) {
                firstItem.first().click();
            } else {
                firstItem = element.all(by.css('z-grid[class=z-nvg-cognac_articles]')).first();
                firstItem.click();
            }
        });
    });


    it('Get article brand and name', function() {
        var productNameLocator = '.z-hlwd-text.z-hlwd-color-black.title-2.z-hlwd-clamp-2';
        var productBrandLocator = '.z-hlwd-text.z-hlwd-color-black.detail.z-hlwd-p-bottom-xs.z-hlwd-bold.z-hlwd-truncate';
        var productName = element(by.css(productNameLocator));
        var productBrand = element(by.css(productBrandLocator));
        productName.isPresent().then(function (isPresent) {
            if (isPresent) {
                newPdp = true;
            } else {
                productNameLocator = '.z-text.zvui-product-title-productname.z-text-block.z-text-body.z-text-black';
                productBrandLocator = '.z-text.zvui-product-title-brandname.z-text-block.z-text-body.z-text-black';
                productName = element(by.css(productNameLocator));
                productBrand = element(by.css(productBrandLocator));
            }
            expectedProductName = productName.getText();
            expectedProductBrand = productBrand.getText();
        });
    });

    it('Click the first available size', function() {
        if (newPdp) {
            var sizeDropDown = element(by.css('.z-hlwd-container.z-hlwd-dropdown-placeholder.z-hlwd-align-left'));
            sizeDropDown.click();
            var availableSizes = element.all(by.css('div[class="z-hlwd-size-picker-option-section z-hlwd-col-9"] > h5[class="z-hlwd-text z-hlwd-color-black title-4 z-hlwd-all-caps"]'));
            availableSizes.first().click();
        } else {
            var sizeSelector = element(by.css('.zvui-size-select-dropdown-placeholder'));
            sizeSelector.click();
            // var availableSizes = element.all(by.css('.z-hlwd-text.z-hlwd-color-black.title-4.z-hlwd-all-caps'));
            // availableSizes.first().click();
        }
    });

    it('Add product to shopping cart', function() {
        var buttonLocator = 'z-pdp-topSection-addToCartButton';
        var button = element(by.id(buttonLocator));
        button.click();
    });

    it('Go to shopping cart', function() {
        var shoppingCart = element(by.css('a[tracking="click.header.cart"]'));
        shoppingCart.click();
    });

    it('Assert article brand and name', function() {
        var productInfo = element.all(by.className('z-coast-fjord_link'));
        var productBrand = productInfo.get(1);
        expect(expectedProductBrand).toEqual(productBrand.getText());
        var articleName = productInfo.last().getText();
        expect(articleName).toContain(expectedProductName);
    });
});