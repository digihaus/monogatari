define( [ 'manager/EventManager', 
          'core/Timer', 
          'lib/Box2d' ], function( _EventManager, _Timer, _Box2d) {

  function PhysicsManager() {
    this.world = null;
    this.velocityIterations = 10;
    this.positionIterations = 10;
    this.clearForcesOnUpdate = false;
  }

  PhysicsManager.prototype.createWorld = function( gravity, allowSleep ) {
    this.world = new b2World( new b2Vec2( gravity.x, gravity.y ), allowSleep );
    this.createListener();
  };

  PhysicsManager.prototype.attachToWorld = function( bodyDef ) {
    return this.world.CreateBody( bodyDef );
  };

  PhysicsManager.prototype.createListener = function() {
    var listener = new b2ContactListener();

    listener.BeginContact = function( contact ) {
      // console.log(contact.GetFixtureA().GetBody().GetUserData());
      _EventManager.notify( 'PhysicsManager.beginContact', contact );
    };

    listener.EndContact = function( contact ) {
      // console.log(contact.GetFixtureA().GetBody().GetUserData());
      _EventManager.notify( 'PhysicsManager.endContact', contact );
    };

    /*
     * listener.PreSolve = function( contact, oldManifold ) { _EventManager.notify("box2D_preSolve", {
     * "contact": contact, "oldManifold": oldManifold } ); };
     *
     * listener.PostSolve = function( contact, impulse ) { _EventManager.notify("box2D_postSolve", {
     * "contact": contact, "impulse": impulse } ); };
     */

    this.world.SetContactListener( listener );
  };

  PhysicsManager.prototype.update = function() {
    if ( this.world ) {
      var fps = _Timer.getFps();

      // The more iterations, the more accurate the calculations
      this.world.Step( ( fps ) ? 1 / fps : _Timer.FRAME_RATE_60FPS, // frame rate at which to update
      // physics( 1 / FPS or 1.0 / 60.0 )
      this.velocityIterations, // number of velocity iterations to calculate each physics update
      this.positionIterations // number of position iterations to calculate each physics update
      );

      // the 'ClearForces' method of the world object remove any accumulated forces at every physics update
      if ( this.clearForcesOnUpdate ) {
        this.world.ClearForces();
      }
    }
  };

  return PhysicsManager;

} );
