### WebDriver Java TestNG examples using PageObjects

These examples are running two tests written in Java, using TestNG, and implementing [Page Objects](http://martinfowler.com/bliki/PageObject.html).

#### Environment Setup:

1. Global Dependencies
    * [Install Maven](https://maven.apache.org/install.html)
    * Or Install Maven with [Homebrew](http://brew.sh/)
    ```
    $ brew install maven
    ```
1. Sauce Credentials
    * In the terminal export your Sauce Labs Credentials as environmental variables:
    ```
    $ export SAUCE_USERNAME=<your Sauce Labs username>
    $ export SAUCE_ACCESS_KEY=<your Sauce Labs access key>
    ```

#### Steps to run it:

1. Clone the repo:

    ```
    $ git clone https://github.com/diemol/frontend_testing.git
    ```
1. Change directory to execute the examples:

    ```
    $ cd more-examples-pageobjects/java-testng
    ```
1. Execute the code

	```
	$ mvn test
	```

Afterwards you can check the executed test in your [Sauce Labs Dashboard](https://saucelabs.com/beta/dashboard/)

