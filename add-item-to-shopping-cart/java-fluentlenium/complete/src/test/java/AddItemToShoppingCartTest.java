import org.fluentlenium.adapter.testng.FluentTestNg;
import org.fluentlenium.core.domain.FluentList;
import org.fluentlenium.core.domain.FluentWebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.Platform;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.Test;

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
        DesiredCapabilities desiredCapabilities = DesiredCapabilities.chrome();
        desiredCapabilities.setCapability(CapabilityType.PLATFORM, Platform.LINUX);
        return desiredCapabilities;
    }

    /*
        Go to Zalando home page, search for "Nike", click on the first article, add it to the basket and
        assert that the article name and value is the correct one.
     */
    @Test
    public void searchArticleAndAddItToBag() throws InterruptedException {
        // Go to the homepage
        LOG.info("Loading https://www.zalando.de/...");
        window().maximize();
        goTo("https://www.zalando.de/");

        LOG.info("Type Nike in the search field...");
        find(By.id("searchContent")).write("Nike").submit();

        LOG.info("Click on the first item...");
        find(By.className("catalogArticlesList_item")).first().click();

        LOG.info("Get article brand and name...");
        FluentList<FluentWebElement> articleContent = find(By.className("z-vegas-ui_article-brand-info_content"));
        FluentList<FluentWebElement> articleInfoBrand =
                articleContent.find(By.cssSelector(".z-vegas-ui_text.z-vegas-ui_text-standard"));
        String expectedArticleBrand = articleInfoBrand.first().text();
        String expectedArticleName = articleInfoBrand.last().text();

        LOG.info("Click on select size drop down...");
        find(By.className("z-vegas-ui_dropover-facet")).click();

        LOG.info("Click on the first available size...");
        String availableSize = ".z-vegas-ui_sizeDropdown_sizeListItem.z-vegas-ui_sizeDropdown_sizeListItem-available";
        find(By.cssSelector(availableSize)).first().click();

        LOG.info("Add product to shopping cart...");
        find(By.cssSelector(".z-button.z-button-primary.z-button-button.z-button_mouse")).click();

        LOG.info("Go to shopping cart...");
        // Not possible to get a visible unique element for the shopping cart, and there are currently 5 elements
        // with the same class. The shopping cart is the last one. The test may break when they change the order.
        find(By.cssSelector("div[class='z-navicat-header_userAccNaviItem']")).last().click();

        LOG.info("Assert article brand and name...");
        FluentList<FluentWebElement> articleInfo = find(By.className("z-coast-fjord_link"));
        String articleBrand = articleInfo.get(1).text();
        String articleName = articleInfo.last().find(By.cssSelector(".z-text.z-text-default")).text();
        assertThat(expectedArticleBrand).isEqualToIgnoringCase(articleBrand);
        assertThat(expectedArticleName).isEqualToIgnoringCase(articleName);
    }
}
