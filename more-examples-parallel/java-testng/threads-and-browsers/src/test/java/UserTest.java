import org.apache.commons.lang3.RandomStringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.lang.reflect.Method;
import java.net.MalformedURLException;

public class UserTest extends BaseTest {

    @Test(dataProvider = "browsersAndPlatforms")
    public void registerUserShouldLeaveNewUserLoggedIn(String browserType, Platform platform, Method method) 
            throws MalformedURLException {

        WebDriver webDriver = startWebDriverAndGetBaseUrl(browserType, platform, method.getName());

        // Go to the register page
        webDriver.get("http://phptravels.net/register");
        // Filling up the form to Sign Up
        webDriver.findElement(By.name("firstname")).sendKeys("John");
        webDriver.findElement(By.name("lastname")).sendKeys("Doe");
        webDriver.findElement(By.name("phone")).sendKeys("+1223456789");
        String randomEmail = String.format("%s@example.com", RandomStringUtils.randomAlphabetic(5).toLowerCase());
        webDriver.findElement(By.name("email")).sendKeys(randomEmail);
        String randomPassword = RandomStringUtils.randomAlphanumeric(10);
        webDriver.findElement(By.name("password")).sendKeys(randomPassword);
        webDriver.findElement(By.name("confirmpassword")).sendKeys(randomPassword);
        //Click on "Sign Up"
        WebElement signUpButton = webDriver.findElement(By.cssSelector("button.signupbtn.btn_full.btn.btn-primary.btn-block.btn-lg"));
        signUpButton.click();
        // After Signing Up, we assert that we are logged in by checking the name displayed on the user page
        WebDriverWait wait = new WebDriverWait(webDriver, 10);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("h3.RTL")));
        WebElement welcomeMessage = webDriver.findElement(By.cssSelector("h3.RTL"));
        String expectedWelcomeMessage = "Hi, John Doe";
        Assert.assertEquals(welcomeMessage.getText(), expectedWelcomeMessage, "Welcome message was not the expected one");
    }
}
