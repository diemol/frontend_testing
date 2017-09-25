// conf.js
exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['add*.js'],
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        screenResolution: '1600x900'
    },
    onPrepare: function(){
        let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
        jasmine.getEnv().addReporter(new function() {
            this.specDone = function(result) {
                if (result.failedExpectations.length >0) {
                    browser.manage().addCookie({name:'zaleniumTestPassed', value: 'false'});
                } else {
                    browser.manage().addCookie({name:'zaleniumTestPassed', value: 'true'});
                }
            };
        });
    },
    jasmineNodeOpts: {
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 90000, // 90 seconds
        showColors: true // Use colors in the command line report.
    }
};