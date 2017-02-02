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
                tasks: ['run_LINUX_firefox', 'run_LINUX_chrome']
            }
        }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-mocha-parallel');
    grunt.loadNpmTasks('grunt-parallel');

    grunt.registerTask('LINUX_chrome', function(n) {
        grunt.option('browser', 'chrome');
        grunt.option('platform', "LINUX");
    });

    grunt.registerTask('LINUX_firefox', function(n) {
        grunt.option('browser', 'firefox');
        grunt.option('platform', "LINUX");
    });

    // register tasks
    grunt.registerTask('default', ['parallel']);

    grunt.registerTask('run_LINUX_firefox', ['LINUX_firefox', 'mocha_parallel']);
    grunt.registerTask('run_LINUX_chrome', ['LINUX_chrome', 'mocha_parallel']);
};