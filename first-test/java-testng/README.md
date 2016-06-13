### Selenium WebDriver example in Java with TestNG

#### Environment Setup:

1. Global Dependencies
    * [Install Maven](https://maven.apache.org/install.html)
    * Or Install Maven with [Homebrew](http://brew.sh/)
    ```sh
    brew install maven
    ```

1. docker-selenium running
    * [Start docker-selenium](https://github.com/diemol/frontend_testing/blob/master/user-registration/README.md#docker-selenium-is-used-to-run-the-tests)

1. _<optional>_: If your docker machine does not run on `localhost`, export the docker machine IP
    * In the terminal export your docker machine IP as environment variable:
    ```sh
    export DOCKER_MACHINE_HOST=<your docker machine IP>
    ```

#### Steps to run it:

1. Clone the repo:

    ```sh
    git clone https://github.com/diemol/frontend_testing.git
    cd frontend_testing
    ```
1. Change directory to execute the examples:

    ```sh
    cd first-test/java-testng
    ```
1. Execute the code

	```sh
	mvn test
	```



