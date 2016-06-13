### Selenium WebDriver example in JavaScript with Mocha and Chai

#### Environment Setup

1. Project Dependencies
    * Install [Node.js](https://nodejs.org/en/)
    * Or Install Node.js with [Homebrew](http://brew.sh/)
    ```sh
    brew install node
    ```

1. docker-selenium running
    * [Start docker-selenium](https://github.com/diemol/frontend_testing/blob/master/user-registration/README.md#docker-selenium-is-used-to-run-the-tests)

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
    cd first-test/js-mocha-chai
    ```
1. Install Node dependencies (Selenium WebDriver, Mocha, and Chai):

    ```sh
    npm install
    ```
1. Execute the code

	```sh
	npm test
	```

