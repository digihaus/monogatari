module.exports = function( grunt ) {
  grunt.initConfig(
    {
      pkg: grunt.file.readJSON( 'package.json' ),

      requirejs: {
        compile: {
          options: {
            baseUrl: '../src/',
            paths: {
              requireLib: '../lib/Require',
              lib: '../lib'
            },
            name: 'Monogatari',
            preserveLicenseComments: false,
            optimize: 'uglify2',
            include: [ 'requireLib' ],
            out: '../dist/monogatari.min.js'
          }
        }
      },

      watch: {
        source: {
          files: '../src/**/*',
          tasks: [ 'requirejs' ]
        },
        docs: {
          files: '../src/**/*',
          tasks: [ 'jsdoc' ]
        }
      },

      connect: {
        server: {
          options: {
            port: 9000,
            base: '../'
          }
        }
      },

      jsdoc: {
        dist: {
          src: [ '../src/**/*.js' ],
          options: {
            destination: '../dist/docs'//,
            // template: 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template',
            // configure: 'jsdoc.conf.json'
          }
        }
      }
    }
  );

  grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-jsdoc' );

  grunt.registerTask( 'default', [ 'requirejs', 'jsdoc' ] );

  grunt.registerTask( 'live', [ 'connect', 'watch:source' ] );

  grunt.registerTask( 'watchdocs', [ 'watch:docs' ] );
};
