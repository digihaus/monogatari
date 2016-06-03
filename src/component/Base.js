/**
 * Exports the {@link module:component/Base~Base|Base} class.
 * @module component/Base
 */
define(
    function () {

      /**
       * This is the abstract class that all components shall extend.
       * @abstract
       * @class Base
       */
      var Component = function (type) {
        /**
         * Component Type
         * @memberOf module:component/Base~Base
         * @instance
         * @type {Number}
         * @name type
         */
        this.type = ( type ) ? type : Component.TYPE.BASE;

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
        this.state = Component.STATE.INITIALIZING;
      };

      Component.prototype.setState = function (state) {
        this.state = state;
      };

      /**
       * Enumeration of component types
       * @example
       *
       * TYPE.BASE
       * TYPE.BASE_THREE
       * TYPE.RIGID_BODY
       * TYPE.SPRITE
       * TYPE.AUDIO
       *
       * @memberOf module:component/Base~Base
       * @enum
       * @name TYPE
       * @type {Number}
       */
      Component.TYPE = {
        BASE: 0,
        BASE_THREE: 1,
        RIGID_BODY: 2,
        SPRITE: 3,
        AUDIO: 4
      };

      /**
       * Enumeration of component states
       * @memberOf module:component/Base~Base
       * @enum
       * @name STATE
       * @example
       *
       * STATE.INITIALIZING
       * STATE.BUFFERING
       * STATE.LOADED
       * STATE.READY
       * STATE.REGISTERED
       * STATE.FAILED
       *
       * @type {Number}
       */
      Component.STATE = {
        INITIALIZING: 0,
        BUFFERING: 1,
        LOADED: 2,
        READY: 3,
        RUNNING: 4,
        REGISTERED: 5,
        FAILED: -1
      };

      return Component;
    }
);
