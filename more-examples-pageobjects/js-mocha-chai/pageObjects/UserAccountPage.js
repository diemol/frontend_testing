var webDriver = require('selenium-webdriver');
var By = webDriver.By;

UserAccountPage = function UserAccountPage(driver) {
    this.driver = driver;
    this.welcomeMessage = By.css("h3.RTL");
};

UserAccountPage.prototype.getWelcomeMessage = function() {
    var d = webDriver.promise.defer();
    this.driver.findElement(this.welcomeMessage).getText().then(function (text) {
        d.fulfill(text);
    });
    return d.promise;
};

module.exports = UserAccountPage;