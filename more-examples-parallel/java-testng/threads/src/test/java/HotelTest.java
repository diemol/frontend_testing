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
        // Click on the 'Hotels' tab using the CSS selector syntax "css=<HTML tag><[attribute=Value of attribute]>"
        WebElement hotelsTab = getWebDriver().findElement(By.cssSelector("a[href='#HOTELS']"));
        hotelsTab.click();
        // Click on the 'Select Location' field
        WebElement locationField = getWebDriver().findElement(By.className("select2-chosen"));
        locationField.click();
        // Getting a random location from the list of locations
        List<WebElement> locations = getWebDriver().findElements(By.className("select2-result-label"));
        int randomIndex;
        String randomLocation;
        do {
            randomIndex = getRandomInt(locations.size());
            randomLocation = locations.get(randomIndex).getText();
        } while (randomIndex == 0);
        // Type the location on the location field
        WebElement locationInput = getWebDriver().findElement(By.cssSelector("input.select2-input.select2-focused"));
        locationInput.sendKeys(randomLocation);
        locationInput.sendKeys(Keys.RETURN);
        // Select the dates
        Date checkIn = getFutureDate(new Date());
        Date checkOut = getFutureDate(checkIn);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
        WebElement checkInField = getWebDriver().findElement(By.name("checkin"));
        WebElement checkOutField = getWebDriver().findElement(By.name("checkout"));
        checkInField.clear();
        checkInField.sendKeys(simpleDateFormat.format(checkIn));
        checkInField.click();
        checkOutField.clear();
        checkOutField.sendKeys(simpleDateFormat.format(checkOut));
        checkOutField.click();
        // Click on search
        WebElement searchButton = getWebDriver().findElement(By.cssSelector("button[type='submit'][class*='btn-primary']"));
        searchButton.click();
        // In the results page, click on one of the hotels
        List<WebElement> hotelsResult = getWebDriver().findElements(By.cssSelector("button.bookbtn.mt1"));
        randomIndex = getRandomInt(hotelsResult.size());
        hotelsResult.get(randomIndex).click();
        // In the hotel detail page, click on one of the "Book Now" buttons
        List<WebElement> bookNowButtons = getWebDriver().findElements(By.cssSelector("button.btn.btn-primary.btn-block.chk"));
        randomIndex = getRandomInt(bookNowButtons.size());
        if (!bookNowButtons.get(randomIndex).isDisplayed()) {
            Actions actions = new Actions(getWebDriver());
            actions.moveToElement(bookNowButtons.get(randomIndex));
            actions.perform();
        }
        bookNowButtons.get(randomIndex).click();
        // Fill out the "Book as a Guest" fields
        getWebDriver().findElement(By.name("firstname")).sendKeys("John");
        getWebDriver().findElement(By.name("lastname")).sendKeys("Doe");
        getWebDriver().findElement(By.name("email")).sendKeys("john@doe.com");
        getWebDriver().findElement(By.name("confirmemail")).sendKeys("john@doe.com");
        getWebDriver().findElement(By.name("phone")).sendKeys("+1223456789");
        getWebDriver().findElement(By.name("address")).sendKeys("Street 10 SW 33, Miami");
        getWebDriver().findElement(By.name("additionalnotes")).sendKeys("Testing a hotel booking for a guest user.");
        // Click on "Confirm this Booking"
        WebElement confirmBooking = getWebDriver().findElement(By.name("guest"));
        if (!confirmBooking.isDisplayed()) {
            Actions actions = new Actions(getWebDriver());
            actions.moveToElement(confirmBooking);
            actions.perform();
        }
        confirmBooking.click();
        // Click on "Pay on Arrival", we need to wait a bit for the button to show up
        WebDriverWait wait = new WebDriverWait(getWebDriver(), 10);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button[class*='btn-arrival']")));
        // Lets take the status of the payment and assert it, it should be not paid
        WebElement paymentStatus = getWebDriver().findElement(By.cssSelector("b.text-warning.wow.flash.animted"));
        Assert.assertEquals(paymentStatus.getText(), "Unpaid", "Payment status should be Unpaid.");
        WebElement payOnArrivalButton = getWebDriver().findElement(By.cssSelector("button[class*='btn-arrival']"));
        payOnArrivalButton.click();
        // Accept the popup message
        getWebDriver().switchTo().alert().accept();
        // Assert the payment status, to be reserved
        wait.until(ExpectedConditions.invisibilityOfElementWithText(By.cssSelector("b.text-warning.wow.flash.animted"),
                paymentStatus.getText()));
        paymentStatus = getWebDriver().findElement(By.cssSelector("b.text-warning.wow.flash.animted"));
        Assert.assertEquals(paymentStatus.getText(), "Reserved", "Payment status should be Reserved.");
    }

}
