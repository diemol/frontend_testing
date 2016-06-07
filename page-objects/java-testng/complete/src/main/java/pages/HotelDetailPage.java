package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

@SuppressWarnings("MismatchedQueryAndUpdateOfCollection")
public class HotelDetailPage {
    private WebDriver webDriver;

    @FindBy(css = "button.btn.btn-action.btn-block.chk")
    private List<WebElement> bookNowButtons;

    public HotelDetailPage(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(this.webDriver, this);
    }

    public BookingDetailsPage bookFirstRoom() {
        if (!bookNowButtons.get(0).isDisplayed()) {
            Actions actions = new Actions(webDriver);
            actions.moveToElement(bookNowButtons.get(0));
            actions.perform();
        }
        bookNowButtons.get(0).click();
        return new BookingDetailsPage(this.webDriver);
    }

}
