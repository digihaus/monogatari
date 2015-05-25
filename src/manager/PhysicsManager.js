define( [ 'manager/EventManager', 'lib/Box2d', 'core/Timer' ], function( EventManager, Box2d, Timer ) {

  var PhysicsManager = function() {
    this.world = null;

    // The more iterations, the more accurate the calculations
    this.velocityIterations = 2;
    this.positionIterations = 2;

    // Remove any accumulated forces at every physics update
    this.clearForcesOnUpdate = false;
  }

  PhysicsManager.prototype.createWorld = function( gravity, allowSleep ) {
    this.world = new Box2D.b2World( new Box2D.b2Vec2( gravity.x, gravity.y ), allowSleep );
    //this.createListener();
  };

  PhysicsManager.prototype.attachToWorld = function( bodyDef ) {
    return this.world.CreateBody( bodyDef );
  };

  PhysicsManager.prototype.createListener = function() {
    var listener = new Box2D.JSContactListener();

    listener.BeginContact = function( contact ) {
      // console.log(contact.GetFixtureA().GetBody().GetUserData());
      EventManager.notify( 'PhysicsManager.beginContact', contact );
    };

    listener.EndContact = function( contact ) {
      // console.log(contact.GetFixtureA().GetBody().GetUserData());
      EventManager.notify( 'PhysicsManager.endContact', contact );
    };

    // listener.PreSolve = function( contact, oldManifold ) {
    // EventManager.notify( "box2D_preSolve", {
    // "contact" : contact,
    // "oldManifold" : oldManifold
    // } );
    // };
    //
    // listener.PostSolve = function( contact, impulse ) {
    // EventManager.notify( "box2D_postSolve", {
    // "contact" : contact,
    // "impulse" : impulse
    // } );
    // };

    this.world.SetContactListener( listener );
  };

  PhysicsManager.prototype.update = function() {
    if ( this.world ) {
      var fps = Timer.fps;

      // Frame rate at which to update physics ( 1 / FPS or 1.0 / 60.0 )
      var physicsFrameRate = ( fps ) ? 1 / fps : Timer.FRAME_RATE_60FPS;

      this.world.Step( physicsFrameRate, this.velocityIterations, this.positionIterations );

      if ( this.clearForcesOnUpdate ) {
        this.world.ClearForces();
      }
    }
  };

  var instance = null;

  PhysicsManager.getInstance = function() {
    if ( instance === null ) {
      instance = new PhysicsManager();
    }
    return instance;
  };

  return PhysicsManager.getInstance();
} );
