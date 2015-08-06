/**
 *[ b2BodyDef ] http://www.box2dflash.org/docs/2.1a/reference/Box2D/Dynamics/b2BodyDef.html
 *[ b2FixtureDef ] http://www.box2dflash.org/docs/2.1a/reference/Box2D/Dynamics/b2FixtureDef.html
 *
 * Box2D has been tuned to work well with moving objects between 0.1 and 10 meters.
 * So this means objects between soup cans and buses in size should work well.
 * Static objects may be up to 50 meters big without too much trouble.
 * Box2D is tuned for meters, kilograms, and seconds.
 */
define(
  [ 'component/Base', 'lib/Box2d' ], function( Base, _Box2d ) {

    /**
     * @param {number} conversionFactor Multiplies the position from physics world (meters to screen coordinates (pixels)). Defaults to 1 (probably not what you expect).
     * @param {b2BodyDef} bodyDef Box2D physics body definition
     * @param {b2FixtureDef} materialDef Box2D physics material definition
     * @constructor
     */
    var RigidBody = function( conversionFactor, bodyDef, materialDef ) {
      Base.call( this, Base.RIGID_BODY );

      this.conversionFactor = ( conversionFactor ) ? conversionFactor : 1;
      this.bodyDef = ( bodyDef ) ? bodyDef : new Box2D.b2BodyDef();
      this.materialDef = ( materialDef ) ? materialDef : new Box2D.b2FixtureDef();

      this.body = null;
    };

    RigidBody.prototype = Object.create( Base.prototype );

    RigidBody.prototype.STATIC = 1;
    RigidBody.prototype.KINEMATIC = 2;
    RigidBody.prototype.DYNAMIC = 3;

    /**
     * @param {number} density In kg/m^2.
     */
    RigidBody.prototype.setDensity = function( density ) {
      this.materialDef.set_density( density );
    };

    /**
     * @param {number} friction Usually in the range [0,1].
     */
    RigidBody.prototype.setFriction = function( friction ) {
      this.materialDef.set_friction( friction );
    };

    /**
     * @param {number} bounciness Usually in the range [0,1].
     */
    RigidBody.prototype.setBounciness = function( bounciness ) {
      this.materialDef.set_restitution( bounciness );
    };

    /**
     * @param x Coordinate X in the physics world, NOT in pixels or game world, a proper scale is required to draw.
     * @param y Coordinate Y in the physics world, NOT in pixels or game world, a proper scale is required to draw.
     */
    RigidBody.prototype.setPosition = function( x, y ) {
      this.bodyDef.get_position().set_x( x );
      this.bodyDef.get_position().set_y( y );
    };

    /**
     * @param {number} angle In radians.
     */
    RigidBody.prototype.setRotation = function( angle ) {
      this.bodyDef.angle.set_angle( angle );
    };

    /**
     * @param shape This is mandatory.
     */
    RigidBody.prototype.setShape = function( shape ) {
      this.materialDef.set_shape( shape );
    };

    /**
     * Prevents the collision to be resolved by Box2D, but retains collision information.
     */
    RigidBody.prototype.setSensor = function( isSensor ) {
      this.materialDef.set_isSensor( isSensor );
    };

    /**
     * Expensive! Use with care.
     */
    RigidBody.prototype.setPreventTunneling = function( preventTunneling ) {
      this.bodyDef.set_bullet( preventTunneling );
    };

    /**
     * A dynamic body is a body which is affected by world forces and react to collisions.
     * A static body is a body which isn’t affected by world forces it does not react to collisions. It can’t be moved.
     * A kinematic body is an hybrid body which is not affected by forces and collisions like a static body but can moved with a linear velocity like a dynamic body.
     */
    RigidBody.prototype.setType = function( type ) {
      switch( type ) {
        case this.STATIC:
          this.bodyDef.set_type( Box2D.b2_staticBody );
          break;
        case this.KINEMATIC:
          this.bodyDef.set_type( Box2D.b2_kinematicBody );
          break;
        case this.DYNAMIC:
          this.bodyDef.set_type( Box2D.b2_dynamicBody );
          break;
        default:
          this.bodyDef.set_type( Box2D.b2_staticBody );
          break;
      }
    };

    RigidBody.prototype.setAllowRotation = function( allowRotation ) {
      this.bodyDef.set_fixedRotation( !allowRotation );
    };

    RigidBody.prototype.createFixture = function() {
      if( this.body && this.materialDef ) {
        this.body.CreateFixture( this.materialDef );
      }
    };

    /**
     * userData is (kinda) bugged on emscripten version of the box2D port, but can be worked around
     * https://github.com/kripken/box2d.js/issues/35
     */
    RigidBody.prototype.setUserData = function( userData ) {
      this.materialDef.set_userData( userData );
    };

    RigidBody.prototype.getBodyDef = function() {
      return this.bodyDef;
    };

    RigidBody.prototype.getMaterialDef = function() {
      return this.materialDef;
    };

    RigidBody.prototype.getPhysicsBody = function() {
      return this.body;
    };

    RigidBody.prototype.clone = function() {
      return new RigidBody( this.conversionFactor, this.bodyDef, this.materialDef );
    };

    return RigidBody;
  }
);