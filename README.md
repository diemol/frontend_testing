# Frontend Testing Workshop - Code Examples

[![Build Status](https://travis-ci.org/elgalu/frontend_testing.svg?branch=master)](https://travis-ci.org/elgalu/frontend_testing)

This repository contains different examples that are used during a basic Frontend Testing workshop.

The code was written in general in a simple way, without any frameworks or external tools that could hide the basic
steps to develop tests with Selenium WebDriver.

The main idea of the code is to show how tests can be written from scratch, but it is clear that different frameworks
could be used to simplify the code and provide helper functions. Nevertheless, the intention is to keep it basic and
simple.

The examples are provided in Java with TestNG and JavaScript with Mocha + Chai.

## The code is structured as follows:
* [first-test](https://github.com/diemol/frontend_testing/tree/master/first-test)

    A page is opened, the page title is retrieved, and finally an assertion of a expected value is done.
* [user-registration](https://github.com/diemol/frontend_testing/tree/master/user-registration)

    This is a simple example where a user gets registered on a website.
* [hotel-booking](https://github.com/diemol/frontend_testing/tree/master/hotel-booking)

    This is an example where a guest user books a hotel on a website.
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
[docker-selenium](https://github.com/elgalu/docker-selenium) is used to run most of the examples.
This means:
* You need to have [docker](https://www.docker.com/) installed. Here are the instructions for [Mac](https://docs.docker.com/mac/), [Linux](https://docs.docker.com/linux/) and [Windows](https://docs.docker.com/windows/).
* After installing docker, and before running the tests that use it, just run this command to start the docker-selenium container:

  ```sh
  docker run --rm -ti --name=grid -p 4444:24444 -p 5920:25900 -v /dev/shm:/dev/shm -p 6080:26080 -e NOVNC=true -e VNC_PASSWORD=hola elgalu/selenium
  ```
  It will take longer the first time as the image is getting pulled. Afterwards, it should start in a few seconds. Whenever you have a problem with the container, just stop it and start it again.

* _Optional_: If your docker machine does not run on `localhost`, export the docker machine IP
  ```sh
  docker-machine ip default
  export DOCKER_MACHINE_HOST=<your docker machine IP>
  ```

* When the container starts, you can see the Selenium Grid running at [http://localhost:4444/grid/console](http://localhost:4444/grid/console). **Attention**: If you are running Mac, `localhost` may not work, use `docker-machine ip default` to find out the correct IP for you.

* If you want to see the browsers while the test is running, you can access the container with VNC through [http://localhost:6080/vnc.html](http://localhost:6080/vnc.html). The password is `hola`, it was set in the docker command. As in the previous point, check your docker IP.


