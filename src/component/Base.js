define(
  function() {

    /**
     * Base class that all components extend.
     * @abstract
     * @exports component/Base
     */
    var Base = function( type ) {
      /**
       * Actual component type.
       * @type {module:component/Base.TYPE}
       */
      this.type = type;

      /**
       * Current component state.
       * @type {module:component/Base.STATE}
       */
      this.state = Base.STATE.INITIALIZING;
    };

    /**
     * Enumeration of component types.
     * @enum {number}
     */
    Base.TYPE = {
      /** Managed 2D asset renderable by THREE. */
      SPRITE: 0,
      /** Physics for Box2d. */
      RIGID_BODY: 1,
      /** Audio source. */
      AUDIO: 2
    };

    /**
     * Enumeration of component states.
     * @enum {number}
     */
    Base.STATE = {
      /** Component was created and may need further steps before use */
      INITIALIZING: 0,
      /** Component is buffering resources */
      BUFFERING: 1,
      /** Component resources are loaded */
      LOADED: 2,
      /** Component is built and ready for use */
      READY: 3,
      /** Component is active */
      RUNNING: 4,
      /** Component is registered for internal management */
      REGISTERED: 5,
      /** An error occurred and the component cannot be used */
      FAILED: -1
    };

    return Base;
  }
);
