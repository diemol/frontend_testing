package pages;

import com.google.common.base.Function;
import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.concurrent.TimeUnit;

public class BookingConfirmationPage {

    private WebDriver webDriver;

    private By paymentStatusLocator = By.cssSelector("b.text-warning.wow.flash.animted");

    @FindBy(css = "button[class*='btn-arrival']")
    private WebElement payOnArrivalButton;

    public BookingConfirmationPage(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(this.webDriver, this);

        // Wait for the page to load completely with this simple check
        WebDriverWait wait = new WebDriverWait(this.webDriver, 10);
        wait.until(ExpectedConditions.visibilityOf(this.payOnArrivalButton));
    }

    public String getPaymentStatus() {
        Wait<WebDriver> fluentWait = new FluentWait<WebDriver>(this.webDriver)
                .withTimeout(10, TimeUnit.SECONDS)
                .pollingEvery(2, TimeUnit.SECONDS)
                .ignoring(StaleElementReferenceException.class);

        return fluentWait.until(new Function<WebDriver, String>() {
            public String apply(WebDriver webDriver) {
                WebElement paymentStatus = webDriver.findElement(paymentStatusLocator);
                return paymentStatus.getText();
            }
        });
    }

    public boolean isBookingReserved() {
        try {
            WebDriverWait wait = new WebDriverWait(webDriver, 10);
            wait.until(ExpectedConditions.invisibilityOfElementWithText(paymentStatusLocator, "Unpaid"));
        } catch (Exception e) {
            return false;
        }
        return "Reserved".equalsIgnoreCase(this.getPaymentStatus());
    }

    public void clickPayOnArrival() {
        payOnArrivalButton.click();
        webDriver.switchTo().alert().accept();
    }
}
