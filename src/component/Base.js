define(
  function() {

    /**
     * Base class that all components extend.
     * @exports component/Base
     */
    var Base = function( type ) {

      /**
       * Actual component type.
       * @type {module:component/Base.TYPE}
       * @default TYPE.BASE
       */
      this.type = ( type ) ? type : Base.TYPE.BASE;

      /**
       * Current component state.
       * @type {module:component/Base.STATE}
       * @default STATE.INITIALIZING
       */
      this.state = Base.STATE.INITIALIZING;

      /**
       * Indicates if the component should be rendered on screen.
       * @type {Boolean}
       * @default false
       */
      this.isRenderable = false;

      /**
       * Indicates if the component has loadable resources.
       * @type {Boolean}
       * @default false
       */
      this.isLoadable = false;
    };

    /**
     * Enumeration of component types.
     * @enum {number}
     */
    Base.TYPE = {
      /** Abstract basic type. */
      BASE: 0,
      /** Abstract basic type for THREE usage. */
      BASE_THREE: 1,
      /** Physics for Box2d. */
      RIGID_BODY: 2,
      /** Managed 2D asset renderable by THREE. */
      SPRITE: 3,
      /** Audio source. */
      AUDIO: 4
    };

    /**
     * Enumeration of component states.
     * @enum {number}
     */
    Base.STATE = {
      /** Component was created and may need further steps before use. */
      INITIALIZING: 0,
      /** Component is buffering resources. */
      BUFFERING: 1,
      /** Component resources are loaded. */
      LOADED: 2,
      /** Component is built and ready for use. */
      READY: 3,
      /** Component is active. */
      RUNNING: 4,
      /** Component is registered for internal management. */
      REGISTERED: 5
    };

    return Base;
  }
);
