package pages;

import org.fluentlenium.core.FluentPage;
import org.openqa.selenium.By;

public class SearchResultsPage extends FluentPage {

    public void clickOnFirstProduct() {
        find(By.cssSelector("z-grid[class='z-nvg-cognac_articles'] > z-grid-item:first-child")).click();
    }

}
