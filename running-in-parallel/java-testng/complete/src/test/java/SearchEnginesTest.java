import org.openqa.selenium.Platform;
import org.testng.Assert;
import org.testng.annotations.Test;

public class SearchEnginesTest extends BaseTest {

    @Test(dataProvider = "browsersAndPlatforms")
    public void loadGooglePageAndCheckTitle(String browserType, Platform platform) {

        // Go to the homepage
        getWebDriver().get("http://www.google.com");

        // Assert that the title is the expected one
        Assert.assertEquals(getWebDriver().getTitle(), "Google", "Page title is not the expected one");
    }

    @Test(dataProvider = "browsersAndPlatforms")
    public void loadBingPageAndCheckTitle(String browserType, Platform platform) {

        // Go to the homepage
        getWebDriver().get("http://www.bing.com");

        // Assert that the title is the expected one
        Assert.assertEquals(getWebDriver().getTitle(), "Bing", "Page title is not the expected one");
    }

    @Test(dataProvider = "browsersAndPlatforms")
    public void loadDuckDuckGoPageAndCheckTitle(String browserType, Platform platform) {

        // Go to the homepage
        getWebDriver().get("http://www.duckduckgo.com");

        // Assert that the title is the expected one
        Assert.assertEquals(getWebDriver().getTitle(), "DuckDuckGo", "Page title is not the expected one");
    }

}
