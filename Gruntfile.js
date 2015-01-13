/*! Cheney for Quail quailjs.org | quailjs.org/license */
/*global module:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('cheney.json'),
    concat: {
      options: {
        banner: [
          "'/*! Cheney for Quail quailjs.org/cheney | quailjs.org/license */'",
          "!function(root, factory) {",
          "  if (typeof define === 'function' && define.amd) {",
          "    define(['jquery'], factory);",
          "  } else {",
          "    factory(root.jQuery);",
          "  }",
          "}(this, function($) {",
          "  'use strict';",
          "  var jQuery = jQuery || $;"
        ].join("\n"),
        footer: "\n" + '});',
        stripBanners: true
      },
      dist: {
        src: ['src/js/*.js'],
        dest: 'dist/cheney.jquery.js'
      }
    },
    less: {
      production: {
        files: {
          'dist/cheney.css': 'src/less/cheney.less'
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= concat.options.banner %>'
      },
      dist: {
        files: {
          'dist/cheney.jquery.min.js': 'dist/cheney.jquery.js'
        }
      }
    },
    qunit: {
      files: ['test/index.html']
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      files: ['Gruntfile.js', 'src/cheney.js']
    },
    watch: {
      scripts: {
        files: ['src/js/*', 'src/less/*'],
        tasks: ['jshint', 'concat', 'uglify', 'less'],
        options: {
          spawn: false
        }
      }
    },
    bower: {
      install: {}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['bower:install', 'jshint', 'concat', 'uglify', 'less', 'qunit']);
  grunt.registerTask('package', ['bower:install', 'jshint', 'concat', 'uglify', 'less']);
};