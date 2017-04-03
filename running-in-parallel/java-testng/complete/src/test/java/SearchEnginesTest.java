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

}
