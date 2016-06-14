var webDriver = require('selenium-webdriver');
var By = webDriver.By;

var BookingConfirmationPage = require('./booking-confirmation-page.js');

BookingDetailsPage = function BookingDetailsPage(driver) {
    this.driver = driver;
    this.firstName = By.name("firstname");
    this.lastName = By.name("lastname");
    this.phone = By.name("phone");
    this.email = By.name("email");
    this.confirmEmail = By.name("confirmemail");
    this.address = By.name("address");
    this.countryBox = By.className("select2-chosen");
    this.country = By.css("input.select2-input");
    this.additionalNotes = By.name("additionalnotes");
    this.confirmBookingLocator = By.name("guest");
};

BookingDetailsPage.prototype.setFirstName = function(fName) {
    this.driver.findElement(this.firstName).sendKeys(fName);
};

BookingDetailsPage.prototype.setLastName = function(lName) {
    this.driver.findElement(this.lastName).sendKeys(lName);
};

BookingDetailsPage.prototype.setPhone = function(phoneNumber) {
    this.driver.findElement(this.phone).sendKeys(phoneNumber);
};

BookingDetailsPage.prototype.setEmail = function(emailAddress) {
    this.driver.findElement(this.email).sendKeys(emailAddress);
};

BookingDetailsPage.prototype.setConfirmEmail = function(emailAddress) {
    this.driver.findElement(this.confirmEmail).sendKeys(emailAddress);
};

BookingDetailsPage.prototype.setAddress = function(address) {
    this.driver.findElement(this.address).sendKeys(address);
};

BookingDetailsPage.prototype.setAdditionalNotes = function(notes) {
    this.driver.findElement(this.additionalNotes).sendKeys(notes);
};

BookingDetailsPage.prototype.setCountry = function(country) {
    this.driver.findElement(this.countryBox).click();
    this.driver.findElement(this.country).sendKeys(country);
    this.driver.findElement(this.country).sendKeys(webDriver.Key.ENTER);
};


BookingDetailsPage.prototype.confirmBooking = function() {
    var theDriver = this.driver;
    var confirmBookingElement = this.driver.findElement(this.confirmBookingLocator);
    confirmBookingElement.isDisplayed().then(function(isDisplayed) {
        if (!isDisplayed) {
            var actions = new webDriver.ActionSequence(theDriver);
            actions.mouseMove(confirmBookingElement);
            actions.perform();
        }
    });
    confirmBookingElement.click();
    return new BookingConfirmationPage(this.driver);
};

module.exports = BookingDetailsPage;