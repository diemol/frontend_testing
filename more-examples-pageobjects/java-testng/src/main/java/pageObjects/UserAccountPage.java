package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class UserAccountPage {

    WebDriver webDriver;

    @FindBy(css = "h3.RTL")
    WebElement welcomeMessage;

    public UserAccountPage(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(this.webDriver, this);
    }

    public String getWelcomeMessage() {
        return welcomeMessage.getText();
    }
}
