define( [ 'core/Timer',
          'input/Keyboard',
          'input/Mouse',
          'manager/SceneManager',
          'manager/PhysicsManager',
          'manager/ObjectManager',
          'lib/Chance',
          'core/GameObject',
          'component/Sprite'],
          function( _Timer, _Keyboard, _Mouse, _SceneManager, _PhysicsManager, _ObjectManager, _Chance , _GameObject, _Sprite) {

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
    this.objectManager = new _ObjectManager();
    this.sceneManager = new _SceneManager();
    this.physicsManager = new _PhysicsManager();
    this.random = _Chance;
    this.browser = _browser;
    this.keyboard = null;
    this.mouse = null;

    this.GameObject = _GameObject;
    this.Sprite = _Sprite;
  };

  Monogatari.prototype.init = function( bgcolor, width, height, target ) {
    var ctx = this;
    this.sceneManager.init( bgcolor, width, height, target );

    // keyboard input setup
    this.keyboard = new _Keyboard();
    window.addEventListener( 'keyup', function( event ) {
      ctx.keyboard.onKeyUp( event, ctx.timer );
    }, false );
    window.addEventListener( 'keydown', function( event ) {
      ctx.keyboard.onKeyDown( event, ctx.timer );
    }, false );

    // mouse input setup
    this.mouse = new _Mouse();
    window.addEventListener( 'mousemove', function( event ) {
      ctx.mouse.onMouseMove( event, ctx.timer );
    }, false );
    window.addEventListener( 'mousedown', function( event ) {
      ctx.mouse.onMouseDown( event, ctx.timer );
    }, false );
    window.addEventListener( 'mouseup', function( event ) {
      ctx.mouse.onMouseUp( event, ctx.timer );
    }, false );

  };

  Monogatari.prototype.update = function() {
    this.timer.tick();
    this.physicsManager.update();
    this.objectManager.update();
  };

  Monogatari.prototype.render = function() {
    this.sceneManager.render();
  };

  Monogatari.prototype.run = function() {
    requestAnimationFrame( this.run.bind( this ) );
    this.update();
    this.render();
  };

  return new Monogatari();

} );
