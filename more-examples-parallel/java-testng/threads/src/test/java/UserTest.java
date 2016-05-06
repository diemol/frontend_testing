import org.apache.commons.lang3.RandomStringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

public class UserTest extends BaseTest {

    @Test
    public void registerUserShouldLeaveNewUserLoggedIn() {
        // Go to the register page
        getWebDriver().get("http://phptravels.net/register");
        // Filling up the form to Sign Up
        getWebDriver().findElement(By.name("firstname")).sendKeys("John");
        getWebDriver().findElement(By.name("lastname")).sendKeys("Doe");
        getWebDriver().findElement(By.name("phone")).sendKeys("+1223456789");
        String randomEmail = String.format("%s@example.com", RandomStringUtils.randomAlphabetic(5).toLowerCase());
        getWebDriver().findElement(By.name("email")).sendKeys(randomEmail);
        String randomPassword = RandomStringUtils.randomAlphanumeric(10);
        getWebDriver().findElement(By.name("password")).sendKeys(randomPassword);
        getWebDriver().findElement(By.name("confirmpassword")).sendKeys(randomPassword);
        //Click on "Sign Up"
        WebElement signUpButton = getWebDriver().findElement(By.cssSelector("button.signupbtn.btn_full.btn.btn-primary.btn-block.btn-lg"));
        signUpButton.click();
        // After Signing Up, we assert that we are logged in by checking the name displayed on the user page
        WebDriverWait wait = new WebDriverWait(getWebDriver(), 10);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("h3.RTL")));
        WebElement welcomeMessage = getWebDriver().findElement(By.cssSelector("h3.RTL"));
        String expectedWelcomeMessage = "Hi, John Doe";
        Assert.assertEquals(welcomeMessage.getText(), expectedWelcomeMessage, "Welcome message was not the expected one");
    }
}
