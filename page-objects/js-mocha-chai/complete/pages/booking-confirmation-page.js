var webDriver = require('selenium-webdriver');
var By = webDriver.By;
var until = webDriver.until;

BookingConfirmationPage = function BookingConfirmationPage(driver) {
    this.driver = driver;
    this.payOnArrival = By.css("button[class*='btn-arrival']");
    this.paymentStatus = By.css("b.text-warning.wow.flash.animted");
};

BookingConfirmationPage.prototype.payOnArrival = function() {
    this.driver.wait(until.elementLocated(this.payOnArrival, 10000));
    this.driver.findElement(this.payOnArrival).click();
    this.driver.switchTo().alert().accept();
};

BookingConfirmationPage.prototype.getPaymentStatus = function() {
    this.driver.wait(until.stalenessOf(this.driver.findElement(this.paymentStatus)), 5000);
    var paymentStatus = this.driver.wait(until.elementLocated(this.paymentStatus, 3000));
    return paymentStatus.getText();
};

module.exports = BookingConfirmationPage;