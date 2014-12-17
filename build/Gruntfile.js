module.exports = function (grunt) {
  grunt.initConfig({

    requirejs: {
      compile: {
        options: {
          baseUrl: '../',
          name: 'engine/GameManager',
          out: './temp.js'
        }
      }
    },

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      dist: {
        src: ['./temp.js'],
        dest: '../monogatari-<%= pkg.version %>.min.js',
      }
    },

    clean: ['./temp.js'],

    jshint: {
      all: {
        src: ['../core/**.js', '../engine/**.js'],
        options: {
          bitwise: false,
          camelcase: true,
          curly: true,
          eqeqeq: true,
          forin: true,
          immed: true,
          indent: 4,
          latedef: true,
          newcap: true,
          noarg: true,
          noempty: true,
          nonew: true,
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
            'Monogatari': true,
            'localStorage': true,
            'THREE': true,
            'Detector': true,
            'define': true
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default',['requirejs', 'uglify', 'clean']);
};
