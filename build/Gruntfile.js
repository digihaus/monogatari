module.exports = function( grunt ) {
  grunt.initConfig( {

    pkg : grunt.file.readJSON( 'package.json' ),

    requirejs : {
      compile : {
        options : {
          baseUrl : '../src/',
          paths : {
            requireLib : '../lib/Require',
            lib : '../lib'
          },
          name : 'Monogatari',
          optimize: 'none',
          include : [ 'requireLib' ],
          out : '../dist/monogatari.js'
        }
      }
    },

    uglify : {
      dist : {
        src : [ '../dist/monogatari.js' ],
        dest : '../dist/monogatari.min.js',
      }
    },

    watch : {
      all : {
        files : '../src/**/*',
        tasks : [ 'requirejs', 'uglify' ]
      }
    },

    connect : {
      server : {
        options : {
          port : 9000,
          base : '../'
        }
      }
    }

  } );

  grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );

  grunt.registerTask( 'default', [ 'requirejs', 'uglify' ] );

  grunt.registerTask( 'live', [ 'connect', 'watch' ] );
};
