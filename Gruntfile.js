/*global module:false*/

var handlebarsHelpers = {
  'uppercase': function(options) {
    return options.fn(this).toUpperCase();
  }
};

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.0.1',
      banner: '/*! Copyright (c) Charles Lavery */'
    },
    watch: {
      site: {
        files: ['templates/**/*', 'pages/**/*'],
        tasks: 'generator:dev'
      },
    },
    connect: {
      dev: {
        options: {
          port: 8000,
          base: 'build/'
        }
      }
    },
    generator: {
      dev: {
        files: [
          { cwd: 'pages', src: ['**/*'], dest: 'build', ext: '.html' }
        ],
        options: {
          templates: 'templates',
          development: true,
          handlebarsHelpers: handlebarsHelpers
        }
      },
      prod: {
        options: {
          templates: 'templates',
          development: false,
          handlebarsHelpers: handlebarsHelpers
        }
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-generator' );

  grunt.registerTask('default', ['connect', 'generator:dev', 'watch']);
  grunt.registerTask('build', ['generator:prod']);
};
