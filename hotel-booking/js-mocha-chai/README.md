### Selenium WebDriver example in JavaScript with Mocha and Chai

#### Environment Setup

1. Project Dependencies
    * Install [Node.js](https://nodejs.org/en/)
    * Or Install Node.js with [Homebrew](http://brew.sh/)
    ```sh
    brew install node
    ```

1. docker-selenium running
    * [Start docker-selenium](https://github.com/diemol/frontend_testing/blob/master/hotel-booking/README.md#docker-selenium-is-used-to-run-the-tests)

1. Export the docker machine IP
    * In the terminal export your docker machine IP as environment variable:
    ```sh
    export DOCKER_MACHINE_HOST=<your docker machine IP>
    ```

    If you are using Linux simply set it to `localhost`

### Steps to run it:

1. Clone the repo:

    ```sh
    git clone https://github.com/diemol/frontend_testing
    cd frontend_testing
    ```
1. Change directory to:

    ```sh
    cd hotel-booking/js-mocha-chai/<initial/complete>
    ```
1. Install Node dependencies (Selenium WebDriver, Mocha, and Chai):

    ```sh
    npm install
    ```
1. Execute the code

	```sh
	npm test
	```
