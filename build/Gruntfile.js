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
            optimize: 'none',
            include: [ 'requireLib' ],
            out: '../dist/monogatari.js'
          }
        }
      },

      uglify: {
        main: {
          files: {
            '../dist/monogatari.min.js': [ '../dist/monogatari.js' ]
          }
        }
      },

      clean: {
        options: {
          force: true
        },
        all: { src: [ '../dist/*' ] },
        build: { src: [ '../dist/*.js' ] },
        docs: { src: [ '../dist/docs/*' ] }
      },

      jsdoc: {
        dist: {
          src: [ '../src/**/*.js' ],
          options: {
            destination: '../dist/docs',
            readme: '../README.md',
            template: 'jsdoc/template',
            configure: 'jsdoc/conf.json'
          }
        }
      },

      watch: {
        source: {
          files: '../src/**/*',
          tasks: [ 'requirejs' ]
        },
        docs: {
          files: [ '../src/**/*', 'jsdoc/template/**/*', '../README.md' ],
          tasks: [ 'clean:docs', 'jsdoc' ]
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

      qunit: {
        all: {
          options: {
            urls: [ 'http://localhost:9000/test/unit/runtests.html' ]
          }
        }
      }
    }
  );

  grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-jsdoc' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-qunit' );

  grunt.registerTask( 'default', [ 'clean:build', 'requirejs:compile', 'uglify' ] );
  grunt.registerTask( 'test', [ 'connect', 'qunit' ] );
};
