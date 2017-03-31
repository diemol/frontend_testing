import org.fluentlenium.adapter.testng.FluentTestNg;
import org.fluentlenium.core.annotation.Page;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.Platform;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.Test;
import pages.HomePage;
import pages.ProductDetailPage;
import pages.SearchResultsPage;
import pages.ShoppingCartPage;

import java.util.logging.Logger;

import static org.assertj.core.api.Assertions.assertThat;

public class AddItemToShoppingCartChromeWinTest extends FluentTestNg {

    private static final Logger LOG = Logger.getLogger(AddItemToShoppingCartChromeWinTest.class.getName());

    @Page
    private HomePage homePage;

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
        DesiredCapabilities desiredCapabilities = DesiredCapabilities.chrome();
        desiredCapabilities.setCapability(CapabilityType.PLATFORM, Platform.WIN10);
        desiredCapabilities.setCapability("name", "searchArticleAndAddItToBag");
        return desiredCapabilities;
    }

    /*
        Go to Zalando home page, search for "Nike", click on the first product, add it to the bag and
        assert that the product name and value is the correct one.
     */
    @Test
    public void searchArticleAndAddItToBag() throws InterruptedException {

        // Go to the homepage
        LOG.info("Loading https://www.zalando.de/...");
        window().maximize();
        goTo(homePage);
        homePage.isAt();

        LOG.info("Type Nike in the search field...");
        SearchResultsPage searchResultsPage = homePage.search("Nike");

        LOG.info("Click on the first item...");
        ProductDetailPage productDetailPage = searchResultsPage.clickOnFirstProduct();

        LOG.info("Get product brand and name...");
        String expectedProductBrand = productDetailPage.getProductBrand();
        String expectedProductName = productDetailPage.getProductName();

        LOG.info("Click on the first available size...");
        productDetailPage.selectFirstAvailableSize();

        LOG.info("Add product to shopping cart...");
        productDetailPage.addToShoppingCart();

        LOG.info("Go to shopping cart...");
        ShoppingCartPage shoppingCartPage = productDetailPage.goToShoppingCart();

        LOG.info("Assert product brand and name...");
        assertThat(expectedProductBrand).isEqualToIgnoringCase(shoppingCartPage.getProductBrand());
        assertThat(expectedProductName).isEqualToIgnoringCase(shoppingCartPage.getProductName());
    }
}
