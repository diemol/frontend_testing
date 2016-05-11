package pageObjects;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

public class HomePage {

    private WebDriver webDriver;

    @FindBy(css = "a[href='#HOTELS']")
    private WebElement hotelsTab;

    @FindBy(className = "select2-chosen")
    private WebElement locationField;

    @FindBy(className = "select2-result-label")
    private List<WebElement> locations;

    @FindBy(css = "input.select2-input.select2-focused")
    private WebElement locationInput;

    @FindBy(name = "checkin")
    private WebElement checkInField;

    @FindBy(name = "checkout")
    private WebElement checkOutField;

    @FindBy(css = "button[type='submit'][class*='btn-primary']")
    private WebElement searchButton;

    public HomePage(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(this.webDriver, this);
    }

    public void visit() {
        this.webDriver.get("http://phptravels.net/");
    }

    public void clickHotelsTab() {
        hotelsTab.click();
    }

    public void selectRandomLocation() {
        this.locationField.click();
        int randomIndex;
        String randomLocation;
        do {
            randomIndex = new Random().nextInt(this.locations.size());
            randomLocation = locations.get(randomIndex).getText();
        } while (randomIndex == 0);
        this.locationInput.sendKeys(randomLocation);
        this.locationInput.sendKeys(Keys.RETURN);
    }

    public void setCheckInDate(Date date) {
        setDate(this.checkInField, date);
    }

    public void setCheckoutDate(Date date) {
        setDate(this.checkOutField, date);
    }

    public HotelSearchResultsPage clickSearch() {
        this.searchButton.click();
        return new HotelSearchResultsPage(this.webDriver);
    }

    private void setDate(WebElement webElement, Date date) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
        webElement.clear();
        webElement.sendKeys(simpleDateFormat.format(date));
        webElement.click();
    }

}
