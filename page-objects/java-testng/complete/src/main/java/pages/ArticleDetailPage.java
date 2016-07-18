package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

public class ArticleDetailPage {

    @SuppressWarnings("FieldCanBeLocal")
    private WebDriver webDriver;

    @FindBy(id = "sizeSelect")
    private WebElement sizeSelect;

    @FindBy(css = "li[class='available sizeLine']")
    private List<WebElement> availableSizes;

    @FindBy(css = "span[itemprop='brand']")
    private WebElement articleBrand;

    @FindBy(css = "span[itemprop='name']")
    private WebElement articleName;

    @FindBy(id = "ajaxAddToCartBtn")
    private WebElement addToBagButton;

    @FindBy(name = "head.text:cart.x:4.y:1")
    private WebElement goToBagButton;

    public ArticleDetailPage(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(this.webDriver, this);
    }

    public void selectFirstAvailableSize() {
        sizeSelect.click();
        availableSizes.get(0).click();
    }

    public String getArticleName() {
        return articleBrand.getText() + " " + articleName.getText();
    }

    public void addToBag() {
        addToBagButton.click();
    }

    public BagPage goToBag() {
        goToBagButton.click();
        return new BagPage(this.webDriver);
    }
}
