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
        all: {
          files: '../src/**/*',
          tasks: [ 'requirejs' ]
        }
      },

      connect: {
        server: {
          options: {
            port: 9000,
            base: '../'
          }
        }
      }

    }
  );

  grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );

  grunt.registerTask( 'default', [ 'requirejs' ] );
  grunt.registerTask( 'live', [ 'connect', 'watch' ] );
};
