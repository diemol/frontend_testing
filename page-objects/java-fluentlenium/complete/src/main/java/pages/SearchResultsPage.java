package pages;

import org.fluentlenium.core.FluentPage;
import org.fluentlenium.core.annotation.Page;
import org.openqa.selenium.By;

import java.util.concurrent.TimeUnit;

@SuppressWarnings("unused")
public class SearchResultsPage extends FluentPage {

    @Page
    private ProductDetailPage productDetailPage;

    public ProductDetailPage clickOnFirstProduct() {
        find(By.cssSelector("z-grid[class='z-nvg-cognac_articles'] > z-grid-item:first-child")).click();
        return productDetailPage;
    }
}
