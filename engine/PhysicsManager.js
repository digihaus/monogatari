// @Requires[core/Monogatari.js]
// @Requires[core/Constants.js]
// @Requires[core/Timer.js]
// @Requires[core/collection/Map.js]
// @Requires[lib/Three.js]
// @Requires[lib/Box2d.js]
// @Requires[engine/EventManager.js]

Monogatari.PhysicsManager = new MonogatariPhysicsManager();

function MonogatariPhysicsManager() {
  this.world = null;
  this.velocityIterations = 10;
  this.positionIterations = 10;
  this.clearForcesOnUpdate = false;
};

MonogatariPhysicsManager.prototype.createWorld = function( gravity, allowSleep ) {
  this.world = new b2World( new b2Vec2( gravity.x, gravity.y ), allowSleep );
  this.createListener();
};

MonogatariPhysicsManager.prototype.createBody = function( bodyDef ) {
  return this.world.CreateBody( bodyDef );
};

MonogatariPhysicsManager.prototype.createListener = function() {
  var listener = new b2ContactListener();

  listener.BeginContact = function( contact ) {
    // console.log(contact.GetFixtureA().GetBody().GetUserData());
    Monogatari.EventManager.notify( "box2D_beginContact", contact );
  };

  listener.EndContact = function( contact ) {
    // console.log(contact.GetFixtureA().GetBody().GetUserData());
    Monogatari.EventManager.notify( "box2D_endContact", contact );
  };

  /*
   * listener.PreSolve = function( contact, oldManifold ) { Monogatari.EventManager.notify("box2D_preSolve", {
   * "contact": contact, "oldManifold": oldManifold } ); };
   * 
   * listener.PostSolve = function( contact, impulse ) { Monogatari.EventManager.notify("box2D_postSolve", { "contact":
   * contact, "impulse": impulse } ); };
   */

  this.world.SetContactListener( listener );
};

MonogatariPhysicsManager.prototype.update = function() {
  if ( this.world ) {
    var fps = Monogatari.Frames.getFps();

    // The more iterations, the more accurate the calculations
    this.world.Step( ( fps ) ? 1 / fps : Monogatari.Constants.FRAME_RATE_60FPS, // frame rate at which to update physics( 1 / FPS or 1.0 / 60.0 )
    this.velocityIterations, // number of velocity iterations to calculate each physics update
    this.positionIterations // number of position iterations to calculate each physics update
    );

    // the 'ClearForces' method of the world object remove any accumulated forces at every physics update
    if ( this.clearForcesOnUpdate )
      this.world.ClearForces();
  }
};