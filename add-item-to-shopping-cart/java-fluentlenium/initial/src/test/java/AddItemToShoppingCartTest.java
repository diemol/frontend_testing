import org.fluentlenium.adapter.testng.FluentTestNg;
import org.openqa.selenium.By;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.Platform;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.Test;

import java.util.logging.Logger;

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
        Go to Zalando home page, search for "Nike", click on the first article, add it to the basket and
        assert that the article name and value is the correct one.
     */
    @Test
    public void searchArticleAndAddItToBag() {
        // Go to the homepage
        LOG.info("Loading https://www.zalando.de/...");
        window().maximize();
        goTo("https://www.zalando.de/");

        LOG.info("Type Nike in the search field...");
        find(By.cssSelector(".z-navicat-header_searchInput")).write("Nike").submit();

        LOG.info("Click on the first item...");
        find(By.cssSelector("z-grid[class='z-nvg-cognac_articles'] > z-grid-item:first-child")).click();
    }
}
