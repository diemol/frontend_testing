package pages;

import org.fluentlenium.core.FluentPage;
import org.fluentlenium.core.annotation.Page;
import org.openqa.selenium.By;

public class ProductDetailPage extends FluentPage {

    @Page
    private ShoppingCartPage shoppingCartPage;

    private final String PRODUCT_CONTENT = "z-vegas-ui_article-brand-info_content";
    private final String PRODUCT_INFO_BRAND = ".z-vegas-ui_text.z-vegas-ui_text-standard";

    public String getProductBrand() {
        return find(By.className(PRODUCT_CONTENT)).find(By.cssSelector(PRODUCT_INFO_BRAND)).first().text();
    }

    public String getProductName() {
        return find(By.className(PRODUCT_CONTENT)).find(By.cssSelector(PRODUCT_INFO_BRAND)).last().text();
    }

    public void selectFirstAvailableSize() {
        find(By.className("z-vegas-ui_dropover-facet")).click();
        String availableSize = ".z-vegas-ui_sizeDropdown_sizeListItem.z-vegas-ui_sizeDropdown_sizeListItem-available";
        find(By.cssSelector(availableSize)).first().click();
    }

    public void addToShoppingCart() {
        find(By.cssSelector(".z-button.z-button-primary.z-button-button.z-button_mouse")).click();
    }

    public ShoppingCartPage goToShoppingCart() {
        // Not possible to get a visible unique element for the shopping cart, and there are currently 5 elements
        // with the same class. The shopping cart is the last one. The test may break when they change the order.
        find(By.cssSelector("div[class='z-navicat-header_userAccNaviItem']")).last().click();
        return shoppingCartPage;
    }
}
