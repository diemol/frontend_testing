import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pages.ArticleDetailPage;
import pages.BagPage;
import pages.HomePage;
import pages.SearchResultsPage;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.logging.Logger;

public class AddToBagTest {

    private static final Logger LOG = Logger.getLogger(AddToBagTest.class.getName());

    // Setting the url for the WebDriver
    public static final String DOCKER_MACHINE_HOST = (System.getenv("DOCKER_MACHINE_HOST") == null) ?
            "localhost" : System.getenv("DOCKER_MACHINE_HOST");
    public static final String URL = String.format("http://%s:4444/wd/hub", DOCKER_MACHINE_HOST);
    public WebDriver webDriver;

    @BeforeMethod
    public void startWebDriver() throws MalformedURLException {
        DesiredCapabilities desiredCapabilities = DesiredCapabilities.chrome();
        desiredCapabilities.setCapability(CapabilityType.PLATFORM, Platform.LINUX);

        webDriver = new RemoteWebDriver(new URL(URL), desiredCapabilities);

        webDriver.manage().window().maximize();
    }

    @AfterMethod
    public void quitBrowser() {
        webDriver.quit();
    }

    /*
        Go to Zalando home page, search for "Nike", click on the first article, add it to the bag and
        assert that the article name and value is the correct one.
     */
    @Test
    public void searchArticleAndAddItToBag() throws InterruptedException {

        // Go to the homepage
        LOG.info("Loading https://www.zalando.de/...");
        HomePage homePage = new HomePage(webDriver);
        homePage.visit();

        // Type "Nike" in the search field
        LOG.info("Typing Nike in the search field...");
        SearchResultsPage searchResultsPage = homePage.search("Nike");

        // Click on the first article
        LOG.info("Clicking on the first article...");
        ArticleDetailPage articleDetailPage = searchResultsPage.clickOnFirstArticle();

        // Click on the size select drop down
        LOG.info("Selecting the first available size...");
        articleDetailPage.selectFirstAvailableSize();

        // Get article name for further assertion
        String expectedArticleName = articleDetailPage.getArticleName();

        // Add to bag and go to it
        LOG.info("Adding to bag and going to bag page...");
        articleDetailPage.addToBag();
        BagPage bagPage = articleDetailPage.goToBag();

        // Assert article's name and price
        String actualArticleName = bagPage.getArticleName();
        Assert.assertEquals(actualArticleName, expectedArticleName, "Article name is different.");
    }
}
