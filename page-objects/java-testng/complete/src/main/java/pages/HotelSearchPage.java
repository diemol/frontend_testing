package pages;

import com.google.common.base.Function;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@SuppressWarnings("MismatchedQueryAndUpdateOfCollection")
public class HotelSearchPage {

    private WebDriver webDriver;

    @FindBy(className = "select2-chosen")
    private WebElement locationField;

    @FindBy(css = "input.select2-input.select2-focused")
    private WebElement locationInput;

    @FindBy(name = "checkin")
    private WebElement checkInField;

    @FindBy(name = "checkout")
    private WebElement checkOutField;

    @FindBy(css = "button.btn.btn-block.btn-action")
    private WebElement searchButton;

    @FindBy(css = "button[type='submit'][class='btn btn-action']")
    private List<WebElement> hotelsResult;


    public HotelSearchPage(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(this.webDriver, this);
    }

    public void visit() {
        this.webDriver.get("http://phptravels.net/hotels");
    }

    public void enterLocation(String location) {
        locationField.click();

        locationInput.sendKeys(location);

        locationInput.sendKeys(Keys.RETURN);
    }

    public void setCheckInDate(Date date) {
        setDate(this.checkInField, date);
    }

    public void setCheckoutDate(Date date) {
        setDate(this.checkOutField, date);
    }

    public void search() {
        // We can press the "Enter" key in the checkout date to already search
        checkOutField.sendKeys(Keys.ENTER);
        // searchButton.click();
    }

    public HotelDetailPage clickOnFirstHotel() {
        final String currentUrl = this.webDriver.getCurrentUrl();
        WebDriverWait wait = new WebDriverWait(this.webDriver, 10);
        wait.until(new Function<WebDriver, Boolean>() {
            public Boolean apply(WebDriver webDriver) {
                if (webDriver.getCurrentUrl().equalsIgnoreCase(currentUrl)) {
                    hotelsResult.get(0).click();
                    return false;
                }
                return true;
            }
        });

        return new HotelDetailPage(webDriver);
    }

    private void setDate(WebElement webElement, Date date) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
        webElement.clear();
        webElement.sendKeys(simpleDateFormat.format(date));
        webElement.click();
    }

}
