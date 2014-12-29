define( [ 'input/Keyboard',
          'input/Mouse',
          'core/Timer',
          'manager/SceneManager',
          'manager/PhysicsManager',
          'manager/ObjectManager'], function(keyboard, mouse, timer, scene, physics, object) {

  var _browser = {};

  _browser.agent = window.navigator.userAgent;
  _browser.version = window.navigator.appVersion;
  _browser.plataform = window.navigator.platform;

  var _agent = _browser.agent;

  _browser.isFirefox = ( _agent.indexOf( 'Firefox' ) > -1 );
  _browser.isOpera = ( window.opera !== null );

  // Chrome on Android returns true but is a completely different browser with different abilities
  _browser.isChrome = ( _agent.indexOf( 'Chrome' ) > -1 );

  // if the browser is safari for iOS devices (iPad, iPhone, and iPad).
  _browser.isIOS = _agent.indexOf( 'iPod' ) > -1 || _agent.indexOf( 'iPhone' ) > -1 || _agent.indexOf( 'iPad' ) > -1;
  _browser.isAndroid = ( _agent.indexOf( 'Android' ) > -1 );
  _browser.isBlackberry = ( _agent.indexOf( 'Blackberry' ) > -1 );
  _browser.isIE = ( _agent.indexOf( 'MSIE' ) > -1 );

  return {

    init: function( bgcolor, width, height, target ) {
      scene.init( bgcolor, width, height, target );

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

    browser: _browser,

    // exposes the Chance.js to the engine context, just for consistency (does this use more memory?)
    // TODO CHECK
    Random: chance,

    // Constants

    MODE_DEBUG: 1,
    MODE_RELEASE: 2,

    ONE_MEGABYTE: 1048576, // 1024 kilobytes * 1024 bytes

    // asset state
    ASSET_STATE_LOADING: 1,
    ASSET_STATE_LOADED: 2,
    ASSET_STATE_FAILED: 3,

    FONT_CHARS_SIMPLE: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_()-,.[]!?@$* ",

    // TODO resolver minificação com acentos
    // FONT_CHARS_EXTENDED:
    // "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789������������������������������������������������_()-,.[]!?@$*",

    REGEXP_URL: /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
    REGEXP_BETWEEN_SQUARE_BRACKETS: /\[[\w|\W]+\]/,
    REGEXP_ENDLINE: /\r\n|\r|\n/,

    PHYSICS_BODYTYPE_STATIC: 1,
    PHYSICS_BODYTYPE_KINEMATIC: 2,
    PHYSICS_BODYTYPE_DYNAMIC: 3,
  }

} );
