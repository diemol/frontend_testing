import org.openqa.selenium.*;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pages.BookingConfirmationPage;
import pages.BookingDetailsPage;
import pages.HotelDetailPage;
import pages.HotelSearchPage;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Calendar;
import java.util.Date;

public class HotelBookingTest {

    // Setting the url for the WebDriver
    public static final String DOCKER_MACHINE_HOST = System.getenv("DOCKER_MACHINE_HOST");
    public static final String URL = String.format("http://%s:4444//wd/hub", DOCKER_MACHINE_HOST);
    public WebDriver webDriver;

    @BeforeMethod
    public void startWebDriver() throws MalformedURLException {
        DesiredCapabilities desiredCapabilities = DesiredCapabilities.chrome();
        desiredCapabilities.setCapability(CapabilityType.PLATFORM, Platform.LINUX);

        webDriver = new RemoteWebDriver(new URL(URL), desiredCapabilities);

        webDriver.manage().window().maximize();
    }

    @AfterMethod
    public void quitBrowser() {
        webDriver.quit();
    }

    @Test
    public void bookHotelAndSelectPayAtHotelShouldLeaveBookingReserved() {

        // Go to the homepage
        HotelSearchPage hotelSearchPage = new HotelSearchPage(webDriver);
        hotelSearchPage.visit();

        // Enter "London" as location
        hotelSearchPage.enterLocation("London");

        // Enter check in and checkout dates
        Date checkIn = getFutureDate(new Date());
        Date checkOut = getFutureDate(checkIn);
        hotelSearchPage.setCheckInDate(checkIn);
        hotelSearchPage.setCheckoutDate(checkOut);

        // Search
        hotelSearchPage.search();

        // Click on the first listed hotel
        HotelDetailPage hotelDetailPage = hotelSearchPage.clickOnFirstHotel();

        // In the hotel detail page, click on the first "Book Now" button
        BookingDetailsPage bookingDetailsPage = hotelDetailPage.bookFirstRoom();

        // Fill out the "Book as a Guest" fields and confirm booking
        bookingDetailsPage.setFirstName("John");
        bookingDetailsPage.setLastName("Doe");
        bookingDetailsPage.setEmail("john@doe.com");
        bookingDetailsPage.setConfirmEmail("john@doe.com");
        bookingDetailsPage.setPhone("+1223456789");
        bookingDetailsPage.setAddress("Street 10 SW 33, Miami");
        bookingDetailsPage.setCountry("United States");
        bookingDetailsPage.setAdditionalNotes("Testing a hotel booking for a guest user.");
        BookingConfirmationPage bookingConfirmationPage = bookingDetailsPage.clickConfirmBooking();

        // Confirm the booking and assert the payment state
        bookingConfirmationPage.clickPayOnArrival();
        Assert.assertEquals(bookingConfirmationPage.getPaymentStatus(), "Reserved", "Payment status should be " +
                "Reserved.");
    }

    // Method to get a future date (useful for the checkin and checkout dates)
    public Date getFutureDate(Date baseDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(baseDate);
        calendar.add(Calendar.DATE, 5);
        return calendar.getTime();
    }


}
