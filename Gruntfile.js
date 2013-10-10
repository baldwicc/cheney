/*! Cheney for Quail quailjs.org | quailjs.org/license */
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('cheney.json'),
    clean: {
      hooks: ['.git/hooks/pre-commit']
    },
    shell: {
      hooks: {
        command: 'cp git-hooks/pre-commit .git/hooks/'
      }
    },
    concat: {
      options: {
        banner: '/*! Cheney for Quail quailjs.org/cheney | quailjs.org/license */' + "\n" + '(function($) {',
        footer: '})(jQuery)',
        stripBanners: true
      },
      dist: {
        src: ['src/js/core.js', 'src/js/console.js'],
        dest: 'dist/cheney.js'
      }
    },
    less : {
      production: {
        files : {
          'dist/cheney.css' : 'src/less/cheney.less'
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= concat.options.banner %>'
      },
      dist: {
        files : {
          'dist/cheney.min.js' : 'dist/cheney.js'
        }
      }
    },
    qunit: {
      files: ['test/index.html']
    },
    watch: {
      files: '<%= jshint.files %>',
      tasks: 'test'
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
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less', 'qunit']);
  grunt.registerTask('package', ['jshint', 'concat', 'uglify', 'less']);
  grunt.registerTask('hookmeup', ['clean', 'shell']);
};
