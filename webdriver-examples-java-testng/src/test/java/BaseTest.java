import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

public class BaseTest {
    // Setting the url for the WebDriver
    public static final String DOCKER_MACHINE_HOST = "192.168.99.100";
    public static final String URL = String.format("http://%s:4444//wd/hub", DOCKER_MACHINE_HOST);
    public WebDriver webDriver;

    // Base url
    public static final String BASE_URL = "http://phptravels.net/";

    @BeforeMethod
    public void startWebDriverAndGetBaseUrl() throws MalformedURLException {
        DesiredCapabilities desiredCapabilities = DesiredCapabilities.chrome();
        desiredCapabilities.setCapability(CapabilityType.PLATFORM, Platform.LINUX);

        webDriver = new RemoteWebDriver(new URL(URL), desiredCapabilities);

        webDriver.manage().window().maximize();
        webDriver.get(BASE_URL);
    }

    @AfterMethod
    public void quitBrowser() {
        webDriver.quit();
    }

    // Small utility method to generate a random number. Useful to select something from a list in a random way.
    public int getRandomInt(int upperLimit) {
        Random randomGenerator = new Random();
        return randomGenerator.nextInt(upperLimit);
    }

    // Method to get a future date
    public Date getFutureDate(Date baseDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(baseDate);
        calendar.add(Calendar.DATE, 5);
        return calendar.getTime();
    }

}
