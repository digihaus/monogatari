/**
 * Exports the {@link module:manager/PhysicsManager~PhysicsManager|PhysicsManager} class.
 * @module manager/PhysicsManager
 */
define(
  [ 'lib/Box2d', 'core/Timer', 'core/World', 'core/Message', 'manager/MessageManager' ], function( _Box2d, Timer, World, Message, MessageManager ) {

    /**
     * @class PhysicsManager
     */
    var PhysicsManager = function() {
      /**
       * Box2D Physics World
       * @memberOf module:manager/PhysicsManager~PhysicsManager
       * @instance
       * @type {Box2D.b2World}
       * @name world
       * @default null
       */
      this.world = null;

      /**
       * Number of Velocity Iterations on the physics world. The more iterations, the more accurate the calculations
       * @memberOf module:manager/PhysicsManager~PhysicsManager
       * @instance
       * @type {Number}
       * @name velocityIterations
       * @default 2
       */
      this.velocityIterations = 2;

      /**
       * Number of Position Iterations on the physics world. The more iterations, the more accurate the calculations
       * @memberOf module:manager/PhysicsManager~PhysicsManager
       * @instance
       * @type {Number}
       * @name positionIterations
       * @default 2
       */
      this.positionIterations = 2;

      /**
       * Flag to remove any accumulated forces at every physics update
       * @memberOf module:manager/PhysicsManager~PhysicsManager
       * @instance
       * @type {Number}
       * @name clearForcesOnUpdate
       * @default false
       */
      this.clearForcesOnUpdate = false;

      this.BEGIN_CONTACT = 1; // 0001
      this.END_CONTACT = 2; // 0010
      this.BEGIN_END_CONTACT = 3; // 0011
      this.PRE_SOLVE = 4; // 0100
      this.POST_SOLVE = 8; // 1000
      this.ALL_LISTENERS = 15; //1111

      this.listeners = 0; //0000

      this.contactListener = null;
    };

    /**
     * Creates the physics World on box2D with given properties
     * @method
     * @instance
     * @name createWorld
     * @param {THREE.Vector2} gravity 2D vector pointing the direction of the gravity
     * @param {Boolean} allowSleep flag if an object can sleep outside the boundaries of the physics world
     * @param {String} listeners constants to signal which listeners will be active
     * @memberOf module:manager/PhysicsManager~PhysicsManager
     */
    PhysicsManager.prototype.createWorld = function( gravity, allowSleep, listeners ) {
      this.world = new Box2D.b2World( new Box2D.b2Vec2( gravity.x, gravity.y ), allowSleep || false );
      this.listeners = ( listeners ) ? listeners : this.BEGIN_END_CONTACT; //0011
      this.createListener();
    };

    /**
     * Attaches a given Rigid Body to the Physics World of Box2D
     * @method
     * @instance
     * @name attachToWorld
     * @param {RigidBody} rigidBody A Monogatari RigidBody component to be attached
     * @memberOf module:manager/PhysicsManager~PhysicsManager
     */
    PhysicsManager.prototype.attachToWorld = function( rigidBody ) {
      rigidBody.body = this.world.CreateBody( rigidBody.bodyDef );
    };

    /**
     * Destroys a given Rigid Body on the Physics World of Box2D
     * @method
     * @instance
     * @name destroyBody
     * @param {RigidBody} rigidBody A Monogatari RigidBody component to be attached
     * @memberOf module:manager/PhysicsManager~PhysicsManager
     */
    PhysicsManager.prototype.destroyBody = function( rigidBody ) {
      return this.world.DestroyBody( rigidBody.bodyDef );
    };

    /**
     * Creates the callback functions to the listeners set on the createWorld method. <br>
     * The listeners will contain the information about the contacts and send them a Message through the MessageManager class. <br>
     * Some callback functions like preSolve and postSolve are called constantly, be aware of messages flooding between Game Objects.
     * @method
     * @instance
     * @name createListener
     * @memberOf module:manager/PhysicsManager~PhysicsManager
     */
    PhysicsManager.prototype.createListener = function() {
      this.contactListener = new Box2D.JSContactListener();

      this.contactListener.BeginContact = ( this.listeners & this.BEGIN_CONTACT ) ?
        function( _contact ) {
          var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
          var goA = World.gameObject.findByUid( contact.GetFixtureA().GetUserData() );
          var goB = World.gameObject.findByUid( contact.GetFixtureB().GetUserData() );

          if( goB ) {
            MessageManager.register( new Message( goA.id, goB.id, "BeginContact", contact ) );
          }
          if( goA ) {
            MessageManager.register( new Message( goB.id, goA.id, "BeginContact", contact ) );
          }

        } : function() {};

      this.contactListener.EndContact = ( this.listeners & this.END_CONTACT ) ?
        function( _contact ) {
          var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
          var goA = World.gameObject.findByUid( contact.GetFixtureA().GetUserData() );
          var goB = World.gameObject.findByUid( contact.GetFixtureB().GetUserData() );

          if( goB ) {
            MessageManager.register( new Message( goA.id, goB.id, "EndContact", contact ) );
          }
          if( goA ) {
            MessageManager.register( new Message( goB.id, goA.id, "EndContact", contact ) );
          }
        } : function() {};

      this.contactListener.PreSolve = ( this.listeners & this.PRE_SOLVE ) ?
        function( _contact, _oldManifold ) {
          var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
          var manifold = Box2D.wrapPointer( _oldManifold, Box2D.b2Manifold );
          var goA = World.gameObject.findByUid( contact.GetFixtureA().GetUserData() );
          var goB = World.gameObject.findByUid( contact.GetFixtureB().GetUserData() );

          if( goB ) {
            MessageManager.register( new Message( goA.id, goB.id, "PreSolve", { contact: contact, manifold: manifold } ) );
          }
          if( goA ) {
            MessageManager.register( new Message( goB.id, goA.id, "PreSolve", { contact: contact, manifold: manifold } ) );
          }
        } : function() {};

      this.contactListener.PostSolve = ( this.listeners & this.POST_SOLVE ) ?
        function( _contact, _impulse ) {
          var contact = Box2D.wrapPointer( _contact, Box2D.b2Contact );
          var impulse = Box2D.wrapPointer( _impulse, Box2D.b2ContactImpulse );
          var goA = World.gameObject.findByUid( contact.GetFixtureA().GetUserData() );
          var goB = World.gameObject.findByUid( contact.GetFixtureB().GetUserData() );

          if( goB ) {
            MessageManager.register( new Message( goA.id, goB.id, "PostSolve", { contact: contact, impulse: impulse } ) );
          }
          if( goA ) {
            MessageManager.register( new Message( goB.id, goA.id, "PostSolve", { contact: contact, impulse: impulse } ) );
          }
        } : function() {};

      this.world.SetContactListener( this.contactListener );
    };

    /**
     * Physics world heartbeat, updates based on the engine FPS and the current velocity and position Iterations.
     * @method
     * @instance
     * @name update
     * @memberOf module:manager/PhysicsManager~PhysicsManager
     */
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