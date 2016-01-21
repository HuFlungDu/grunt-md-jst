/*
 * grunt-md-jst
 * https://github.com/HuFlungDu/grunt-md-jst
 *
 * Copyright (c) 2016 Josiah Baldwin
 * Licensed under the unlicense.
 * Very much based on grunt-md (https://www.npmjs.com/package/grunt-md)
 * and grunt-contrib-jst (https://www.npmjs.com/package/grunt-contrib-jst)
 */

'use strict'
var _ = require('lodash'),
    path = require('path'),
    mm = require("marky-mark"),
    chalk = require('chalk'),
    declare = require('nsdeclare')

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('md_jst', 'Grunt plugin to compile Markdown files into JST modules.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var lf = grunt.util.linefeed
        var options = this.options({
            namespace: "MD",
            templateSettings: {},
            mmOptions: {},
            processContent: _.identity,
            processName: _.identity,
            separator: lf + lf
        })

        var wrapper = {
            "*":  _.template("<%=content%>")
        }

        if (options.wrapper) {
            if (_.isPlainObject(options.wrapper)) {
                _.each(options.wrapper, function(file, key) {
                    if (grunt.file.exists(file)) {
                        var data = grunt.file.read(file)
                        wrapper[key] = _.template(data)
                    }
                })
            } else if (typeof options.wrapper !== 'string') {
                grunt.log.warn('Wrapper type not supported: options.wrapper must be an object or a string.')
            } else {
                if (grunt.file.exists(options.wrapper)) {
                    var data = grunt.file.read(options.wrapper)
                    wrapper["*"] = _.template(data)
                }
            }
        }

        var namespace = declare(options.namespace, {response: "details"})

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            // Concat specified files.
            var output = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.')
                    return false
                } else {
                    return true
                }
            }).map(function(filepath) {
                // Read file source.
                var mm_data, wrapped, compiled, filename
                try {
                    var mm_data = mm.parseFileSync(filepath)
                    wrapped = (wrapper[mm_data.origPath] || wrapper[mm_data.filename] || wrapper['*'])(_.extend({}, mm_data.meta, {
                        content: mm_data.content
                    }))
                    compiled = _.template(wrapped, options.templateSettings).source
                } catch (e) {
                    grunt.log.error(e)
                    grunt.fail.warn('MD_JST ' + chalk.cyan(filepath) + ' failed to compile.')
                }

                filename = options.processName(filepath)

                if (options.amd && options.namespace === false) {
                    return 'return ' + compiled
                }
                return namespace.namespace + '[' + JSON.stringify(filename) + '] = ' + compiled + ';'
            })
            if (output.length < 1) {
                grunt.log.warn('Destination not written because compiled files were empty.')
                return
            }
            if (options.namespace !== false) {
                output.unshift(namespace.declaration)
            }
            if (options.amd) {
                output.unshift("define(function(){")
                if (options.namespace !== false) {
                    // Namespace has not been explicitly set to false; the AMD
                    // wrapper will return the object containing the template.
                    output.push("  return " + namespace.namespace + ";")
                }
                output.push("});")
            }
            output = output.join(grunt.util.normalizelf(options.separator))
            // Add newline to end of file if necessary
            if (output.slice(-1) !== "\n") {
                output += "\n"
            }
            grunt.file.write(f.dest, output)

            // Print a success message.
            grunt.log.writeln('File ' + chalk.cyan(f.dest) + ' created.')
        })
    })
}
