import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.net.MalformedURLException;

public class FirstWebDriverTestJavaTestNGTest {

    @Test
    public void checkPHPTravelsPageTitle() throws MalformedURLException {
        // Create a new instance of the Firefox driver
        WebDriver driver = new FirefoxDriver();

        // Maximize the window
        driver.manage().window().maximize();

        // Go to PHPTravels website
        driver.get("http://phptravels.net/");

        // Assert that the title is the expected one
        Assert.assertEquals("Page title is not the expected one", "Travel Business Partner", driver.getTitle());

        // Close the browser
        driver.quit();
    }

}
