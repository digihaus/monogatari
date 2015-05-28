module.exports = function( grunt ) {
  grunt.initConfig(
    {
      pkg: grunt.file.readJSON( 'package.json' ),

      signature: '/*!\n' +
      ' * <%= pkg.name %> <%= pkg.release %>\n' +
      ' * http://github.com/gemuzon/monogatari\n' +
      ' * MIT License\n' +
      ' */\n',

      requirejs: {
        compile: {
          options: {
            baseUrl: '../src/',
            paths: {
              'lib': '../lib',
              'lib/Box2d': '../lib/box2d',
              'lib/Three': '../lib/three.min'
            },
            include: [ 'lib/require' ],
            name: 'Monogatari',
            optimize: 'none',
            wrap: {
              start: '<%=signature%>'
            },
            out: '../dist/monogatari.js'
          }
        }
      },

      uglify: {
        release: {
          options: {
            compress: true,
            preserveComments: 'none',
            banner: '<%=signature%>'
          },
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
            destination: '../dist/docs/<%=pkg.release%>',
            readme: '../README.md',
            template: 'jsdoc/template',
            configure: 'jsdoc/conf.json'
          }
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

      watch: {
        source: {
          files: '../src/**/*',
          tasks: [ 'requirejs:compile' ]
        },
        docs: {
          files: [ '../src/**/*', 'jsdoc/template/**/*', '../README.md' ],
          tasks: [ 'clean:docs', 'jsdoc' ]
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

  grunt.registerTask( 'purge', [ 'clean:all' ] );
  grunt.registerTask( 'clear', [ 'clean:build' ] );
  grunt.registerTask( 'compile', [ 'requirejs' ] );
  grunt.registerTask( 'docs', [ 'clean:docs', 'jsdoc' ] );
  grunt.registerTask( 'release', [ 'clean:all', 'requirejs', 'uglify', 'jsdoc' ] );

  grunt.registerTask( 'live', [ 'connect', 'watch:source' ] );
};
