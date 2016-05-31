/**
 * Exports the {@link module:component/Base~Base|Base} class.
 * @module component/Base
 */
define(
  function() {
    /**
     * This is the abstract class that all components shall extend.
     * @abstract
     * @class Base
     */
    var Component = function( type ) {
      /**
       * Component Type
       * @memberOf module:component/Base~Base
       * @instance
       * @type {Number}
       * @name type
       */
      this.type = ( type ) ? type : Component.BASE;

      /**
       * Flag to indicate if this component should be rendered on screen
       * @memberOf module:component/Base~Base
       * @instance
       * @type {Boolean}
       * @name isRenderable
       * @default false
       */
      this.isRenderable = false;

      /**
       * Flag to indicate if this component has loadable resources
       * @memberOf module:component/Base~Base
       * @intance
       * @type {Boolean}
       * @name isLoadable
       * @default false
       */
      this.isLoadable = false;

      /**
       * Current component state
       * @type {Number|number}
       */
      this.state = Component.STATE_INITIALIZING;
    };

    Component.prototype.setState = function( state ){
      this.state = state;
    };

    /**
     * Enumeration of component states
     * @memberOf module:component/Base~Base
     * @enum
     * @name STATE
     * @example
     *
     * Component.STATE_INITIALIZING = 0;
     * Component.STATE_BUFFERING = 1;
     * Component.STATE_READY = 2;
     * Component.STATE_REGISTERED = 3;
     * Component.STATE_FAILED = -1;
     *
     * @type {Number}
     */
    Component.STATE_INITIALIZING = 0;
    Component.STATE_BUFFERING = 1;
    Component.STATE_READY = 2;
    Component.STATE_RUNNING = 3; 
    Component.STATE_REGISTERED = 4;
    Component.STATE_FAILED = -1;

    /**
     * Enumeration of component types
     * @example
     *
     * Component.BASE = 0;
     * Component.BASE_THREE = 1;
     * Component.BASE_FONT = 2;
     * Component.RIGID_BODY = 3;
     * Component.SPRITE = 4;
     * Component.TEXT = 5;
     * Component.FLY_TEXT = 6;
     * Component.AUDIO_SOURCE = 7;
     * Component.PARTICLE_EMITTER = 8;
     * Component.CUSTOM = -1;
     *
     * @memberOf module:component/Base~Base
     * @enum
     * @name TYPE
     * @type {Number}
     */
    Component.BASE = 0;
    Component.BASE_THREE = 1;
    Component.BASE_FONT = 2;
    Component.RIGID_BODY = 3;
    Component.SPRITE = 4;
    Component.TEXT = 5;
    Component.FLY_TEXT = 6;
    Component.AUDIO_SOURCE = 7;
    Component.PARTICLE_EMITTER = 8;
    Component.TILEMAP = 9;
    Component.CUSTOM = -1;

    return Component;
  }
);
