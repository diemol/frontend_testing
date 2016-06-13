## WebDriver example using Page Objects in JavaScript with Mocha and Chai

This example is running one tests written in JavaScript using the [Mocha](https://mochajs.org/) test framework and
implementing [Page Objects](http://martinfowler.com/bliki/PageObject.html).

#### Environment Setup

1. Project Dependencies
    * Install [Node.js](https://nodejs.org/en/)
    * Or Install Node.js with [Homebrew](http://brew.sh/)
    ```sh
    brew install node
    ```

1. docker-selenium running
    * [Start docker-selenium](https://github.com/diemol/frontend_testing/blob/master/page-objects/README.md#docker-selenium-is-used-to-run-the-tests)

1. _Optional_: If your docker machine does not run on `localhost`, export the docker machine IP
    * In the terminal export your docker machine IP as environment variable:
    ```sh
    docker-machine ip default
    export DOCKER_MACHINE_HOST=<your docker machine IP>
    ```

### Steps to run it:

1. Clone the repo:

    ```sh
    git clone https://github.com/diemol/frontend_testing
    cd frontend_testing
    ```
1. Change directory to:

    ```sh
    cd page-objects/js-mocha-chai/<initial/complete>
    ```
1. Install Node dependencies (Selenium WebDriver, Mocha, and Chai):

    ```sh
    npm install
    ```
1. Execute the code

	```sh
	npm test
	```

### More information

[WebDriver and PageObjects](https://watirmelon.com/2015/10/30/webdriverjs-mocha-part-3-page-objects/)

