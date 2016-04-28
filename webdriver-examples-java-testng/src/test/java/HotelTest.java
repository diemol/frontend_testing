import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class HotelTest extends BaseTest {

    @Test
    public void bookHotelAndSelectPayAtHotelShouldLeaveBookingReserved() throws InterruptedException {
        System.out.println("Running test");
        // Click on the 'Hotels' tab using the CSS selector syntax "css=<HTML tag><[attribute=Value of attribute]>"
        WebElement hotelsTab = webDriver.findElement(By.cssSelector("a[href='#HOTELS']"));
        hotelsTab.click();
        // Click on the 'Select Location' field
        WebElement locationField = webDriver.findElement(By.className("select2-chosen"));
        locationField.click();
        // Getting a random location from the list of locations
        List<WebElement> locations = webDriver.findElements(By.className("select2-result-label"));
        int randomIndex;
        String randomLocation;
        do {
            randomIndex = getRandomInt(locations.size());
            randomLocation = locations.get(randomIndex).getText();
        } while (randomLocation.equalsIgnoreCase("Select Location"));
        // Type the location on the location field
        WebElement locationInput = webDriver.findElement(By.cssSelector("input.select2-input.select2-focused"));
        locationInput.sendKeys(randomLocation);
        locationInput.sendKeys(Keys.RETURN);
        // Select the dates
        Date checkIn = getFutureDate(new Date());
        Date checkOut = getFutureDate(checkIn);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
        WebElement checkInField = webDriver.findElement(By.name("checkin"));
        WebElement checkOutField = webDriver.findElement(By.name("checkout"));
        checkInField.clear();
        checkInField.sendKeys(simpleDateFormat.format(checkIn));
        checkInField.click();
        checkOutField.clear();
        checkOutField.sendKeys(simpleDateFormat.format(checkOut));
        checkOutField.click();
        // Click on search
        WebElement searchButton = webDriver.findElement(By.cssSelector("button[type='submit'][class*='btn-primary']"));
        searchButton.click();
        // In the results page, click on one of the hotels
        List<WebElement> hotelsResult = webDriver.findElements(By.cssSelector("button.bookbtn.mt1"));
        randomIndex = getRandomInt(hotelsResult.size());
        hotelsResult.get(randomIndex).click();
        // In the hotel detail page, click on one of the "Book Now" buttons
        List<WebElement> bookNowButtons = webDriver.findElements(By.cssSelector("button.btn.btn-primary.btn-block.chk"));
        randomIndex = getRandomInt(bookNowButtons.size());
        if (!bookNowButtons.get(randomIndex).isDisplayed()) {
            Actions actions = new Actions(webDriver);
            actions.moveToElement(bookNowButtons.get(randomIndex));
            actions.perform();
        }
        bookNowButtons.get(randomIndex).click();
        // Fill out the "Book as a Guest" fields
        webDriver.findElement(By.name("firstname")).sendKeys("John");
        webDriver.findElement(By.name("lastname")).sendKeys("Doe");
        webDriver.findElement(By.name("email")).sendKeys("john@doe.com");
        webDriver.findElement(By.name("confirmemail")).sendKeys("john@doe.com");
        webDriver.findElement(By.name("phone")).sendKeys("+1223456789");
        webDriver.findElement(By.name("address")).sendKeys("Street 10 SW 33, Miami");
        webDriver.findElement(By.name("additionalnotes")).sendKeys("Testing a hotel booking for a guest user.");
        // Click on "Confirm this Booking"
        WebElement confirmBooking = webDriver.findElement(By.name("guest"));
        confirmBooking.click();
        // Click on "Pay on Arrival", we need to wait a bit for the button to show up
        WebDriverWait wait = new WebDriverWait(webDriver, 10);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button[class*='btn-arrival']")));
        // Lets take the status of the payment and assert it, it should be not paid
        WebElement paymentStatus = webDriver.findElement(By.cssSelector("b.text-warning.wow.flash.animted"));
        Assert.assertEquals(paymentStatus.getText(), "Unpaid", "Payment status should be Unpaid.");
        WebElement payOnArrivalButton = webDriver.findElement(By.cssSelector("button[class*='btn-arrival']"));
        payOnArrivalButton.click();
        // Accept the popup message
        webDriver.switchTo().alert().accept();
        // Assert the payment status, to be reserved
        wait.until(ExpectedConditions.invisibilityOfElementWithText(By.cssSelector("b.text-warning.wow.flash.animted"),
                paymentStatus.getText()));
        paymentStatus = webDriver.findElement(By.cssSelector("b.text-warning.wow.flash.animted"));
        Assert.assertEquals(paymentStatus.getText(), "Reserved", "Payment status should be Reserved.");
    }

}
