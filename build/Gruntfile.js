module.exports = function (grunt) {
  grunt.initConfig({
	requirejs: {
	  compile: {
		options: {
		  baseUrl: "../",
		  name: "engine/GameManager",
		  out: "../monogatari.js"
		}
	  }
	},
	uglify: {
     dist: {
		src: ['../monogatari.js'],
        dest: '../monogatari-min.js'
     }
   }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default',['requirejs', 'uglify']);
};