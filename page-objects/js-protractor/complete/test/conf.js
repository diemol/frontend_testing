// conf.js
exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['add-item-to-shopping-cart.js'],
    onPrepare: function(){
        let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
    },
    jasmineNodeOpts: {
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 90000 // 90 seconds
    }
};