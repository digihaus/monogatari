define( [ 'core/io/Keyboard',
          'core/io/Mouse',
          'core/Timer',
          'manager/SceneManager',
          'manager/PhysicsManager',
          'manager/ObjectManager'], function(keyboard, mouse, timer, scene, physics, object) {

  window.addEventListener( 'keyup', function( event ) {
    keyboard.onKeyUp( event );
  }, false );

  window.addEventListener( 'keydown', function( event ) {
    keyboard.onKeyDown( event );
  }, false );

  window.addEventListener( 'mousemove', function( event ) {
    mouse.onMouseMove( event );
  }, false );

  window.addEventListener( 'mousedown', function( event ) {
    mouse.onMouseDown( event );
  }, false );

  window.addEventListener( 'mouseup', function( event ) {
    mouse.onMouseUp( event );
  }, false );

  return {

    init: function( bgcolor, width, height, target ) {
      scene.init( bgcolor, width, height, target );
    },

    update: function() {
      timer.tick();
      physics.update();
      object.update();
    },

    render: function() {
      scene.render();
    },

    run: function() {
      requestAnimationFrame( this.run.bind(this) );
      this.update();
      this.render();
    },

    // exposes the Chance.js to the engine context, just for consistency (does this use more memory?)
    // TODO CHECK
    Random: chance,

    // Constants

    MODE_DEBUG: 1,
    MODE_RELEASE: 2,

    FRAME_RATE_60FPS: 0.016666666667, // 1.0 second / 60.0 frames

    ONE_MEGABYTE: 1048576, // 1024 kilobytes * 1024 bytes

    // asset state
    ASSET_STATE_LOADING: 1,
    ASSET_STATE_LOADED: 2,
    ASSET_STATE_FAILED: 3,

    // audio state
    AUDIO_STATE_STOPED: 0,
    AUDIO_STATE_PLAYING: 1,
    AUDIO_STATE_PAUSED: 2,
    AUDIO_STATE_FINISHED: 3,

    // component state
    COMPONENT_STATE_INITIALIZING: 0,
    COMPONENT_STATE_BUFFERING: 1,
    COMPONENT_STATE_READY: 2,
    COMPONENT_STATE_FAILED: 3,

    // components
    COMPONENT_BASE: 0,
    COMPONENT_NODE: 1,
    COMPONENT_THREE_OBJECT: 2,
    COMPONENT_RIGID_BODY: 3,
    COMPONENT_SPRITE: 4,
    COMPONENT_STATIC_TEXT: 5,
    COMPONENT_AUDIO_SOURCE: 6,
    COMPONENT_PARTICLE_EMITTER: 7,

    // COMPONENT_AUDIO_LISTENER: 1,
    // COMPONENT_PACKAGE_SENDER: 1,
    // COMPONENT_PACKAGE_LISTENER: 1,

    COMPONENT_CUSTOM: -1,

    FONT_CHARS_SIMPLE: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_()-,.[]!?@$* ",
    // FONT_CHARS_EXTENDED:
    // "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789������������������������������������������������_()-,.[]!?@$*",

    REGEXP_URL: /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
    REGEXP_BETWEEN_SQUARE_BRACKETS: /\[[\w|\W]+\]/,
    REGEXP_ENDLINE: /\r\n|\r|\n/,

    PHYSICS_BODYTYPE_STATIC: 1,
    PHYSICS_BODYTYPE_KINEMATIC: 2,
    PHYSICS_BODYTYPE_DYNAMIC: 3,

    DEFAULT_CAMERA_ID: 'default_camera_id',
    DEFAULT_SCENE_ID: 'default_scene_id',
  }

} );
