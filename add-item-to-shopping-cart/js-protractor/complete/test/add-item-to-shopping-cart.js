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
        var firstItem = element.all(by.className('catalogArticlesList_item')).first();
        firstItem.click();
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
        browser.sleep(1000 * 5);
    });


    /*
    it('Add article to bag and assert title', function(done) {

        // Get article name for further assertion
        var expectedArticleBrand = "";
        driver.findElement(By.css("span[itemprop='brand']")).getText().then(function(text) {
            expectedArticleBrand = text;
        });
        var expectedArticleName = "";
        driver.findElement(By.css("span[itemprop='name']")).getText().then(function(text) {
            expectedArticleName = text;
        });

        // Assert article's name and price
        driver.findElement(By.name("cart.product.name")).getText().then(function(actualArticleName) {
            var expectedArticleFullName = expectedArticleBrand + " " + expectedArticleName;
            expect(actualArticleName).to.equal(expectedArticleFullName, "Article name is different.");
            done();
        });
    });

    afterEach(function(done) {
        // Quitting the browser
        driver.quit().then(done);
    });
    */
});

