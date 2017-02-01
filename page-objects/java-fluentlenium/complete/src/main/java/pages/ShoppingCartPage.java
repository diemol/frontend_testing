package pages;

import org.fluentlenium.core.FluentPage;
import org.openqa.selenium.By;

public class ShoppingCartPage extends FluentPage {

    private final String PRODUCT_INFO = "z-coast-fjord_link";
    private final String PRODUCT_NAME = ".z-text.z-text-default";

    public String getProductBrand() {
        return find(By.className(PRODUCT_INFO)).get(1).text();
    }

    public String getProductName() {
        return find(By.className(PRODUCT_INFO)).last().find(By.cssSelector(PRODUCT_NAME)).text();
    }

}
