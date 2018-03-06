package pages;

import org.fluentlenium.core.FluentPage;
import org.fluentlenium.core.annotation.Page;
import org.openqa.selenium.By;

import java.util.concurrent.TimeUnit;

@SuppressWarnings("FieldCanBeLocal")
public class ProductDetailPage extends FluentPage {

    @SuppressWarnings("unused")
    @Page
    private ShoppingCartPage shoppingCartPage;

    public String getProductBrand() {
        return find(By.cssSelector("h2[class*='h-color-black'][class*='detail']")).first().text();
    }

    public String getProductName() {
        return find(By.cssSelector("h1[class*='h-text']")).first().text();
    }

    public void selectFirstAvailableSize() {
        find(By.cssSelector(".h-container.h-dropdown-placeholder")).click();
        String sizeSelector = "h5[class*='h-color-black'][class*='title-4'][class*='h-all-caps']";
        await().atMost(5, TimeUnit.SECONDS).until(el(sizeSelector)).present();
        find(By.cssSelector("h5[class*='h-color-black'][class*='title-4'][class*='h-all-caps']")).click();
    }

    public void addToShoppingCart() {
        find(By.cssSelector("#z-pdp-topSection-addToCartButton")).click();
    }

    public ShoppingCartPage goToShoppingCart() {
        String goToShoppingCartSelector = "a[class='z-navicat-header_navToolItemLink']";
        await().atMost(5, TimeUnit.SECONDS).until(el(goToShoppingCartSelector)).present();
        find(By.cssSelector("a[class='z-navicat-header_navToolItemLink']")).click();
        return shoppingCartPage;
    }
}
