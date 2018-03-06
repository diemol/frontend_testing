# Frontend Testing Workshop - Code Examples

[![Build Status](https://travis-ci.org/diemol/frontend_testing.svg?branch=master)](https://travis-ci.org/diemol/frontend_testing)

This repository contains different examples that are used during a basic Frontend Testing workshop.

The examples are provided in Java with TestNG+Fluentlenium and JavaScript with WebDriverIO+Mocha+Chai.

## The code is structured as follows:
* [first-test](https://github.com/diemol/frontend_testing/tree/master/first-test)

    A page is opened, the page title is retrieved, and finally an assertion of a expected value is done.
* [add-item-to-shopping-cart](https://github.com/diemol/frontend_testing/tree/master/add-item-to-shopping-cart)

    This is an example where a guest searches for a brand and puts an item in the shopping cart.
* [running-in-parallel](https://github.com/diemol/frontend_testing/tree/master/running-in-parallel)

    After having tests working, a natural step is to try to execute all of them in less time. Some simple examples where a page is loaded are executed in parallel.
* [page-objects](https://github.com/diemol/frontend_testing/tree/master/page-objects)

    A final round up of the hotel booking example but now using the Page Object model/pattern, which is know as one of the best practices when doing Frontend Testing.


## General Setup to run the examples

### Java
_Only if you want to run the Java examples_
* [Install Maven](https://maven.apache.org/install.html)
* Or Install Maven with [Homebrew](http://brew.sh/)

    ```sh
    brew install maven
    ```

### JavaScript
_Only if you want to run the JavaScript examples_
* Install [Node.js](https://nodejs.org/en/)
* Or Install Node.js with [Homebrew](http://brew.sh/)

    ```sh
    brew install node
    ```

### Docker
[Zalenium](https://github.com/zalando/zalenium) is used to run most of the examples.
This means:
* You need to have [docker](https://www.docker.com/) installed, version >= 1.11.1. Here are the instructions for 
most of the supported [platforms](https://www.docker.com/products/docker).
* After installing docker, just run this command to start Zalenium:

  ```sh
  curl -sSL https://raw.githubusercontent.com/dosel/t/i/p | bash -s start
  ```
  
  This will check for the latest images and ask for missing dependencies.
  
  To stop Zalenium when you are done testing, you can.

  ```sh
  curl -sSL https://raw.githubusercontent.com/dosel/t/i/p | bash -s stop
  ```

* After getting the message `Zalenium in docker started!`, head to [http://localhost:4444/grid/console](http://localhost:4444/grid/console).

* If you want to see the browsers while the test is running, you can access the container with VNC through 
[http://localhost:4444/grid/admin/live](http://localhost:4444/grid/admin/live). 


