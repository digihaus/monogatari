define(
  [ 'lib/Box2d', 'core/Timer', 'core/Message', 'manager/MessageManager' ], function( _Box2d, Timer, Message, MessageManager ) {

    var PhysicsManager = function() {
      this.world = null;

      // The more iterations, the more accurate the calculations
      this.velocityIterations = 2;
      this.positionIterations = 2;

      // Remove any accumulated forces at every physics update
      this.clearForcesOnUpdate = false;

      this.BEGIN_CONTACT = 1; // 0001
      this.END_CONTACT = 2; // 0010
      this.PRE_SOLVE = 4; // 0100
      this.POST_SOLVE = 8; // 1000
      this.ALL_LISTENERS = 15; //1111

      this.listeners = 0; //0000
    };

    PhysicsManager.prototype.createWorld = function( gravity, allowSleep, listeners ) {
      this.world = new Box2D.b2World( new Box2D.b2Vec2( gravity.x, gravity.y ), allowSleep || false );
      this.listeners = ( listeners ) ? listeners : this.BEGIN_CONTACT | this.END_CONTACT; //0011
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

      listener.BeginContact = ( this.listeners & this.BEGIN_CONTACT ) ?
        function( _contact ) {
          var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
          var aUid = contact.GetFixtureA().GetUserData();
          var bUid = contact.GetFixtureB().GetUserData();

          if( aUid ) {
            MessageManager.registerEngineMessage( new Message( aUid, bUid, "BeginContact", contact ) );
          }
          if( bUid ) {
            MessageManager.registerEngineMessage( new Message( bUid, aUid, "BeginContact", contact ) );
          }

        } : function() {};

      listener.EndContact = ( this.listeners & this.END_CONTACT ) ?
        function( _contact ) {
          var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
          var aUid = contact.GetFixtureA().GetUserData();
          var bUid = contact.GetFixtureB().GetUserData();

          if( aUid ) {
            MessageManager.registerEngineMessage( new Message( aUid, bUid, "EndContact", contact ) );
          }
          if( bUid ) {
            MessageManager.registerEngineMessage( new Message( bUid, aUid, "EndContact", contact ) );
          }
        } : function() {};

      listener.PreSolve = ( this.listeners & this.PRE_SOLVE ) ?
        function( _contact, _oldManifold ) {
          var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
          var manifold = Box2D.wrapPointer( _oldManifold, Box2D.b2Manifold );
          var aUid = contact.GetFixtureA().GetUserData();
          var bUid = contact.GetFixtureB().GetUserData();

          if( aUid ) {
            MessageManager.registerEngineMessage( new Message( aUid, bUid, "PreSolve", { contact: contact, manifold: manifold } ) );
          }
          if( bUid ) {
            MessageManager.registerEngineMessage( new Message( bUid, aUid, "PreSolve", { contact: contact, manifold: manifold } ) );
          }
        } : function() {};

      listener.PostSolve = ( this.listeners & this.POST_SOLVE ) ?
        function( _contact, _impulse ) {
          var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
          var impulse = Box2D.wrapPointer( _impulse, Box2D.b2ContactImpulse );
          var aUid = contact.GetFixtureA().GetUserData();
          var bUid = contact.GetFixtureB().GetUserData();

          if( aUid ) {
            MessageManager.registerEngineMessage( new Message( aUid, bUid, "PostSolve", { contact: contact, impulse: impulse } ) );
          }
          if( bUid ) {
            MessageManager.registerEngineMessage( new Message( bUid, aUid, "PostSolve", { contact: contact, impulse: impulse } ) );
          }
        } : function() {};

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