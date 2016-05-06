// Getting the Chai expect library for assertions
var expect = require('chai').expect;

// Create a new instance of WebDriver and other helpful methods from WebDriver
var webDriver = require('selenium-webdriver');
var By = webDriver.By;
var until = webDriver.until;

var makeSuite = require('./base').makeSuite;
var formatDate = require('./base').formatDate;

makeSuite('Hotel Test', function() {
    it('Book hotel and select pay at hotel should leave booking reserved', function(done) {

        // Click on the 'Hotels' tab using the CSS selector syntax "css=<HTML tag><[attribute=Value of attribute]>"
        var hotelsTab = driver.findElement(By.css("a[href='#HOTELS']"));
        hotelsTab.click();
        // Click on the 'Select Location' field
        var locationField = driver.findElement(By.className("select2-chosen"));
        locationField.click();
        driver.findElements(By.className("select2-result-label")).then(function(locations) {
            var randomIndex = 0;
            var randomLocation = '';
            do {
                randomIndex = Math.floor((Math.random() * locations.length));
                randomLocation = locations[randomIndex].getText();
            } while (randomIndex == 0);
            // Type the location on the location field
            var locationInput = driver.findElement(By.css("input.select2-input.select2-focused"));
            locationInput.sendKeys(randomLocation);
            locationInput.sendKeys(webDriver.Key.ENTER);
        });
        // Select the dates
        var checkIn = new Date();
        checkIn.setDate(checkIn.getDate() + 3);
        var checkOut = new Date();
        checkOut.setDate(checkIn.getDate() + 2);
        var checkInField = driver.findElement(By.name("checkin"));
        var checkOutField = driver.findElement(By.name("checkout"));
        checkInField.clear();
        checkInField.sendKeys(formatDate(checkIn));
        checkInField.click();
        checkOutField.clear();
        checkOutField.sendKeys(formatDate(checkOut));
        checkOutField.click();
        // Click on search
        var searchButton = driver.findElement(By.css("button[type='submit'][class*='btn-primary']"));
        searchButton.click();
        // In the results page, click on one of the hotels
        driver.findElements(By.css("button.bookbtn.mt1")).then(function(hotelsResult){
            var randomIndex = Math.floor((Math.random() * hotelsResult.length));
            hotelsResult[randomIndex].click();
        });
        // In the hotel detail page, click on one of the "Book Now" buttons
        driver.findElements(By.css("button.btn.btn-primary.btn-block.chk")).then(function(bookNowButtons) {
            var randomIndex = Math.floor((Math.random() * bookNowButtons.length));
            bookNowButtons[randomIndex].isDisplayed().then(function(isDisplayed) {
                if (!isDisplayed) {
                    var actions = new webDriver.ActionSequence(driver);
                    actions.mouseMove(bookNowButtons[randomIndex]);
                    actions.perform();
                }
            });
            bookNowButtons[randomIndex].click();
        });
        // Fill out the "Book as a Guest" fields
        driver.findElement(By.name("firstname")).sendKeys("John");
        driver.findElement(By.name("lastname")).sendKeys("Doe");
        driver.findElement(By.name("email")).sendKeys("john@doe.com");
        driver.findElement(By.name("confirmemail")).sendKeys("john@doe.com");
        driver.findElement(By.name("phone")).sendKeys("+1223456789");
        driver.findElement(By.name("address")).sendKeys("Street 10 SW 33, Miami");
        driver.findElement(By.name("additionalnotes")).sendKeys("Testing a hotel booking for a guest user.");
        // Click on "Confirm this Booking"
        var confirmBooking = driver.findElement(By.name("guest"));
        confirmBooking.click();
        // Lets take the status of the payment and assert it, it should be not paid
        var paymentStatus = driver.wait(until.elementLocated(By.css("b.text-warning.wow.flash.animted")), 10000);
        paymentStatus.getText().then(function(status) {
            expect(status).to.equal('Unpaid');
        });
        // Click on "Pay on Arrival", we need to wait a bit for the button to show up
        var payOnArrivalButton = driver.wait(until.elementLocated(By.css("button[class*='btn-arrival']"), 10000));
        payOnArrivalButton.click();
        // Accept the popup message
        // driver.switchTo().alert().accept();
        driver.switchTo().alert().accept();
        // To assert the payment status again, we need to wait until the element disappears and appears again
        driver.sleep(1000 * 3); // Bad practice in general, but nothing else worked for the case
        paymentStatus = driver.wait(until.elementLocated(By.css("b.text-warning.wow.flash.animted"), 2000));
        paymentStatus.getText().then(function(status) {
            expect(status).to.equal('Reserved');
            done();
        });
    });
});

