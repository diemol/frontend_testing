package pages;

import org.fluentlenium.core.FluentPage;
import org.fluentlenium.core.domain.FluentList;
import org.fluentlenium.core.domain.FluentWebElement;
import org.openqa.selenium.By;

import static org.assertj.core.api.Assertions.assertThat;

public class ShoppingCartPage extends FluentPage {

    private final String PRODUCT_INFO = "z-coast-fjord_link";

    public String getProductBrand() {
        return find(By.className(PRODUCT_INFO)).get(1).text();
    }

    public String getProductName() {
        return find(By.className(PRODUCT_INFO)).last().text();
    }

}
