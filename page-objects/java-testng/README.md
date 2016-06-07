### WebDriver Java TestNG examples using PageObjects

This is an example running a test written in Java, using TestNG, and implementing [Page Objects](http://martinfowler.com/bliki/PageObject.html).

#### Environment Setup:

1. Global Dependencies
    * [Install Maven](https://maven.apache.org/install.html)
    * Or Install Maven with [Homebrew](http://brew.sh/)
    ```
    $ brew install maven
    ```

1. docker-selenium running
    * [Start docker-selenium](https://github.com/diemol/frontend_testing/blob/master/page-objects/README.md#docker-selenium-is-used-to-run-the-tests)

1. Export the docker machine IP
    * In the terminal export your docker machine IP as environment variable:
    ```
    $ export DOCKER_MACHINE_HOST=<your docker machine IP>
    ```

#### Steps to run it:

1. Clone the repo:

    ```
    $ git clone https://github.com/diemol/frontend_testing.git
    ```
1. Change directory to execute the examples:

    ```
    $ cd page-objects/java-testng/<initial/complete>
    ```
1. Execute the code

	```
	$ mvn test
	```



