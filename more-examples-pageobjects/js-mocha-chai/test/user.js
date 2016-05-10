// Getting the Chai expect library for assertions
var expect = require('chai').expect;

// Create a new instance of WebDriver and other helpful methods from WebDriver
var webDriver = require('selenium-webdriver');
var By = webDriver.By;
var until = webDriver.until;

var createDriver = require('./base').createDriver;
var LoginPage = require('../pageObjects/LoginPage.js');
var UserAccountPage = require('../pageObjects/UserAccountPage.js');

describe('User Test', function() {
    this.timeout(60000);

    it('Register user should leave new user logged in', function(done) {

        var driver = createDriver(this._runnable.title);

        var loginPage = new LoginPage(driver);

        // Go to the register page
        loginPage.visit();

        // Filling up the form to Sign Up
        loginPage.setFirstName("John");
        loginPage.setLastName("Doe");
        loginPage.setPhone("+1223456789");
        var randomEmail = Math.random().toString(36).substring(7) + "@example.com";
        loginPage.setEmail(randomEmail);
        var randomPassword = Math.random().toString(36).substring(10);
        loginPage.setPassword(randomPassword);
        loginPage.setConfirmPassword(randomPassword);

        //Click on "Sign Up" and get the user account page
        var userAccountPage = loginPage.clickSignUp();

        // After Signing Up, we assert that we are logged in by checking the name displayed on the user page
        var expectedWelcomeMessage = "Hi, John Doe";
        userAccountPage.getWelcomeMessage().then(function(welcomeText) {
            expect(welcomeText).to.equal(expectedWelcomeMessage);
        });

        // Quitting the browser and invoking the callback function to tell Mocha that we are done
        driver.quit().then(done);
    });

});

