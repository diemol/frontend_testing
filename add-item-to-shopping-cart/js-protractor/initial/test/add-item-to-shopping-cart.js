describe('Add item to Shopping Cart', function() {
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
});

