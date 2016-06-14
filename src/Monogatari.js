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
    'component/Audio',
    'component/Base',
    'component/RigidBody',
    'component/Sprite',
    'collection/List',
    'collection/Map',
    'collection/Tree',
    'collection/LinkedList',
    'util/ArrayUtils',
    'util/CommonUtils'
  ],
  function( Timer,
            Math,
            Keyboard,
            Mouse,
            SceneManager,
            PhysicsManager,
            MessageManager,
            GameObject,
            Audio,
            Base,
            RigidBody,
            Sprite,
            List,
            Map,
            Tree,
            LinkedList,
            ArrayUtils,
            CommonUtils ) {

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
     * Core of the engine, bootstraps every other entity and exposes them.
     * @requires core/Timer
     * @requires core/Math
     * @requires input/Keyboard
     * @requires input/Mouse
     * @requires manager/SceneManager
     * @requires manager/PhysicsManager
     * @requires manager/MessageManager
     * @requires core/GameObject
     * @requires component/Audio
     * @requires component/Base
     * @requires component/RigidBody
     * @requires component/Sprite
     * @requires collection/List
     * @requires collection/Map
     * @requires collection/Tree
     * @requires collection/LinkedList
     * @requires util/ArrayUtils
     * @requires util/CommonUtils
     * @exports Monogatari
     */
    var Monogatari = {};

    /**
     * Exposes the {@link module:core/Math|Math} module.
     * @type {module:core/Math}
     */
    Monogatari.math = Math;

    /**
     * Exposes the {@link module:core/Timer|Timer} module.
     * @type {module:core/Timer}
     */
    Monogatari.timer = Timer;

    /**
     * Exposes the root node of the engine GameObject tree.
     * Any GameObject will only be available to the engine when attached directly or indirectly to world.
     * @type {module:core/GameObject}
     */
    Monogatari.world = new GameObject( 'world', function() {
    } );

    /**
     * Exposes the {@link module:manager/SceneManager|SceneManager}.
     * @type {module:manager/SceneManager}
     */
    Monogatari.sceneManager = SceneManager;

    /**
     * Exposes the {@link module:manager/PhysicsManager|PhysicsManager}.
     * @type {module:manager/PhysicsManager}
     */
    Monogatari.physicsManager = PhysicsManager;

    /**
     * Exposes the {@link module:manager/MessageManager|MessageManager}.
     * @type {module:manager/MessageManager}
     */
    Monogatari.messageManager = MessageManager;

    /**
     * Exposes the {@link module:core/GameObject|GameObject} class module.
     * @type {module:core/GameObject}
     */
    Monogatari.GameObject = GameObject;

    /**
     * Exposes the {@link module:input/Keyboard|Keyboard} module.
     * @type {module:input/Keyboard}
     */
    Monogatari.keyboard = null;

    /**
     * Exposes the {@link module:input/Keyboard.KEY|Keyboard Keys} enum.
     * @constant
     * @type {module:input/Keyboard.KEY}
     */
    Monogatari.KB_KEY = Keyboard.KEY;

    /**
     * Exposes the {@link module:input/Mouse|Mouse} module.
     * @type {module:input/Mouse}
     */
    Monogatari.mouse = null;

    /**
     * Exposes the {@link module:input/Mouse.BUTTON|Mouse Buttons} enum.
     * @constant
     * @type {module:input/Mouse.BUTTON}
     */
    Monogatari.MOUSE_BTN = Mouse.BUTTON;

    /**
     * Exposes the {@link module:util/ArrayUtils|ArrayUtils} module.
     * @type {module:util/ArrayUtils}
     */
    Monogatari.arrayUtils = ArrayUtils;

    /**
     * Exposes the {@link module:util/CommonUtils|CommonUtils} module.
     * @type {module:util/CommonUtils}
     */
    Monogatari.commonUtils = CommonUtils;

    /** */
    Monogatari.browser = _browser;

    /**
     * Exposes the {@link module:collection/List|List} collection module class.
     * @type {module:collection/List}
     */
    Monogatari.List = List;

    /**
     * Exposes the {@link module:collection/Map|Map} collection module class.
     * @type {module:collection/Map}
     */
    Monogatari.Map = Map;

    /**
     * Exposes the {@link module:collection/Tree|Tree} collection module class.
     * @type {module:collection/Tree}
     */
    Monogatari.Tree = Tree;

    /**
     * Exposes the {@link module:collection/LinkedList|LinkedList} collection module class.
     * @type {module:collection/LinkedList}
     */
    Monogatari.LinkedList = LinkedList;

    /**
     * Exposes the {@link module:component/Audio|Audio} component module class.
     * @type {module:component/Audio}
     */
    Monogatari.Audio = Audio;

    /**
     * PExposes the {@link module:component/Base|Base} component module class.
     * @type {module:component/Base}
     */
    Monogatari.Base = Base;

    /**
     * Exposes the {@link module:component/RigidBody|RigidBody} component module class.
     * @type {module:component/RigidBody}
     */
    Monogatari.RigidBody = RigidBody;

    /**
     * Exposes the {@link module:component/Sprite|Sprite} component module class.
     * @type {module:component/Sprite}
     */
    Monogatari.Sprite = Sprite;


    /**
     * Engine initialization function. Creates the default Scene and Camera and register the input events.
     * @param {String} bgcolor - Hexadecimal background color
     * @param {Number} [width] - Width of the canvas in pixels. Defaults to screen resolution.
     * @param {Number} [height] - Height of the canvas in pixels. Defaults to screen resolution.
     * @param {DOMElement} [target] T- arget node of the Dom tree to create a canvas renderer. It is attached to the body if not provided.
     */
    Monogatari.init = function( bgcolor, width, height, target ) {
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
          ctx.mouse.onMouseUp( event );
        }, false
      );

    };

    /**
     * Engine logical update function. Controls engine timer and cycles through all GameObjects and needed components while updating them.
     */
    Monogatari.update = function() {
      this.timer.tick();
      this.physicsManager.update( this.timer );
      this.world.updateAll();
    };

    /**
     * Engine render function. Cycles through all Cameras and Scenes rendering the registered components on screen.
     */
    Monogatari.render = function() {
      this.sceneManager.render();
    };

    /**
     * Engine main heartbeat function.
     * @param {Boolean} [loaded] - If all assets in current world finished loading
     */
    Monogatari.run = function( loaded ) {
      if( loaded ) {
        this.update();
        this.render();

      } else {
        var loadPercentage = this.world.load();
        if( loadPercentage == 1 ) {
          loaded = true;
        }
        Monogatari.loadingProgress( loadPercentage * 100);
      }

      requestAnimationFrame( this.run.bind( this, loaded ) );
    };

    /**
     * Function to be overridden with a way to show the asset loading progress.
     * @param {Number} percentage - The total percentage of loaded assets
     * @abstract
     */
    Monogatari.loadingProgress = function( percentage ) {
      console.log( percentage + '%' );
    };

    return Monogatari;
  }
);