var webDriver = require('selenium-webdriver');
var By = webDriver.By;

var UserAccountPage = require('./UserAccountPage.js');

LoginPage = function LoginPage(driver) {
    this.driver = driver;
    this.firstName = By.name("firstname");
    this.lastName = By.name("lastname");
    this.phone = By.name("phone");
    this.email = By.name("email");
    this.password = By.name("password");
    this.confirmPassword = By.name("confirmpassword");
    this.signUp = By.css("button.signupbtn.btn_full.btn.btn-primary.btn-block.btn-lg");
};

LoginPage.prototype.visit = function() {
    this.driver.get('http://phptravels.net/register');
    return webDriver.promise.fulfilled(true);
};

LoginPage.prototype.setFirstName = function(fName) {
    this.driver.findElement(this.firstName).sendKeys(fName);
};

LoginPage.prototype.setLastName = function(lName) {
    this.driver.findElement(this.lastName).sendKeys(lName);
};

LoginPage.prototype.setPhone = function(phoneNumber) {
    this.driver.findElement(this.phone).sendKeys(phoneNumber);
};

LoginPage.prototype.setEmail = function(emailAddress) {
    this.driver.findElement(this.email).sendKeys(emailAddress);
};

LoginPage.prototype.setPassword = function(pwd) {
    this.driver.findElement(this.password).sendKeys(pwd);
};

LoginPage.prototype.setConfirmPassword = function(confirmPws) {
    this.driver.findElement(this.confirmPassword).sendKeys(confirmPws);
};

LoginPage.prototype.clickSignUp = function() {
    this.driver.findElement(this.signUp).click();
    return new UserAccountPage(this.driver);
};

module.exports = LoginPage;