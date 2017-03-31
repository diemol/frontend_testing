package pages;

import org.fluentlenium.core.FluentPage;
import org.fluentlenium.core.annotation.Page;
import org.openqa.selenium.By;

@SuppressWarnings("FieldCanBeLocal")
public class ProductDetailPage extends FluentPage {

    @SuppressWarnings("unused")
    @Page
    private ShoppingCartPage shoppingCartPage;

    private final String PRODUCT_CONTENT = "z-vegas-ui_article-brand-info_content";
    private final String PRODUCT_BRAND = ".z-vegas-ui_text.z-vegas-ui_text-vegas-detail-title";
    private final String PRODUCT_NAME = ".z-vegas-ui_text.z-vegas-ui_text-vegas-body";

    public String getProductBrand() {
        return find(By.className(PRODUCT_CONTENT)).find(By.cssSelector(PRODUCT_BRAND)).text();
    }

    public String getProductName() {
        return find(By.className(PRODUCT_CONTENT)).find(By.cssSelector(PRODUCT_NAME)).text();
    }

    public void selectFirstAvailableSize() {
        By zVegasDropOverFacet = By.className("z-vegas-ui_dropover-facet");
        if (find(zVegasDropOverFacet).present()) {
            find(zVegasDropOverFacet).click();
            String availableSize = ".z-vegas-ui_sizeDropdown_sizeListItem.z-vegas-ui_sizeDropdown_sizeListItem-available";
            By availableSizeLocator = By.cssSelector(availableSize);
            find(availableSizeLocator).first().click();
        } else {
            By listItem = By.cssSelector(".z-vegas-ui_sizeItem.z-vegas-ui_interactable.z-vegas-ui_sizeList_listItem");
            find(listItem).first().click();
        }
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
