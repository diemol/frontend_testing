### Java TestNG examples with the [Surefire Plugin](https://maven.apache.org/surefire/maven-surefire-plugin/)

Two WebDriver tests running in parallel in two threads and only one browser/platform combination, the tests are running on [SauceLabs](https://saucelabs.com/)

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
1. Change directory to execute this example

	```
    $ cd more-examples-parallel/java-testng/threads
	```
1. Execute the code

	```
	$ mvn test
	```

Afterwards you can check the executed test in your [Sauce Labs Dashboard](https://saucelabs.com/beta/dashboard/)


#### How does parallelism work in this example?
 
 The parallelism configuration for [TestNG](http://testng.org/doc/index.html) is configured via the [Surefire Plugin](https://maven.apache.org/surefire/maven-surefire-plugin/), this can be seen [here](https://github.com/diemol/frontend_testing/blob/master/more-examples-parallel/java-testng/threads/pom.xml#L52).
 
 In this example, `methods` and two threads are configured for parallelism, which means that each test in the example will be executed in its own thread.
 
 Something very important to be noted is how the `webDriver` variable is created, different from the single-threaded examples, the `webDriver` variable needs to be threadsafe because each session must be exclusive to avoid interference between tests. This example uses a `ThreadLocal<WebDriver>`, which is a common practice to keep the WebDriver session threadsafe.
 
 You can play around with the `classes`, `methods` and `classesAndMethods` parameters in the `<paralell>` tag to find a
 tuned configuration for your test suite.
