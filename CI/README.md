# Steps to add TravisCI
Here users may find useful to see how TravisCI was added to this project, step by step.

1. Enable TravisCI on this project at [your profile page](https://travis-ci.org/profile/diemol).
Note you will need to signup to TravisCI by linking your Github account.

1. Check the [repo automatic build](https://travis-ci.org/diemol/frontend_testing) is enabled.

1. Sign up for an [open source Sauce Labs account](https://saucelabs.com/opensauce) and grab the `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` value to be used later on.

1. Environment variables that are secrets like `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` need to be set [in the travis-ci settings page](https://travis-ci.org/diemol/frontend_testing/settings). **Important** do **NOT** enable the option `Display value in build log`

1. Add the image badges in the README repo file.
  ```markdown
  [![Build Status](https://travis-ci.org/diemol/frontend_testing.svg?branch=master)](https://travis-ci.org/diemol/frontend_testing)
  ```

1. Probably already have it but create a `.travis.yml` file at the root of the project declaring the build steps.
Push the changes to trigger a new CI build.
