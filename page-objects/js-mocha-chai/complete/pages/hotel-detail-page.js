var webDriver = require('selenium-webdriver');
var By = webDriver.By;

var BookingDetailsPage = require('./booking-details-page.js');

HotelDetailPage = function HotelDetailPage(driver) {
    this.driver = driver;
    this.bookNowButtons = By.css("button.btn.btn-action.btn-block.chk");
};

HotelDetailPage.prototype.bookFirstRoom = function() {
    this.driver.findElements(this.bookNowButtons).then(function(bookNowButtons) {
        bookNowButtons[0].isDisplayed().then(function(isDisplayed) {
            if (!isDisplayed) {
                var actions = new webDriver.ActionSequence(driver);
                actions.mouseMove(bookNowButtons[0]);
                actions.perform();
            }
        });
        bookNowButtons[0].click();
    });
    return new BookingDetailsPage(this.driver);
};

module.exports = HotelDetailPage;
