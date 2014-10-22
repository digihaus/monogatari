define( [ 'core/Monogatari', 'core/Timer', 'core/String', 'engine/EventManager', 'engine/AudioManager', 'engine/FontManager', 'engine/SceneManager', 'engine/ObjectManager', 'engine/PhysicsManager' ], function() {

  Monogatari.GameManager = new MonogatariGameManager();

  function MonogatariGameManager() {};

  MonogatariGameManager.prototype.init = function( bgcolor, width, height, target ) {
    Monogatari.SceneManager.init( bgcolor, width, height, target );
  };

  MonogatariGameManager.prototype.update = function() {
    Monogatari.Time.tick();
    Monogatari.PhysicsManager.update();
    Monogatari.ObjectManager.update();
  };

  MonogatariGameManager.prototype.render = function() {
    Monogatari.SceneManager.render();
  };

  MonogatariGameManager.prototype.run = function() {
    requestAnimationFrame( Monogatari.GameManager.run );
    Monogatari.GameManager.update();
    Monogatari.GameManager.render();
  };
} );