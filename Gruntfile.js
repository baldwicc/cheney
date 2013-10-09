/*! Cheney for Quail quailjs.org | quailjs.org/license */
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('cheney.json'),
    concat: {
      options: {
        banner: '/*! Cheney for Quail quailjs.org/cheney | quailjs.org/license */' + "\n",
        stripBanners: true
      },
      dist: {
        src: ['src/cheney.js'],
        dest: 'dist/cheney.js'
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
      files: ['test/cheney.html']
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

  // Linting, mostly to test JSON.
  grunt.registerTask('lint', ['jshint']);

  // By default, just run tests
  grunt.registerTask('default', ['test']);

  // Release task.
  grunt.registerTask('release', ['jshint', 'qunit', 'concat', 'uglify']);

  // Test task.
  grunt.registerTask('test', ['jshint', 'qunit']);
};
