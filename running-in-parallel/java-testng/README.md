### Java TestNG examples with the [Surefire Plugin](https://maven.apache.org/surefire/maven-surefire-plugin/)

These examples are running a few tests written in Java and using TestNG. The Surefire Plugin is in charge of passing
the parallelism options to TestNG.

The implementation is running the tests in a number of configurable threads and you can also configure the browser
and platform combinations.

Both implementations are made to run on [SauceLabs](https://saucelabs.com/)

#### Environment Setup:

1. Check your [Java](https://github.com/diemol/frontend_testing#java) setup.

1. Sauce Credentials
    * In the terminal export your Sauce Labs Credentials as environmental variables:
    ```sh
    export SAUCE_USERNAME=<your Sauce Labs username>
    export SAUCE_ACCESS_KEY=<your Sauce Labs access key>
    ```

#### Steps to run it:

1. Clone the repo:

    ```sh
    git clone https://github.com/diemol/frontend_testing.git
    cd frontend_testing
    ```
1. Change directory to execute the examples:

    ```sh
    cd running-in-parallel/java-testng/<initial/complete>
    ```
1. Execute the code

	```sh
	mvn test
	```

Afterwards you can check the executed test in your [Sauce Labs Dashboard](https://saucelabs.com/beta/dashboard/)


#### How does parallelism work in this example?

The parallelism configuration for [TestNG](http://testng.org/doc/index.html) is configured via the [Surefire
Plugin](https://maven.apache.org/surefire/maven-surefire-plugin/).

Two different configurations can be used in the pom.xml to setup the parallelism.

With:

    ```
        <parallel>methods</parallel>
        <threadCount>2</threadCount>
    ```
The `parallel` value can take `classes`, `methods` or `classesAndMethods`. And `threadCount` takes any positive integer,
the limitation for it is given by your infrastructure.


Or:

    ```
        <properties>
            <property>
                <name>parallel</name>
                <value>methods</value>
            </property>
            <property>
                <name>dataproviderthreadcount</name>
                <value>3</value>
            </property>
        </properties>
    ```
The first two properties work in the same way as described before, for the third one, a great explanation can be seen
 [here](http://beust.com/weblog2/archives/000513.html).


#### Important to note
Something very important to be noted is how the `webDriver` variable is created, different from the single-threaded
examples, the `webDriver` variable needs to be threadsafe because each session must be exclusive to avoid
interference between tests. This example uses a `ThreadLocal<WebDriver>`, which is a common practice to keep the
WebDriver session threadsafe.
