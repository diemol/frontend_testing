import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.net.MalformedURLException;
import java.net.URL;

@SuppressWarnings("Duplicates")
public class FirstWebDriverTestJavaTestNGTest {
    // Setting the url for the WebDriver
    public static final String DOCKER_MACHINE_HOST = "192.168.99.100";
    public static final String URL = String.format("http://%s:4444//wd/hub", DOCKER_MACHINE_HOST);

    @Test
    public void checkPHPTravelsPageTitleFirefox() throws MalformedURLException {
        // We declare that we want to run the test on Firefox + Linux
        DesiredCapabilities desiredCapabilities = DesiredCapabilities.firefox();
        desiredCapabilities.setCapability(CapabilityType.PLATFORM, Platform.LINUX);

        // Create the connection through WebDriver to the Selenium Grid
        WebDriver driver = new RemoteWebDriver(new URL(URL), desiredCapabilities);

        // Go to PHPTravels website
        driver.get("http://phptravels.net/");

        // Assert that the title is the expected one
        Assert.assertEquals(driver.getTitle(), "Travel Business Partner", "Page title is not the expected one");

        // Close the browser
        driver.quit();
    }

    @Test
    public void checkPHPTravelsPageTitleChrome() throws MalformedURLException {
        // We declare that we want to run the test on Chrome + Linux
        DesiredCapabilities desiredCapabilities = DesiredCapabilities.chrome();
        desiredCapabilities.setCapability(CapabilityType.PLATFORM, Platform.LINUX);

        // Create the connection through WebDriver to the Selenium Grid
        WebDriver driver = new RemoteWebDriver(new URL(URL), desiredCapabilities);

        // Go to PHPTravels website
        driver.get("http://phptravels.net/");

        // Assert that the title is the expected one
        Assert.assertEquals(driver.getTitle(), "Travel Business Partner", "Page title is not the expected one");

        // Close the browser
        driver.quit();
    }
}
