/**
 * Exports the {@link module:core/World~World|World} class.
 * @module core/World
 */
define(
  function() {
    var instance = null;

    /**
     * The root node of the engine GameObject tree. Any GameObject will only be available to the engine when attached directly or indirectly to world.
     * This class is created with the engine initialization.
     *
     * @memberOf World
     * @type {GameObject}
     * @class World
     */
    var World = function() {
      this.gameObject = null;
    };

    World.getInstance = function() {
      if( instance === null ) {
        instance = new World();
      }
      return instance;
    };

    return World.getInstance();
  }
);