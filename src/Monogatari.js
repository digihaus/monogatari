define( [ 'core/Timer',
          'input/Keyboard',
          'input/Mouse',
          'manager/SceneManager',
          'manager/PhysicsManager',
          'manager/ObjectManager',
          'lib/Chance' ],
          function( _Timer, _Keyboard, _Mouse, _SceneManager, _PhysicsManager, _ObjectManager, _Chance ) {

  var _browser = {};
  _browser.agent = window.navigator.userAgent;
  _browser.version = window.navigator.appVersion;
  _browser.plataform = window.navigator.platform;
  _browser.isFirefox = ( _browser.agent.indexOf( 'Firefox' ) > -1 );
  _browser.isOpera = ( window.opera !== null );
  _browser.isChrome = ( _browser.agent.indexOf( 'Chrome' ) > -1 ); // Chrome on Android returns true but is a completely different browser
  _browser.isIOS = _browser.agent.indexOf( 'iPod' ) > -1 || _browser.agent.indexOf( 'iPhone' ) > -1 || _browser.agent.indexOf( 'iPad' ) > -1;
  _browser.isAndroid = ( _browser.agent.indexOf( 'Android' ) > -1 );
  _browser.isBlackberry = ( _browser.agent.indexOf( 'Blackberry' ) > -1 );
  _browser.isIE = ( _browser.agent.indexOf( 'MSIE' ) > -1 );

  var Monogatari = function() {
    this.timer = new _Timer();
    this.objects = new _ObjectManager();
    this.scenes = new _SceneManager();
    this.physics = new _PhysicsManager();
    this.random = _Chance;
    this.browser = _browser;
  };

  Monogatari.REGEXP_URL = /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
  Monogatari.REGEXP_BETWEEN_SQUARE_BRACKETS = /\[[\w|\W]+\]/;
  Monogatari.REGEXP_ENDLINE = /\r\n|\r|\n/;

  Monogatari.init = function( bgcolor, width, height, target ) {
    this.scenes.init( bgcolor, width, height, target );

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
  };

  Monogatari.update = function() {
    this.timer.tick();
    this.physics.update();
    this.objects.update();
  };

  Monogatari.render = function() {
    this.scenes.render();
  };

  Monogatari.run = function() {
    requestAnimationFrame( this.run.bind( this ) );
    this.update();
    this.render();
  };

  return Monogatari;

} );
