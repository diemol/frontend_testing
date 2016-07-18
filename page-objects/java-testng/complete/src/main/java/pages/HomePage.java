package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class HomePage {

    private WebDriver webDriver;

    @FindBy(id = "searchContent")
    private WebElement searchField;

    public HomePage(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(this.webDriver, this);
    }

    public void visit() {
        this.webDriver.get("https://www.zalando.de/");
    }

    public SearchResults search(String searchText) {
        searchField.sendKeys(searchText);
        searchField.submit();
        return new SearchResults(this.webDriver);
    }
}
