import org.openqa.selenium.Platform;
import org.testng.Assert;
import org.testng.annotations.Test;

public class EcommSitesTest extends BaseTest {

    @Test(dataProvider = "browsersAndPlatforms")
    public void loadZalandoPageAndCheckTitle(String browserType, Platform platform) {

        // Go to the homepage
        getWebDriver().get("http://www.zalando.de");

        // Assert that the title is the expected one
        Assert.assertEquals(getWebDriver().getTitle(), "Schuhe & Mode online kaufen | ZALANDO Online Shop",
                "Page title is not the expected one");
    }

    @Test(dataProvider = "browsersAndPlatforms")
    public void loadAmazonPageAndCheckTitle(String browserType, Platform platform) {

        // Go to the homepage
        getWebDriver().get("http://www.amazon.de");

        // Assert that the title is the expected one
        Assert.assertEquals(getWebDriver().getTitle(), "Amazon.de: Günstige Preise für Elektronik & Foto, Filme, " +
                "Musik, Bücher, Games, Spielzeug & mehr");
    }

    @Test(dataProvider = "browsersAndPlatforms")
    public void loadOttoPageAndCheckTitle(String browserType, Platform platform) {

        // Go to the homepage
        getWebDriver().get("http://www.otto.de");

        // Assert that the title is the expected one
        Assert.assertEquals(getWebDriver().getTitle(), "OTTO - Mode, Möbel & Technik » Zum Online-Shop",
                "Page title is not the expected one");
    }

}
