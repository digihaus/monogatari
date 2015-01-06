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

    clean: ['temp.js'],

    jshint: {
      all: {
        src: ['../src/**/*.js'],
        options: {
          bitwise: false,
          camelcase: true,
          curly: true,
          eqeqeq: true,
          es3: false,
          forin: true,
          freeze: true,
          immed: true,
          indent: 4,
          latedef: true,
          newcap: true,
          noarg: true,
          noempty: true,
          nonew: true,
          plusplus: true,
          quotmark: 'single',
          regexp: true,
          undef: true,
          unused: true,
          trailing: true,
          maxlen: 400,
          globals: {
            'window': true,
            'console': true,
            'document': true,
            'requestAnimationFrame': true,
            'fonts': true,
            'createjs': true,
            'Monogatari': true,
            'Class': true,
            'localStorage': true,
            'THREE': true,
            'Detector': true,
            'define': true,
            'b2World': true,
            'b2Vec': true,
            'b2Vec2': true,
            'b2ContactListener': true
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['requirejs', 'uglify']);
};
