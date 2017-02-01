import org.fluentlenium.adapter.testng.FluentTestNg;
import org.fluentlenium.core.annotation.Page;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.Platform;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.Test;
import pages.HomePage;
import pages.SearchResultsPage;

import java.util.logging.Logger;

public class AddItemToShoppingCartTest extends FluentTestNg {

    private static final Logger LOG = Logger.getLogger(AddItemToShoppingCartTest.class.getName());

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
        desiredCapabilities.setCapability(CapabilityType.PLATFORM, Platform.LINUX);
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
        searchResultsPage.clickOnFirstProduct();
    }
}
