define( [ 'core/Monogatari',
          'core/Timer',
          'core/String',
          'core/io/Keyboard',
          'engine/entity/component/Audio',
          'engine/entity/component/Sprite',
          'engine/entity/component/RigidBody',
          'engine/entity/component/Node',
          'engine/entity/component/StaticText',
          'engine/EventManager',
          'engine/AudioManager',
          'engine/FontManager',
          'engine/SceneManager',
          'engine/ObjectManager',
          'engine/PhysicsManager' ], function() {

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
    requestAnimationFrame( this.run.bind(this) );
    this.update();
    this.render();
  };
} );
