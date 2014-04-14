module.exports = function (grunt) {
  grunt.initConfig({
    uglify: {
      dist: {
                src: [
              '../lib/Random.js',
              '../core/Monogatari.js',
              '../core/Constants.js',
              '../lib/Detector.js',
              '../lib/Three.js',
              '../lib/Box2d.js',
              '../lib/Class.js',
              '../lib/Webfont.js',
              '../core/Timer.js',
              '../core/io/Mouse.js',
              '../core/Util.js',
              '../core/Array.js',
              '../core/Math.js',
              '../core/io/Keyboard.js',
              '../core/collection/Iterator.js',
              '../core/collection/Map.js',
              '../core/collection/Set.js',
              '../engine/entity/component/ThreeObject.js',
              '../engine/entity/component/Sprite.js',
              '../core/String.js',
              '../engine/entity/component/RigidBody.js',
              '../core/io/file/AjaxAudioLoader.js',
              '../core/io/file/DomAudioLoader.js',
              '../core/io/file/FontLoader.js',
              '..engine/entity/asset/AudioAsset.js',
              '..engine/entity/asset/FontAsset.js',
              '../engine/AudioManager.js',
              '../engine/FontManager.js',
              '../engine/entity/component/Font2D.js',
              '../engine/entity/component/StaticText.js',
              '../engine/entity/component/Node.js',
              '../core/collection/List.js',
              '../engine/EventManager.js',
              '../engine/PhysicsManager.js',
              '../engine/entity/GameObject.js',
              '../core/collection/Tree.js',
              '../engine/ObjectManager.js',
              '../engine/render/Camera2D.js',
              '../engine/SceneManager.js',
              '../engine/GameManager.js'],
        dest: '../monogatari-min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default',['uglify']);
};