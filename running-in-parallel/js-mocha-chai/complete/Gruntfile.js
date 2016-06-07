'use strict';
var os = require('os');

module.exports = function (grunt) {
    // configure tasks
    grunt.initConfig({
        mocha_parallel: {
            options: {
                args: function(suiteName) {
                    return [];
                },
                env: function(suiteName) {
                    process.env.BROWSER = grunt.option('browser');
                    process.env.PLATFORM = grunt.option('platform');
                    return process.env;
                },
                report: function(suite, code, stdout, stderr) {
                    if (stdout.length) {
                        process.stdout.write(stdout);
                    }
                    if (stderr.length) {
                        process.stderr.write(stderr);
                    }
                },
                done: function(success, results) {
                },
                mocha: './node_modules/.bin/mocha',
                //this is the default concurrency, change as needed.
                concurrency: os.cpus().length * 1.5
            }
        },

        parallel: {
            assets: {
                options: {
                    grunt: true
                },
                tasks: ['run_Windows7_ie', 'run_LINUX_firefox',
                    'run_Windows8_chrome', 'run_OSX10.11_safari']
            }
        }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-mocha-parallel');
    grunt.loadNpmTasks('grunt-parallel');

    grunt.registerTask('Windows7_ie', function(n) {
        grunt.option('browser', 'internet explorer');
        grunt.option('platform', "Windows 7");
    });

    grunt.registerTask('LINUX_firefox', function(n) {
        grunt.option('browser', 'firefox');
        grunt.option('platform', "XP");
    });

    grunt.registerTask('Windows8_chrome', function(n) {
        grunt.option('browser', 'chrome');
        grunt.option('platform', "Windows 8");
    });

    grunt.registerTask('OSX10.11_safari', function(n) {
        grunt.option('browser', 'safari');
        grunt.option('platform', "OS X 10.11");
    });

    // register tasks
    grunt.registerTask('default', ['parallel']);

    grunt.registerTask('run_Windows7_ie', ['Windows7_ie', 'mocha_parallel']);
    grunt.registerTask('run_LINUX_firefox', ['LINUX_firefox', 'mocha_parallel']);
    grunt.registerTask('run_Windows8_chrome', ['Windows8_chrome', 'mocha_parallel']);
    grunt.registerTask('run_OSX10.11_safari', ['OSX10.11_safari', 'mocha_parallel']);
};