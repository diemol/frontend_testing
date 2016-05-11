import org.testng.Assert;
import org.testng.annotations.Test;
import pageObjects.*;

import java.util.Date;

public class HotelTest extends BaseTest {

    @Test
    public void bookHotelAndSelectPayAtHotelShouldLeaveBookingReserved() {

        // We go to the home page
        HomePage homePage = new HomePage(getWebDriver());
        homePage.visit();

        // Search for a hotel in a random location
        homePage.clickHotelsTab();
        homePage.selectRandomLocation();
        Date checkIn = getFutureDate(new Date());
        Date checkOut = getFutureDate(checkIn);
        homePage.setCheckInDate(checkIn);
        homePage.setCheckoutDate(checkOut);
        HotelSearchResultsPage hotelSearchResultsPage = homePage.clickSearch();

        // Select a random hotel
        HotelDetailPage hotelDetailPage = hotelSearchResultsPage.selectRandomHotel();

        // Select a random room
        BookingDetailsPage bookingDetailsPage = hotelDetailPage.bookRandomRoom();

        // Fill out the "Book as a Guest" fields
        bookingDetailsPage.setFirstName("John");
        bookingDetailsPage.setLastName("Doe");
        bookingDetailsPage.setEmail("john@doe.com");
        bookingDetailsPage.setConfirmEmail("john@doe.com");
        bookingDetailsPage.setPhone("+1223456789");
        bookingDetailsPage.setAddress("Street 10 SW 33, Miami");
        bookingDetailsPage.setAdditionalNotes("Testing a hotel booking for a guest user.");
        BookingConfirmationPage bookingConfirmationPage = bookingDetailsPage.clickConfirmBooking();

        // Confirm the booking and assert the payment state
        Assert.assertEquals(bookingConfirmationPage.getPaymentStatus(), "Unpaid", "Payment status should be Unpaid.");
        bookingConfirmationPage.clickPayOnArrival();
        Assert.assertEquals(bookingConfirmationPage.getPaymentStatus(), "Reserved", "Payment status should be " +
                 "Reserved.");

    }
}
