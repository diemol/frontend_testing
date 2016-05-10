import org.apache.commons.lang3.RandomStringUtils;
import org.testng.Assert;
import org.testng.annotations.Test;
import pageObjects.LoginPage;
import pageObjects.UserAccountPage;


public class UserTest extends BaseTest {

    @Test
    public void registerUserShouldLeaveNewUserLoggedIn() {

        // Instantiate the login page
        LoginPage loginPage = new LoginPage(getWebDriver());

        // Go to the register page
        loginPage.visit();

        // Filling up the form to Sign Up
        loginPage.setFirstName("John");
        loginPage.setLastName("Doe");
        loginPage.setPhone("+1223456789");
        String randomEmail = String.format("%s@example.com", RandomStringUtils.randomAlphabetic(5).toLowerCase());
        loginPage.setEmail(randomEmail);
        String randomPassword = RandomStringUtils.randomAlphanumeric(10);
        loginPage.setPassword(randomPassword);
        loginPage.setConfirmPassword(randomPassword);

        //Click on "Sign Up"
        UserAccountPage userAccountPage = loginPage.clickSignUp();

        // After Signing Up, we assert that we are logged in by checking the name displayed on the user page
        String expectedWelcomeMessage = "Hi, John Doe";
        Assert.assertEquals(userAccountPage.getWelcomeMessage(), expectedWelcomeMessage, "Welcome message was not " +
                 "the expected one");
    }
}
