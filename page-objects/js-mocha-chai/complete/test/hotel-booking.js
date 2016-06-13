// Selenium Grid url
var dockerMachineHost = (typeof process.env.DOCKER_MACHINE_HOST === "undefined") ?
    "localhost" : process.env.DOCKER_MACHINE_HOST;
var seleniumGridUrl = 'http://' + dockerMachineHost + ':4444/wd/hub';
var driver;

// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');

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
        var hotelDetailPage = hotelSearchPage.clickOnFirstHotel();

        // In the hotel detail page, click on the first "Book Now" button
        var bookingDetailsPage = hotelDetailPage.bookFirstRoom();

        // Fill out the "Book as a Guest" fields and confirm booking
        bookingDetailsPage.setFirstName("John");
        bookingDetailsPage.setLastName("Doe");
        bookingDetailsPage.setEmail("john@doe.com");
        bookingDetailsPage.setConfirmEmail("john@doe.com");
        bookingDetailsPage.setPhone("+1223456789");
        bookingDetailsPage.setAddress("Street 10 SW 33, Miami");
        bookingDetailsPage.setCountry("United States");
        bookingDetailsPage.setAdditionalNotes("Testing a hotel booking for a guest user.");
        var bookingConfirmationPage = bookingDetailsPage.confirmBooking();

        // Click on "Pay on Arrival"
        bookingConfirmationPage.payOnArrival();

        // To assert the payment status again, we need to wait until the element disappears and appears again
        bookingConfirmationPage.getPaymentStatus().then(function(status) {
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
