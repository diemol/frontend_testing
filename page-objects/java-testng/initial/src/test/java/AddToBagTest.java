import org.openqa.selenium.By;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pages.HomePage;
import pages.SearchResults;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
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

        /*
            PAGE OBJECTS CODE
         */

        // Go to the homepage
        LOG.info("Loading https://www.zalando.de/...");
        HomePage homePage = new HomePage(webDriver);
        homePage.visit();

        // Type "Nike" in the search field
        LOG.info("Typing Nike in the search field...");
        SearchResults searchResultsPage = homePage.search("Nike");

        // Click on the first article
        LOG.info("Clicking on the first article...");
        searchResultsPage.clickOnFirstArticle();

        // Click on the size select drop down
        LOG.info("Selecting the first available size...");
        WebElement sizeSelect = webDriver.findElement(By.id("sizeSelect"));
        sizeSelect.click();

        /*
            NON-PAGE OBJECTS CODE
         */

        // Get article name for further assertion
        String articleBrand = webDriver.findElement(By.cssSelector("span[itemprop='brand']")).getText();
        String articleName = webDriver.findElement(By.cssSelector("span[itemprop='name']")).getText();
        String expectedArticleName = articleBrand + " " + articleName;

        // Select the first available size from the list
        List<WebElement> availableSizes = webDriver.findElements(By.cssSelector("li[class='available sizeLine']"));
        availableSizes.get(0).click();

        // Add to bag and go to it
        LOG.info("Adding to bag and going to bag page...");
        WebElement addToBagButton = webDriver.findElement(By.id("ajaxAddToCartBtn"));
        addToBagButton.click();
        WebElement goToBagButton = webDriver.findElement(By.name("head.text:cart.x:4.y:1"));
        goToBagButton.click();

        // Assert article's name and price
        String actualArticleName = webDriver.findElement(By.name("cart.product.name")).getText();
        Assert.assertEquals(actualArticleName, expectedArticleName, "Article name is different.");
    }
}
