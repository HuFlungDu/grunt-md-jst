'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.md_jst = {
    setUp: function(done) {
        done();
    },
    default: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/default');
        var expected = grunt.file.read('test/expected/default');
        test.equal(actual, expected, 'should compile markdown files into JST functions.');

        test.done();
    },
    namespace: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/namespace');
        var expected = grunt.file.read('test/expected/namespace');
        test.equal(actual, expected, 'should change the namespace of the JST functions');

        test.done();
    },
    multiple_files: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/multiple_files');
        var expected = grunt.file.read('test/expected/multiple_files');
        test.equal(actual, expected, 'should compile multiple files into multiple JST functions');

        test.done();
    },
    wrapper: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/wrapper');
        var expected = grunt.file.read('test/expected/wrapper');
        test.equal(actual, expected, 'should put metadata and data into the wrapper');

        test.done();
    },
    template_settings: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/template_settings');
        var expected = grunt.file.read('test/expected/template_settings');
        test.equal(actual, expected, 'should pass template settings to jst creator');

        test.done();
    },
    amd: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/amd');
        var expected = grunt.file.read('test/expected/amd');
        test.equal(actual, expected, 'should create an AMD module');

        test.done();
    }
};
