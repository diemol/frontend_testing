package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

public class SearchResultsPage {

    @SuppressWarnings("FieldCanBeLocal")
    private WebDriver webDriver;

    @SuppressWarnings("MismatchedQueryAndUpdateOfCollection")
    @FindBy(className = "catalogArticlesList_productBox")
    private List<WebElement> articlesList;

    public SearchResultsPage(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(this.webDriver, this);
    }

    public ArticleDetailPage clickOnFirstArticle() {
        articlesList.get(0).click();
        return new ArticleDetailPage(this.webDriver);
    }
}
