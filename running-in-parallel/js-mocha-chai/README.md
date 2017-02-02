## WebDriver examples in JavaScript with Mocha and Chai running in parallel

These examples are running a few simple tests written in JavaScript using the [Mocha](https://mochajs.org/) test
framework. The tests are executed in parallel with [Mocha-Parallel-Tests](https://www.npmjs.com/package/mocha-parallel-tests).

### Environment Setup

1. Check your [JavaScript](https://github.com/diemol/frontend_testing#javascript) and 
[Docker](https://github.com/diemol/frontend_testing#docker) setup.

### Steps to run it:

1. Clone the repo and go to the folder:

    ```sh
    git clone https://github.com/diemol/frontend_testing
    cd frontend_testing/running-in-parallel/js-mocha-chai/<initial/complete>
    ```
1. Install Node dependencies:

    ```sh
    npm install
    ```
1. Execute the code:

	```sh
	npm test
	```

### How is parallelism working in these examples?

_For the initial status of the example_

The tests are executed in several threads using the mocha-parallel-tests. This `npm` package grabs every JS file in
the `test` folder and runs it in its own thread. In addition, you can change the `--max-parallel` value in the
[package.json](https://github.com/diemol/frontend_testing/blob/master/running-in-parallel/js-mocha-chai/initial/package.json#L7) file to increase the number of threads if needed.

_For the complete status of the example_

When more than one browser is used, the project is wrapped in several Grunt tasks and then executed in parallel.


