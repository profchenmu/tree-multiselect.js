var config = require('./conf/config.js');

module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Karma runner
    karma: {
      options: {
        configFile: 'conf/karma.js',
      },
      local: {
      },
      continuous: {
        autoWatch: true,
        singleRun: false
      }
    },

    // JSHint
    jshint: {
      all: ['src/jquery.tree-multiselect.js']
    },

    // SASS compiler
    sass: {
      options: {
        sourceMap: true,
        // outputStyle: 'compressed'
      },
      dist: {
        files: {
          'dist/jquery.tree-multiselect.min.css': 'src/jquery.tree-multiselect.scss'
        }
      }
    },

    // Uglify JS
    uglify: {
      dist: {
        options: {
          preserveComments: true,
        },
        files: {
          'dist/jquery.tree-multiselect.min.js': ['src/jquery.tree-multiselect.js']
        }
      }
    },

    // Put headers on distributed files
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: "/* jQuery Tree Multiselect v<%= pkg.version %> | " +
                  "(c) Patrick Tsai et al. | MIT Licensed */",
          linebreak: true
        },
        files: {
          src: ['dist/*.min.*']
        }
      }
    },

    // Upload LCOV data to coveralls.io
    coveralls: {
      options: {
        force: true
      },
      ci: {
        src: 'coverage/**/lcov.info'
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-coveralls');

  grunt.registerTask('test-local', ['karma:local', 'jshint']);
  grunt.registerTask('test-travis', ['test-local', 'coveralls']);
  grunt.registerTask('test-watch', ['karma:continuous']);
  grunt.registerTask('release', ['test-local', 'sass', 'uglify', 'usebanner']);

  grunt.registerTask('default', 'test-local');
};
