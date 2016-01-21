# grunt-md-jst

> Grunt plugin to compile Markdown files into JST modules.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-md-jst --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-md-jst');
```

## The "md_jst" task

### Overview
In your project's Gruntfile, add a section named `md_jst` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  md_jst: {
    target: {
        options: {
            // Options here
        },
        files: {
          'dist/help.js': ['src/markdown/help.md']
        },
    }

  },
});
```

### Options

#### options.separator
Type: `String`
Default: linefeed + linefeed

Concatenated files will be joined on this string.

#### options.namespace
Type: `String`
Default value: 'MD'

The namespace in which the precompiled templates will be assigned. Use dot notation (e.g. App.Templates) for nested namespaces or false for no namespace wrapping. When false with amd option set true, templates will be returned directly from the AMD wrapper.


#### processName
Type: `function`
Default: null

This option accepts a function which takes one argument (the template filepath) and returns a string which will be used as the key for the precompiled template object.  The example below stores all templates on the default JST namespace in capital letters.

```js
options: {
  processName: function(filepath) {
    return filepath.toUpperCase();
  }
}
```

#### templateSettings
Type: `Object`
Default: null

The settings passed to underscore when compiling templates.

```js
jst: {
  compile: {
    options: {
      templateSettings: {
        interpolate : /\{\{(.+?)\}\}/g
      }
    },
    files: {
      "path/to/compiled/templates.js": ["path/to/source/**/*.html"]
    }
  }
}
```

#### amd
Type: `boolean`
Default: false

Wraps the output file with an AMD define function and returns the compiled template namespace unless namespace has been explicitly set to false in which case the template function will be returned directly.

```js
define(function() {
    //...//
    return this['[template namespace]'];
});
```

Example:
```js
options: {
  amd: true
}
```

#### processContent
Type: `function`

This option accepts a function which takes one argument (the file content) and
returns a string which will be used as template string.
The example below strips whitespace characters from the beginning and the end of
each line.

```js
options: {
  processContent: function(src) {
    return src.replace(/(^\s+|\s+$)/gm, '');
  }
}
```

### Usage Examples

#### Default Options
This example will load a single markdown file into a compiled jst to be loaded by the browser
```js
md_jst: {
  compile: {
    files: {
      "path/to/compiled/templates.js": ["path/to/source/one.md"]
    }
  }
}
```

#### Multiple
This example compiles multiple files into a single file. Note that the normal file composition rules for grunt apply.

```js
md_jst: {
  compile: {
    files: {
      "path/to/compiled/templates.js": ["path/to/source/one.md", "path/to/source/another.md"]
    }
  }
}
```

#### Template Settings
This example overrides the `interpolate` setting of lodash's template function.
```js
md_jst: {
  compile: {
    options: {
      templateSettings: {
        interpolate : /\{\{(.+?)\}\}/g
      }
    },
    files: {
      "path/to/compiled/templates.js": ["path/to/source/**/*.html"]
    }
  }
}
```

#### Wrapper
This example uses a wrapper to put around the generated html

```js
jst: {
  compile: {
    options: {
      templateSettings: {
        interpolate : /\{\{(.+?)\}\}/g
      }
    },
    files: {
      "path/to/compiled/templates.js": ["path/to/source/**/*.html"]
    }
  }
}
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
v0.1.0 Initial release
