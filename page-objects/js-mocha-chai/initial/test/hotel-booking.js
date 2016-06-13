// Selenium Grid url
var dockerMachineHost = process.env.DOCKER_MACHINE_HOST;
var seleniumGridUrl = 'http://' + dockerMachineHost + ':4444/wd/hub';
var driver;

// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');
var By = webDriver.By;
var until = webDriver.until;

// Getting the Chai expect library for assertions
var expect = require('chai').expect;

// Page Objects
var HotelSearchPage = require('../pages/hotel-search-page.js');

const mochaTimeOut = 60000; //ms


describe('Hotel Booking', function(done) {
    this.timeout(mochaTimeOut);

    beforeEach(function() {
        var capabilities = new webDriver.Capabilities().
        set(webDriver.Capability.BROWSER_NAME, webDriver.Browser.CHROME).
        set(webDriver.Capability.PLATFORM, 'LINUX');

        driver = new webDriver.Builder()
            .withCapabilities(capabilities)
            .usingServer(seleniumGridUrl)
            .build();

        driver.manage().window().maximize().then(done);
    });

    it('Book hotel and select pay at hotel should leave booking reserved', function(done) {

        // Go to the hotels page
        var hotelSearchPage = new HotelSearchPage(driver);
        hotelSearchPage.visit();

        // Enter location
        hotelSearchPage.enterLocation("London");

        // Select the dates and search
        var checkIn = new Date();
        checkIn.setDate(checkIn.getDate() + 3);
        var checkOut = new Date();
        checkOut.setDate(checkIn.getDate() + 2);
        hotelSearchPage.setCheckInDate(checkIn);
        hotelSearchPage.setCheckoutDate(checkOut);
        hotelSearchPage.search();

        // In the results page, click on the first hotel
        driver.executeScript("return {state: jQuery.active}").then(function(result) {
            console.log(result.state);
        });
        driver.findElements(By.css("button[type='submit'][class='btn btn-action']")).then(function(hotelsResult){
            hotelsResult[0].click();
        });

        // In the hotel detail page, click on the first "Book Now" button
        driver.findElements(By.css("button.btn.btn-action.btn-block.chk")).then(function(bookNowButtons) {
            bookNowButtons[0].isDisplayed().then(function(isDisplayed) {
                if (!isDisplayed) {
                    var actions = new webDriver.ActionSequence(driver);
                    actions.mouseMove(bookNowButtons[0]);
                    actions.perform();
                }
            });
            bookNowButtons[0].click();
        });

        // Fill out the "Book as a Guest" fields
        driver.findElement(By.name("firstname")).sendKeys("John");
        driver.findElement(By.name("lastname")).sendKeys("Doe");
        driver.findElement(By.name("email")).sendKeys("john@doe.com");
        driver.findElement(By.name("confirmemail")).sendKeys("john@doe.com");
        driver.findElement(By.name("phone")).sendKeys("+1223456789");
        driver.findElement(By.name("address")).sendKeys("Street 10 SW 33, Miami");
        driver.findElement(By.className("select2-chosen")).click();
        driver.findElement(By.css("input.select2-input")).sendKeys("United States");
        driver.findElement(By.css("input.select2-input")).sendKeys(webDriver.Key.ENTER);
        driver.findElement(By.name("additionalnotes")).sendKeys("Testing a hotel booking for a guest user.");

        // Click on "Confirm this Booking"
        var confirmBooking = driver.findElement(By.name("guest"));
        confirmBooking.click();

        // Click on "Pay on Arrival", we need to wait a bit for the button to show up
        var payOnArrivalButton = driver.wait(until.elementLocated(By.css("button[class*='btn-arrival']"), 10000));
        payOnArrivalButton.click();

        // Accept the popup message
        driver.switchTo().alert().accept();

        // To assert the payment status again, we need to wait until the element disappears and appears again
        driver.wait(until.stalenessOf(driver.findElement(By.css("b.text-warning.wow.flash.animted"))), 5000);
        var paymentStatus = driver.wait(until.elementLocated(By.css("b.text-warning.wow.flash.animted"), 3000));
        paymentStatus.getText().then(function(status) {
            expect(status).to.equal('Reserved');
            done();
        });

    });

    afterEach(function(done) {
        // Quitting the browser
        driver.quit().then(done);
    });
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}
