// @Requires[core/Monogatari.js]
// @Requires[core/Timer.js]
// @Requires[core/String.js]

// @Requires[engine/EventManager.js]
// @Requires[engine/AudioManager.js]
// @Requires[engine/FontManager.js]
// @Requires[engine/SceneManager.js]
// @Requires[engine/ObjectManager.js]
// @Requires[engine/PhysicsManager.js]

Monogatari.GameManager = new MonogatariGameManager();

function MonogatariGameManager() {};

MonogatariGameManager.prototype.init = function() {
  Monogatari.SceneManager.init();
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