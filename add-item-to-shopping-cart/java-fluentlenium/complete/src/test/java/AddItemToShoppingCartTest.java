import org.fluentlenium.adapter.testng.FluentTestNg;
import org.fluentlenium.core.domain.FluentList;
import org.fluentlenium.core.domain.FluentWebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.Platform;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.Test;

import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import static org.assertj.core.api.Assertions.assertThat;

public class AddItemToShoppingCartTest extends FluentTestNg {

    private static final Logger LOG = Logger.getLogger(AddItemToShoppingCartTest.class.getName());

    @Override
    public String getRemoteUrl() {
        return "http://localhost:4444/wd/hub";
    }

    @Override
    public String getWebDriver() {
        return "remote";
    }

    @Override
    public Capabilities getCapabilities() {
        DesiredCapabilities desiredCapabilities = new DesiredCapabilities(new ChromeOptions());
        desiredCapabilities.setCapability(CapabilityType.PLATFORM_NAME, Platform.LINUX);
        return desiredCapabilities;
    }

    /*
        Go to Zalando home page, search for "Nike", click on the first product, add it to the basket and
        assert that the product name and value is the correct one.
     */
    @Test
    public void searchProductAndAddItToBag() {
        // Go to the homepage
        LOG.info("Loading https://www.zalando.de/...");
        window().maximize();
        goTo("https://www.zalando.de/");

        LOG.info("Type Nike in the search field...");
        find(By.cssSelector(".z-navicat-header_searchInput")).write("Nike").submit();

        LOG.info("Click on the first item...");
        find(By.cssSelector("z-grid[class='z-nvg-cognac_articles'] > z-grid-item:first-child")).click();

        LOG.info("Get product brand and name...");
        String expectedProductBrand = find(By.cssSelector("h2[class*='h-color-black'][class*='detail']")).first().text();
        String expectedProductName = find(By.cssSelector("h1[class*='h-text']")).first().text();
        LOG.info("Brand -> " + expectedProductBrand);
        LOG.info("Product -> " + expectedProductName);

        LOG.info("Click on the first available size...");
        find(By.cssSelector(".h-container.h-dropdown-placeholder")).click();
        String sizeSelector = "h5[class*='h-color-black'][class*='title-4'][class*='h-all-caps']";
        await().atMost(5, TimeUnit.SECONDS).until(el(sizeSelector)).present();
        find(By.cssSelector("h5[class*='h-color-black'][class*='title-4'][class*='h-all-caps']")).click();

        LOG.info("Add product to shopping cart...");
        find(By.cssSelector("#z-pdp-topSection-addToCartButton")).click();

        LOG.info("Go to shopping cart...");
        String goToShoppingCartSelector = "a[class='z-navicat-header_navToolItemLink']";
        await().atMost(5, TimeUnit.SECONDS).until(el(goToShoppingCartSelector)).present();
        find(By.cssSelector("a[class='z-navicat-header_navToolItemLink']")).click();

        LOG.info("Assert product brand and name...");
        FluentList<FluentWebElement> productInfo = find(By.className("z-coast-fjord_link"));
        String productBrand = productInfo.get(1).text();
        String productName = productInfo.last().text();
        assertThat(productBrand).containsIgnoringCase(expectedProductBrand);
        assertThat(productName).containsIgnoringCase(expectedProductName);
    }
}
