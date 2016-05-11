package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;
import java.util.Random;

public class HotelSearchResultsPage {

    private WebDriver webDriver;

    @FindBy(css = "button.bookbtn.mt1")
    private List<WebElement> hotelsResult;

    public HotelSearchResultsPage(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(this.webDriver, this);
    }

    public HotelDetailPage selectRandomHotel() {
        int randomIndex = new Random().nextInt(hotelsResult.size());
        if (!hotelsResult.get(randomIndex).isDisplayed()) {
            Actions actions = new Actions(webDriver);
            actions.moveToElement(hotelsResult.get(randomIndex));
            actions.perform();
        }
        hotelsResult.get(randomIndex).click();
        return new HotelDetailPage(this.webDriver);
    }

}
