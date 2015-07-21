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
     * @constructor
     */
    var RigidBody = function( conversionFactor ) {
      Base.call( this, Base.RIGID_BODY );

      this.bodyDef = new Box2D.b2BodyDef();
      this.materialDef = new Box2D.b2FixtureDef();
      this.body = null;

      this.conversionFactor = ( conversionFactor ) ? conversionFactor : 1;

      var shape =  new Box2D.b2CircleShape();
      shape.set_m_radius( 0.5 );
      this.materialDef.set_shape( shape );
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
     * @param position Coordinates in the physics world, NOT in pixels or game world, a proper scale is required to draw.
     */
    RigidBody.prototype.setPosition = function( position ) {
      this.bodyDef.get_position().set_x( position.x );
      this.bodyDef.get_position().set_y( position.y );
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
      if(this.body && this.materialDef){
        this.body.CreateFixture( this.materialDef );
      }
    };

    return RigidBody;
  }
);
