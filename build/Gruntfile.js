module.exports = function (grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    requirejs: {
      compile: {
        options: {
          baseUrl: '../src/',
          paths: {
            requireLib: '../lib/Require',
            lib: '../lib'
          },
          name: 'Monogatari',
          include: ['requireLib'],
          out: '../dist/monogatari-<%= pkg.version %>.js'
        }
      }
    },

    uglify: {
      dist: {
        src: ['../dist/monogatari-<%= pkg.version %>.js'],
        dest: '../dist/monogatari-<%= pkg.version %>.min.js',
      }
    },

    watch: {
      all: {
        files: '../src/**/*',
        tasks: ['requirejs', 'uglify']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['requirejs', 'uglify']);
};
