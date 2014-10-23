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
	uglify: {
     dist: {
	   src: ['./temp.js'],
       dest: '../monogatari-min.js',
     }
    },
	clean: ['./temp.js']
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default',['requirejs', 'uglify', 'clean']);
};