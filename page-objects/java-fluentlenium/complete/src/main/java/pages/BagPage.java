package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class BagPage {

    private WebDriver webDriver;

    @FindBy(name = "cart.product.name")
    private WebElement articleName;

    public BagPage(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(this.webDriver, this);
    }

    public String getArticleName() {
        return articleName.getText();
    }
}
