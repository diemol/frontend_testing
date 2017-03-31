package pages;

import org.fluentlenium.core.FluentPage;
import org.fluentlenium.core.annotation.Page;
import org.openqa.selenium.By;

import java.util.concurrent.TimeUnit;

public class SearchResultsPage extends FluentPage {

    @Page
    private ProductDetailPage productDetailPage;

    public ProductDetailPage clickOnFirstProduct() {
        By catalogArticlesList_item = By.className("catalogArticlesList_item");
        await().atMost(20, TimeUnit.SECONDS).until(find(catalogArticlesList_item).first()).enabled();
        find(catalogArticlesList_item).first().click();
        return productDetailPage;
    }
}
