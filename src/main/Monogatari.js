/**
 * Exports a singleton instance of {@link Monogatari} class.
 * @module Monogatari
 */
define(
  [
    'core/Timer',
    'core/Math',
    'input/Keyboard',
    'input/Mouse',
    'manager/SceneManager',
    'manager/PhysicsManager',
    'manager/MessageManager',
    'lib/Chance',
    'lib/lokijs.min',
    'core/GameObject',
    'core/World',
    //'component/Audio',
    'component/Base',
    'component/BaseThree',
    'component/RigidBody',
    'component/Sprite',
    'component/Text',
    'component/FlyText',
    'collection/List',
    'collection/Map',
    'collection/Tree',
    'collection/LinkedList',
    'util/ArrayUtils',
    'util/CommonUtils',
    'util/StringUtils'
  ],
  function(
    Timer,
    Math,
    Keyboard,
    Mouse,
    SceneManager,
    PhysicsManager,
    MessageManager,
    Chance,
    Loki,
    GameObject,
    World,
    //Audio,
    Base,
    BaseThree,
    RigidBody,
    Sprite,
    Text,
    FlyText,
    List,
    Map,
    Tree,
    LinkedList,
    ArrayUtils,
    CommonUtils,
    StringUtils
  ) {

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

    /**
     * @class Monogatari
     */
    var Monogatari = function() {

      /**
       * @memberOf Monogatari
       * @type Math
       * @name math
       */
      this.math = Math;

      /**
       * @memberOf Monogatari
       * @type {Timer}
       * @name timer
       */
      this.timer = Timer;

      /**
       * The root node of the engine GameObject tree. Any GameObject will only be available to the engine when attached directly or indirectly to world.
       */
      World.gameObject = new GameObject( 'world', function(){} );
      this.world = World.gameObject;


      /**
       * @memberOf Monogatari
       * @type {SceneManager}
       * @name sceneManager
       */
      this.sceneManager = SceneManager;

      /**
       * @memberOf Monogatari
       * @type {PhysicsManager}
       * @name physicsManager
       */
      this.physicsManager = PhysicsManager;

      /**
       * @memberOf Monogatari
       * @type {MesssageManager}
       * @name messageManager
       */
      this.messageManager = MessageManager;

      /**
       * Use to create new GameObjects.
       * @type {GameObject}
       */
      this.GameObject = GameObject;

      // Input
      this.keyboard = null;
      this.mouse = null;
      this.gamepad = null;

      // Utils
      this.arrayUtils = ArrayUtils;
      this.commonUtils = CommonUtils;
      this.stringUtils = StringUtils;
      this.browser = _browser;
      this.Random = Chance; // Class
      this.Db = Loki;

      // Collection Classes
      this.List = List;
      this.Map = Map;
      this.Tree = Tree;
      this.LinkedList = LinkedList;

      // Component Classes
      //this.Audio = Audio;
      this.Base = Base;
      this.BaseThree = BaseThree;
      this.RigidBody = RigidBody;
      this.Sprite = Sprite;
      this.Text = Text;
      this.FlyText = FlyText;
    };

    Monogatari.prototype.init = function( bgcolor, width, height, target ) {
      var ctx = this;
      this.sceneManager.init( bgcolor, width, height, target );

      // Keyboard input setup
      this.keyboard = new Keyboard();
      window.addEventListener(
        'keyup', function( event ) {
          ctx.keyboard.onKeyUp( event, ctx.timer );
        }, false
      );
      window.addEventListener(
        'keydown', function( event ) {
          ctx.keyboard.onKeyDown( event, ctx.timer );
        }, false
      );

      // Mouse input setup
      this.mouse = new Mouse();
      window.addEventListener(
        'mousemove', function( event ) {
          ctx.mouse.onMouseMove( event, ctx.timer );
        }, false
      );
      window.addEventListener(
        'mousedown', function( event ) {
          ctx.mouse.onMouseDown( event, ctx.timer );
        }, false
      );
      window.addEventListener(
        'mouseup', function( event ) {
          ctx.mouse.onMouseUp( event, ctx.timer );
        }, false
      );

    };

    Monogatari.prototype.update = function() {
      this.timer.tick();
      this.physicsManager.update( this.timer );
      this.world.updateAll();
    };

    Monogatari.prototype.render = function() {
      this.sceneManager.render();
    };

    Monogatari.prototype.run = function() {
      requestAnimationFrame( this.run.bind( this ) );
      this.update();
      this.render();
    };

    var instance = null;

    Monogatari.getInstance = function() {
      if( instance === null ) {
        instance = new Monogatari();
      }
      return instance;
    };

    return Monogatari.getInstance();
  }
);