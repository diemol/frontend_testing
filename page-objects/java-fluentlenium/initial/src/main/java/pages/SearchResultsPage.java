package pages;

import org.fluentlenium.core.FluentPage;
import org.fluentlenium.core.annotation.Page;
import org.openqa.selenium.By;

public class SearchResultsPage extends FluentPage {

    public void clickOnFirstProduct() {
        find(By.className("catalogArticlesList_item")).first().click();
    }
}
