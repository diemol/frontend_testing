package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;
import java.util.Random;

public class HotelDetailPage {
    private WebDriver webDriver;

    @FindBy(css = "button.btn.btn-primary.btn-block.chk")
    private List<WebElement> bookNowButtons;

    public HotelDetailPage(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(this.webDriver, this);
    }

    public BookingDetailsPage bookRandomRoom() {
        int randomIndex = new Random().nextInt(bookNowButtons.size());
        if (!bookNowButtons.get(randomIndex).isDisplayed()) {
            Actions actions = new Actions(webDriver);
            actions.moveToElement(bookNowButtons.get(randomIndex));
            actions.perform();
        }
        bookNowButtons.get(randomIndex).click();
        return new BookingDetailsPage(this.webDriver);
    }
}
