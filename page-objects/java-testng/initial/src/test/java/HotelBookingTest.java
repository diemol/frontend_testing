import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pages.HotelSearchPage;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class HotelBookingTest {

    // Setting the url for the WebDriver
    public static final String DOCKER_MACHINE_HOST = (System.getenv("DOCKER_MACHINE_HOST") == null) ?
            "localhost" : System.getenv("DOCKER_MACHINE_HOST");
    public static final String URL = String.format("http://%s:4444/wd/hub", DOCKER_MACHINE_HOST);
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
        hotelSearchPage.clickOnFirstHotel();

        // In the hotel detail page, click on the first "Book Now" button
        List<WebElement> bookNowButtons = webDriver.findElements(By.cssSelector("button.btn.btn-action.btn-block.chk"));
        if (!bookNowButtons.get(0).isDisplayed()) {
            Actions actions = new Actions(webDriver);
            actions.moveToElement(bookNowButtons.get(0));
            actions.perform();
        }
        bookNowButtons.get(0).click();

        // Fill out the "Book as a Guest" fields
        webDriver.findElement(By.name("firstname")).sendKeys("John");
        webDriver.findElement(By.name("lastname")).sendKeys("Doe");
        webDriver.findElement(By.name("email")).sendKeys("john@doe.com");
        webDriver.findElement(By.name("confirmemail")).sendKeys("john@doe.com");
        webDriver.findElement(By.name("phone")).sendKeys("+1223456789");
        webDriver.findElement(By.name("address")).sendKeys("Street 10 SW 33, Miami");
        webDriver.findElement(By.className("select2-chosen")).click();
        By countryLocator = By.cssSelector("input.select2-input");
        webDriver.findElement(countryLocator).sendKeys("United States");
        webDriver.findElement(countryLocator).sendKeys(Keys.RETURN);
        webDriver.findElement(By.name("additionalnotes")).sendKeys("Testing a hotel booking for a guest user.");

        // Click on "Confirm this Booking"
        WebElement confirmBooking = webDriver.findElement(By.name("guest"));
        confirmBooking.click();

        // Click on "Pay on Arrival", we need to wait a bit for the button to show up
        WebDriverWait wait = new WebDriverWait(webDriver, 10);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button[class*='btn-arrival']")));
        WebElement payOnArrivalButton = webDriver.findElement(By.cssSelector("button[class*='btn-arrival']"));
        payOnArrivalButton.click();

        // Accept the popup message
        webDriver.switchTo().alert().accept();

        // Assert the payment status, to be reserved
        By paymentStatusLocator = By.cssSelector("b.text-warning.wow.flash.animted.animated");
        wait.until(ExpectedConditions.invisibilityOfElementWithText(paymentStatusLocator, "Unpaid"));
        WebElement paymentStatus = webDriver.findElement(paymentStatusLocator);
        Assert.assertEquals(paymentStatus.getText(), "Reserved", "Payment status should be Reserved.");

    }

    // Method to get a future date (useful for the checkin and checkout dates)
    public Date getFutureDate(Date baseDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(baseDate);
        calendar.add(Calendar.DATE, 5);
        return calendar.getTime();
    }


}
