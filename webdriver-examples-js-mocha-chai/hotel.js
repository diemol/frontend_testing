// Getting the Chai expect library for assertions
var expect = require('chai').expect;

// Selenium Grid url
var seleniumGridUrl = 'http://192.168.99.100:4444/wd/hub';

// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');

describe('Hotel Test', function() {
    // Global timeout for Mocha to wait for the callback function to be invoked
    this.timeout(60000);

    it('Book hotel and select pay at hotel should leave booking reserved', function(done) {

        // We declare that we want to run the test on Firefox + Linux
        var capabilities = new webDriver.Capabilities().
        set(webDriver.Capability.BROWSER_NAME, webDriver.Browser.CHROME).
        set(webDriver.Capability.PLATFORM, 'LINUX');

        // Create the connection through WebDriver to the Selenium Grid
        var driver = new webDriver.Builder()
            .withCapabilities(capabilities)
            .usingServer(seleniumGridUrl)
            .build();

        driver.manage().window().maximize();
        // Go to PHPTravels website
        driver.get("http://phptravels.net/");

        // Click on the 'Hotels' tab using the CSS selector syntax "css=<HTML tag><[attribute=Value of attribute]>"
        var hotelsTab = driver.findElement(webDriver.By.css("a[href='#HOTELS']"));
        hotelsTab.click();
        // Click on the 'Select Location' field
        var locationField = driver.findElement(webDriver.By.className("select2-chosen"));
        locationField.click();
        driver.findElements(webDriver.By.className("select2-result-label")).then(function(locations) {
            var randomIndex = 0;
            var randomLocation = '';
            do {
                randomIndex = Math.floor((Math.random() * locations.length));
                randomLocation = locations[randomIndex].getText();
            } while (randomIndex == 0);
            // Type the location on the location field
            var locationInput = driver.findElement(webDriver.By.css("input.select2-input.select2-focused"));
            locationInput.sendKeys(randomLocation);
            locationInput.sendKeys(webDriver.Key.ENTER);
        });
        // Select the dates
        var checkIn = new Date();
        checkIn.setDate(checkIn.getDate() + 3);
        var checkOut = new Date();
        checkOut.setDate(checkIn.getDate() + 2);
        var checkInField = driver.findElement(webDriver.By.name("checkin"));
        var checkOutField = driver.findElement(webDriver.By.name("checkout"));
        checkInField.clear();
        checkInField.sendKeys(checkIn.getDate() + "/" + (checkIn.getMonth() + 1) + "/" + checkIn.getFullYear());
        checkInField.click();
        checkOutField.clear();
        checkOutField.sendKeys(checkOut.getDate() + "/" + (checkOut.getMonth() + 1) + "/" + checkOut.getFullYear());
        checkOutField.click();
        // Click on search
        var searchButton = driver.findElement(webDriver.By.css("button[type='submit'][class*='btn-primary']"));
        searchButton.click();
        driver.sleep(1000 * 5);
        // In the results page, click on one of the hotels
        driver.findElements(webDriver.By.css("button.bookbtn.mt1")).then(function(hotelsResult){
            var randomIndex = Math.floor((Math.random() * hotelsResult.length));
            hotelsResult[randomIndex].click();
        });
        // In the hotel detail page, click on one of the "Book Now" buttons
        driver.findElements(webDriver.By.css("button.btn.btn-primary.btn-block.chk")).then(function(bookNowButtons) {
            var randomIndex = Math.floor((Math.random() * bookNowButtons.length));
            if (!bookNowButtons[randomIndex].isDisplayed()) {
                var actions = new webDriver.ActionSequence(driver);
                actions.mouseMove(bookNowButtons[randomIndex]);
                // actions.moveToElement(bookNowButtons[randomIndex]);
                actions.perform();
            }
            bookNowButtons[randomIndex].click();
        });
        driver.sleep(1000 * 5);
        // Fill out the "Book as a Guest" fields
        driver.findElement(webDriver.By.name("firstname")).sendKeys("John");
        driver.findElement(webDriver.By.name("lastname")).sendKeys("Doe");
        driver.findElement(webDriver.By.name("email")).sendKeys("john@doe.com");
        driver.findElement(webDriver.By.name("confirmemail")).sendKeys("john@doe.com");
        driver.findElement(webDriver.By.name("phone")).sendKeys("+1223456789");
        driver.findElement(webDriver.By.name("address")).sendKeys("Street 10 SW 33, Miami");
        driver.findElement(webDriver.By.name("additionalnotes")).sendKeys("Testing a hotel booking for a guest user.");
        driver.sleep(1000 * 5);
        // Click on "Confirm this Booking"
        var confirmBooking = driver.findElement(webDriver.By.name("guest"));
        confirmBooking.click();
        driver.sleep(1000 * 5);
        // Lets take the status of the payment and assert it, it should be not paid
        driver.findElement(webDriver.By.css("b.text-warning.wow.flash.animted")).then(function(paymentStatus) {
            expect(paymentStatus.getText()).to.equal('Unpaid');
        });

        /*
        // Assert the title to the expected value
        driver.getTitle().then(function(title) {
            expect(title).to.equal('Travel Business Partner');
        });
        */

        // Quitting the browser and invoking the callback function to tell Jasmine that we are done
        driver.quit().then(done);
    });
});


/*

var makeSuite = require('./base').makeSuite;


makeSuite('Hotel Test', function() {

    it('Book hotel and select pay at hotel should leave booking reserved', function() {
        // Click on "Pay on Arrival", we need to wait a bit for the button to show up
        var payOnArrivalButton = driver.wait(webdriver.until.elementLocated(webdriver.By.css("button[class*='btn-arrival']"), 10000));
        payOnArrivalButton.click();
        // Accept the popup message
        driver.switchTo().alert().accept();
        // Assert the payment status, to be reserved
        driver.wait(webdriver.until.elementIsNotVisible(webdriver.By.css("b.text-warning.wow.flash.animted"), 10000));
        paymentStatus = driver.findElement(webdriver.By.css("b.text-warning.wow.flash.animted"));
        paymentStatus.getText().then(function(status) {
            expect(status).to.equal('Reserved');
        });

    });
});
*/