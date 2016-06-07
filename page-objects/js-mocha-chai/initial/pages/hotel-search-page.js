var webDriver = require('selenium-webdriver');
var By = webDriver.By;

HotelSearchPage = function HotelSearchPage(driver) {
    this.driver = driver;
    this.locationField = By.className("select2-chosen");
    this.locationInput = By.css("input.select2-input.select2-focused");
    this.checkInField = By.name("checkin");
    this.checkOutField = By.name("checkout");
    this.searchButton = By.css("button.btn.btn-block.btn-action");
    this.hotelsResult = By.css("button[type='submit'][class='btn btn-action']");
};

HotelSearchPage.prototype.visit = function() {
    this.driver.get('http://phptravels.net/hotels');
    return webDriver.promise.fulfilled(true);
};

HotelSearchPage.prototype.enterLocation = function(location) {
    this.driver.findElement(this.locationField).click();
    this.driver.findElement(this.locationInput).sendKeys(location);
    this.driver.findElement(this.locationInput).sendKeys(webDriver.Key.ENTER);
};

HotelSearchPage.prototype.setCheckInDate = function(date) {
    setDate(this.driver.findElement(this.checkInField), date);
};

HotelSearchPage.prototype.setCheckoutDate = function(date) {
    setDate(this.driver.findElement(this.checkOutField), date);
};

HotelSearchPage.prototype.search = function() {
    this.driver.findElement(this.searchButton).click();
};

HotelSearchPage.prototype.clickOnFirstHotel = function() {
    this.driver.findElements(this.hotelsResult).then(function(hotelsResult){
        hotelsResult[0].click();
    });
};

function setDate(webElement, date) {
    webElement.clear();
    webElement.sendKeys(formatDate(date));
    webElement.click();
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}

module.exports = HotelSearchPage;