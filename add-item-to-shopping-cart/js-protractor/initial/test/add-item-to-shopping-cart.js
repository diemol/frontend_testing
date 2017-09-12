describe('Add item to Shopping Cart', function() {
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
});

