define(
  function() {

    /**
     * The root node of the engine Game Object tree. Any Game Object will only be available to the engine when attached directly or indirectly to world.
     * This class is created with the engine initialization.
     * @exports core/World
     */
    var World = {};

    World.gameObject = null;

    return World;
  }
);