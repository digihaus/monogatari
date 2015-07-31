define(
  [ 'lib/Box2d', 'core/Timer', 'core/Message', 'manager/MessageManager' ], function( _Box2d, Timer, Message, MessageManager ) {

    var PhysicsManager = function() {
      this.world = null;

      // The more iterations, the more accurate the calculations
      this.velocityIterations = 2;
      this.positionIterations = 2;

      // Remove any accumulated forces at every physics update
      this.clearForcesOnUpdate = false;
    };

    PhysicsManager.prototype.createWorld = function( gravity, allowSleep ) {
      this.world = new Box2D.b2World( new Box2D.b2Vec2( gravity.x, gravity.y ), allowSleep );
      this.createListener();
    };

    PhysicsManager.prototype.attachToWorld = function( rigidBody ) {
      rigidBody.body = this.world.CreateBody( rigidBody.bodyDef );
    };

    PhysicsManager.prototype.destroyBody = function( bodyDef ) {
      return this.world.DestroyBody( bodyDef );
    };

    PhysicsManager.prototype.createListener = function() {
      var listener = new Box2D.JSContactListener();

      listener.BeginContact = function( _contact ) {
        var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
        var fixtureAUid = contact.GetFixtureA().GetUserData();
        var fixtureBUid = contact.GetFixtureB().GetUserData();

        if( fixtureAUid && fixtureBUid ) {
          MessageManager.register( new Message( fixtureAUid, fixtureBUid, "BeginContact", contact ) );
          MessageManager.register( new Message( fixtureBUid, fixtureAUid, "BeginContact", contact ) );
        }

      };

      listener.EndContact = function( _contact ) {
        var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
        var colliderUid = contact.GetFixtureA().GetUserData() || contact.GetFixtureB().GetUserData();

        if( colliderUid ) {
          MessageManager.register( new Message( -1, colliderUid, "EndContact", contact ) );
        }
      };

      listener.PreSolve = function( _contact, _oldManifold ) {
        var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
        var manifold = Box2D.wrapPointer( _oldManifold, Box2D.b2Manifold );
        var colliderUid = contact.GetFixtureA().GetUserData() || contact.GetFixtureB().GetUserData();

        if( colliderUid ) {
          MessageManager.register( new Message( -1, colliderUid, "PreSolve", { contact: contact, manifold: manifold} ) );
        }

      };

      listener.PostSolve = function( _contact, _impulse ) {
        var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
        var impulse = Box2D.wrapPointer( _contact, Box2D.b2ContactImpulse );
        var colliderUid = contact.GetFixtureA().GetUserData() || contact.GetFixtureB().GetUserData();

        if( colliderUid ) {
          MessageManager.register( new Message( -1, colliderUid, "PostSolve", { contact: contact, impulse: impulse} ) );
        }
      };

      this.world.SetContactListener( listener );
    };

    PhysicsManager.prototype.update = function() {
      if( this.world ) {
        var fps = Timer.fps;

        // Frame rate at which to update physics ( 1 / FPS or 1.0 / 60.0 )
        var physicsFrameRate = ( fps ) ? 1 / fps : Timer.FRAME_RATE_60FPS;

        this.world.Step( physicsFrameRate, this.velocityIterations, this.positionIterations );

        if( this.clearForcesOnUpdate ) {
          this.world.ClearForces();
        }
      }
    };

    var instance = null;

    PhysicsManager.getInstance = function() {
      if( instance === null ) {
        instance = new PhysicsManager();
      }
      return instance;
    };

    return PhysicsManager.getInstance();
  }
);
