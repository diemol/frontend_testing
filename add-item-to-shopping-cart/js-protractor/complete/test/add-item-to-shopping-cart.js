describe('Add item to Shopping Cart', function() {

    var expectedProductBrand;
    var expectedProductName;

    beforeEach(function() {
        // Needed since we are not testing an Angular app.
        browser.ignoreSynchronization = true;
    });

    it('Load Zalando home page', function() {
        browser.driver.manage().window().maximize();
        browser.get('https://www.zalando.de/mosaic-mosaic-catalog');
    });

    it('Type Nike in the search field', function() {
        element(by.id('searchContent')).sendKeys('Adidas');
        element(by.id('searchContent')).submit();
    });

    it('Click on the first item', function() {
        var firstItem = element.all(by.css('z-grid[class=z-nvg-cognac_articles]')).first();
        firstItem.click();
    });


    it('Get article brand and name', function() {
        var productNameLocator = '.z-hlwd-text.z-hlwd-color-black.title-2.z-hlwd-clamp-2';
        var productBrandLocator = '.z-hlwd-text.z-hlwd-color-black.detail.z-hlwd-p-bottom-xs.z-hlwd-bold.z-hlwd-truncate';
        var productName = element(by.css(productNameLocator));
        var productBrand = element(by.css(productBrandLocator));
        expectedProductName = productName.getText();
        expectedProductBrand = productBrand.getText();
    });

    it('Click the first available size', function() {
        var sizeDropDown = element(by.css('.z-hlwd-container.z-hlwd-dropdown-placeholder.z-hlwd-align-left'));
        sizeDropDown.click();
        var availableSizes = element.all(by.css('h5[class="z-hlwd-text z-hlwd-color-black title-4  z-hlwd-all-caps"]'));
        availableSizes.first().click();
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
        var produceNameName = productInfo.last().getText();
        expect(produceNameName).toContain(expectedProductName);
    });
});