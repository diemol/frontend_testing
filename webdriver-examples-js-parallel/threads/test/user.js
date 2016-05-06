// Getting the Chai expect library for assertions
var expect = require('chai').expect;

// Create a new instance of WebDriver and other helpful methods from WebDriver
var webDriver = require('selenium-webdriver');
var By = webDriver.By;
var until = webDriver.until;

var createDriver = require('./base').createDriver;

describe('User Test', function() {
    this.timeout(60000);

    it('Register user should leave new user logged in', function(done) {

        var driver = createDriver(this._runnable.title);

        // Go to the register page
        driver.get("http://phptravels.net/register");

        // Filling up the form to Sign Up
        driver.findElement(By.name("firstname")).sendKeys("John");
        driver.findElement(By.name("lastname")).sendKeys("Doe");
        driver.findElement(By.name("phone")).sendKeys("+1223456789");
        var randomEmail = Math.random().toString(36).substring(7) + "@example.com";
        driver.findElement(By.name("email")).sendKeys(randomEmail);
        var randomPassword = Math.random().toString(36).substring(10);
        driver.findElement(By.name("password")).sendKeys(randomPassword);
        driver.findElement(By.name("confirmpassword")).sendKeys(randomPassword);
        //Click on "Sign Up"
        var signUpButton = driver.findElement(By.css("button.signupbtn.btn_full.btn.btn-primary.btn-block.btn-lg"));
        signUpButton.click();
        // After Signing Up, we assert that we are logged in by checking the name displayed on the user page
        var welcomeMessage = driver.wait(until.elementLocated(By.css("h3.RTL"), 10000));
        var expectedWelcomeMessage = "Hi, John Doe";
        welcomeMessage.getText().then(function(welcomeText) {
            expect(welcomeText).to.equal(expectedWelcomeMessage);
        });

        // Quitting the browser and invoking the callback function to tell Mocha that we are done
        driver.quit().then(done);
    });

});

