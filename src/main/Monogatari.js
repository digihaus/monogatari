/**
 * Exports a singleton instance of {@link module:Monogatari~Monogatari|Monogatari} class.
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
    'component/Audio',
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
    Audio,
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
     * Core of the engine, bootstraps every other entity by means of static functions or classes.
     * @class Monogatari
     */
    var Monogatari = function() {

      /**
       * @memberOf module:module:Monogatari
       * @type Math
       * @name math
       */
      this.math = Math;

      /**
       * @memberOf module:Monogatari~Monogatari
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
       * @memberOf module:Monogatari~Monogatari
       * @type {SceneManager}
       * @name sceneManager
       */
      this.sceneManager = SceneManager;

      /**
       * @memberOf module:Monogatari~Monogatari
       * @type {PhysicsManager}
       * @name physicsManager
       */
      this.physicsManager = PhysicsManager;

      /**
       * @memberOf module:Monogatari~Monogatari
       * @type {MesssageManager}
       * @name messageManager
       */
      this.messageManager = MessageManager;

      /**
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {GameObject}
       * @name GameObject
       */
      this.GameObject = GameObject;

      // Input

      /**
       * @memberOf module:Monogatari~Monogatari
       * @type {Keyboard}
       * @name keyboard
       */
      this.keyboard = null;
      /**
       * @memberOf module:Monogatari~Monogatari
       * @type {Mouse}
       * @name mouse
       */
      this.mouse = null;
      this.gamepad = null;

      // Utils

      /**
       * @memberOf module:Monogatari~Monogatari
       * @type {ArrayUtils}
       * @name arrayUtils
       */
      this.arrayUtils = ArrayUtils;
      /**
       * @memberOf module:Monogatari~Monogatari
       * @type {CommonUtils}
       * @name commonUtils
       */
      this.commonUtils = CommonUtils;
      /**
       * @memberOf module:Monogatari~Monogatari
       * @type {StringUtils}
       * @name stringUtils
       */
      this.stringUtils = StringUtils;
      this.browser = _browser;
      /**
       * Chance.js interface
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {Object}
       * @name Random
       */
      this.Random = Chance; // Class
      /**
       * Loki.js interface
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {Object}
       * @name Db
       */
      this.Db = Loki;

      // Collection Classes

      /**
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {List}
       * @name List
       */
      this.List = List;
      /**
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {Map}
       * @name Map
       */
      this.Map = Map;
      /**
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {Tree}
       * @name Tree
       */
      this.Tree = Tree;
      /**
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {LinkedList}
       * @name LinkedList
       */
      this.LinkedList = LinkedList;

      // Component Classes

      /**
       * Audio component
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {Audio}
       * @name Audio
       */
      this.Audio = Audio;
      /**
       * Base component
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {Base}
       * @name Base
       */
      this.Base = Base;
      /**
       * BaseThree component
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {BaseThree}
       * @name BaseThree
       */
      this.BaseThree = BaseThree;
      /**
       * RigidBody component
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {RigidBody}
       * @name RigidBody
       */
      this.RigidBody = RigidBody;
      /**
       * Sprite component
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {Sprite}
       * @name Sprite
       */
      this.Sprite = Sprite;
      /**
       * Text Component
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {Text}
       * @name Text
       */
      this.Text = Text;
      /**
       * FlyText Component
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {FlyText}
       * @name FlyText
       */
      this.FlyText = FlyText;
    };

    /**
     * Engine initialization function
     * @method
     * @instance
     * @param {String} bgcolor Hexadecimal background color
     * @param {Number} [width] Width of the canvas in pixels. Defaults to screen resolution.
     * @param {Number} [height] Height of the canvas in pixels. Defaults to screen resolution.
     * @param {DOMElement} [target] Target node of the Dom tree to create a canvas renderer. It is attached to the body if not provided.
     * @name init
     * @memberOf module:Monogatari~Monogatari
     */
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

    /**
     * Engine logical update function. Cycles through all GameObjects and needed components updating them.
     * @method
     * @instance
     * @name update
     * @memberOf module:Monogatari~Monogatari
     */
    Monogatari.prototype.update = function() {
      this.timer.tick();
      this.physicsManager.update( this.timer );
      this.world.updateAll();
    };

    /**
     * Engine render function. Cycles through all Cameras and Scenes rendering the registered components on screen.
     * @method
     * @instance
     * @name render
     * @memberOf module:Monogatari~Monogatari
     */
    Monogatari.prototype.render = function() {
      this.sceneManager.render();
    };

    /**
     * Engine main heartbeat function.
     * @method
     * @instance
     * @name run
     * @memberOf module:Monogatari~Monogatari
     */
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