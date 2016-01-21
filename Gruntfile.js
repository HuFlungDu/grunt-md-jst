/*
 * grunt-md-jst
 * https://github.com/HuFlungDu/grunt-md-jst
 *
 * Copyright (c) 2016 Josiah Baldwin
 * Licensed under the unlicense license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    md_jst: {
      default: {
        options: {
        },
        files: {
          'tmp/default': ['test/fixtures/one.md']
        }
      },
      multiple_files: {
        options: {
        },
        files: {
          'tmp/multiple_files': ['test/fixtures/one.md', 'test/fixtures/another.md']
        }
      },
      namespace: {
        options: {
            namespace: "JST.MD"
        },
        files: {
          'tmp/namespace': ['test/fixtures/one.md']
        }
      },
      wrapper: {
        options: {
            wrapper: "test/wrappers/one.jst"
        },
        files: {
          'tmp/wrapper': ['test/fixtures/one.md']
        }
      },
      template_settings: {
          options: {
              templateSettings: {
                  variable: "data"
              }
          },
          files: {
            'tmp/template_settings': ['test/fixtures/one.md']
          }
      },
      amd: {
          options: {
              amd: true
          },
          files: {
            'tmp/amd': ['test/fixtures/one.md']
          }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'md_jst', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
