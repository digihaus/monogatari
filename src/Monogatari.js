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
    'core/GameObject',
    'core/World',
    'component/Audio',
    'component/Base',
    'component/RigidBody',
    'component/Sprite',
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
    GameObject,
    World,
    Audio,
    Base,
    RigidBody,
    Sprite,
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
       * Static interface to {@link module:core/Math~Math|Math} namespace
       * @memberOf module:module:Monogatari
       * @type {Math}
       * @name math
       */
      this.math = Math;

      /**
       * Static interface to {@link module:core/Timer~Timer|Timer}
       * @memberOf module:Monogatari~Monogatari
       * @type {Timer}
       * @name timer
       */
      this.timer = Timer;

      /**
       * The root node of the engine GameObject tree. Any GameObject will only be available to the engine when attached directly or indirectly to world.
       * @memberOf module:Monogatari~Monogatari
       * @type {GameObject}
       * @name world
       */
      World.gameObject = new GameObject( 'world', function(){} );
      this.world = World.gameObject;


      /**
       * Static interface to {@link module:manager/SceneManager~SceneManager|SceneManager}
       * @memberOf module:Monogatari~Monogatari
       * @type {SceneManager}
       * @name sceneManager
       */
      this.sceneManager = SceneManager;

      /**
       * Static interface to {@link module:manager/PhysicsManager~PhysicsManager|PhysicsManager}
       * @memberOf module:Monogatari~Monogatari
       * @type {PhysicsManager}
       * @name physicsManager
       */
      this.physicsManager = PhysicsManager;

      /**
       * Static interface to {@link module:manager/MessageManager~MessageManager|MessageManager}
       * @memberOf module:Monogatari~Monogatari
       * @type {MessageManager}
       * @name messageManager
       */
      this.messageManager = MessageManager;

      /**
       * Provides access to {@link module:core/GameObject~GameObject|GameObject} class.
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {GameObject}
       * @name GameObject
       */
      this.GameObject = GameObject;

      // Input

      /**
       * Static interface to {@link module:input/Keyboard~Keyboard|Keyboard}
       * @memberOf module:Monogatari~Monogatari
       * @type {Keyboard}
       * @name keyboard
       */
      this.keyboard = null;
      /**
       * Static interface to {@link module:input/Mouse~Mouse|Mouse}
       * @memberOf module:Monogatari~Monogatari
       * @type {Mouse}
       * @name mouse
       */
      this.mouse = null;
      this.gamepad = null;

      // Utils

      /**
       * Static interface to {@link module:util/ArrayUtils~ArrayUtils|ArrayUtils}
       * @memberOf module:Monogatari~Monogatari
       * @type {ArrayUtils}
       * @name arrayUtils
       */
      this.arrayUtils = ArrayUtils;
      /**
       * Static interface to {@link module:util/CommonUtils~CommonUtils|CommonUtils}
       * @memberOf module:Monogatari~Monogatari
       * @type {CommonUtils}
       * @name commonUtils
       */
      this.commonUtils = CommonUtils;
      /**
       * Static interface to {@link module:util/StringUtils~StringUtils|StringUtils}
       * @memberOf module:Monogatari~Monogatari
       * @type {StringUtils}
       * @name stringUtils
       */
      this.stringUtils = StringUtils;
      this.browser = _browser;

      // Collection Classes

      /**
       * Provides access to {@link module:collection/List~List|List} Class.
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {List}
       * @name List
       */
      this.List = List;
      /**
       * Provides access to {@link module:collection/Map~Map|Map} Class.
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {Map}
       * @name Map
       */
      this.Map = Map;
      /**
       * Provides access to {@link module:collection/Tree~Tree|Tree} Class.
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {Tree}
       * @name Tree
       */
      this.Tree = Tree;
      /**
       * Provides access to {@link module:collection/LinkedList~LinkedList|LinkedList} Class.
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {LinkedList}
       * @name LinkedList
       */
      this.LinkedList = LinkedList;

      // Component Classes

      /**
       * Provides access to {@link module:component/Audio~Audio|Audio} Component.
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {Audio}
       * @name Audio
       */
      this.Audio = Audio;
      /**
       * Provides access to {@link module:component/Base~Base|Base} Component.
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {Base}
       * @name Base
       */
      this.Base = Base;

      /**
       * Provides access to {@link module:component/RigidBody~RigidBody|RigidBody} Component.
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {RigidBody}
       * @name RigidBody
       */
      this.RigidBody = RigidBody;
      /**
       * Provides access to {@link module:component/Sprite~Sprite|Sprite} Component.
       * @memberOf module:Monogatari~Monogatari
       * @instance
       * @type {Sprite}
       * @name Sprite
       */
      this.Sprite = Sprite;
    };

    /**
     * Engine initialization function. Creates the default Scene and Camera and register the input events.
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
     * Engine logical update function. Control engine timer and cycles through all GameObjects and needed components updating them.
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
    Monogatari.prototype.run = function( loading, loaded ) {
      if( loaded ) {
        this.update();
        this.render();

      } else {
        var loadPercentage = this.world.load();
        
        if(loading instanceof Function) {
          loading( loadPercentage );
        }
        
        if(loadPercentage == 1) {
          loaded = true;
        }
      }

      requestAnimationFrame( this.run.bind( this, loading, loaded ) );
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