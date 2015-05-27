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

      clean: {
        all: {
          src: [ '../dist/*' ],
          options: {
            force: true
          }
        },
        docs: {
          src: [ '../dist/docs/*' ],
          options: {
            force: true
          }
        }
      },

      jsdoc: {
        dist: {
          src: [ '../src/**/*.js' ],
          options: {
            destination: '../dist/docs',
            readme: '../README.md',
            package: 'package.json',
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
            urls: [ 'http://localhost:9000/test/unit/test-runner.html' ]
          }
        }
      }
    }
  );

  grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-jsdoc' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-qunit' );

  grunt.registerTask( 'default', [ 'connect', 'qunit', 'clean:all', 'requirejs', 'jsdoc' ] );
  grunt.registerTask( 'test', [ 'connect', 'qunit' ] );
};
