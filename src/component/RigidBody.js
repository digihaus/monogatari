var Base = require('component/Base');
var Box2D = require('link/Box2D');

/**
 * Component used for interaction with the {@link https://github.com/kripken/box2d.js/|box2d.js Emscripten port}.
 * Box2D has been tuned to work well with moving objects between 0.1 and 10 meters. 
 * This means objects between soup cans and buses in size should work well. 
 * Static objects may be up to 50 meters big without too much trouble.
 * Box2D is tuned for meters, kilograms, and seconds.
 *
 * @param {RigidBody.TYPE} type - Type of this Rigid Body: static, kinematic or dynamic
 * @param {b2Shape} shape - Geometrical shape of this Rigid Body
 * @extends component/Base
 * @exports component/RigidBody
 */
class RigidBody extends Base {

  /**
   * Enumeration of rigid body types.
   * @type {Number}
   * @enum
   */
  static get TYPE() {
    return {
      /** A <b>static body</b> is a body which isn’t affected by world forces it does not react to collisions. It can’t be moved. */
      STATIC: Box2D.b2_staticBody,
      /** A <b>kinematic body</b> is an hybrid body which is not affected by forces and collisions like a static body but can moved with a linear velocity like a dynamic body. */
      KINEMATIC: Box2D.b2_kinematicBody,
      /** A <b>dynamic body</b> is a body which is affected by world forces and react to collisions. */
      DYNAMIC: Box2D.b2_dynamicBody
    }
  };

  constructor(type, shape) {
    super(Base.TYPE.RIGID_BODY);

    if (!Object.values(RigidBody.TYPE).includes(type)) throw new Error('Param "type" is invalid.');
    if (shape === undefined) throw new Error('Param shape is required.');

    this.bodyDef.set_type(type);
    this.materialDef.set_shape(shape);
  }
};

/**
 * The physics body definition (Box2D.BodyDef) from this component.
 * {@link http://www.box2dflash.org/docs/2.1a/reference/Box2D/Dynamics/b2BodyDef.html|b2BodyDef}
 * @type {Box2D.b2BodyDef} Body definition from Box2D
 */
RigidBody.prototype.bodyDef = new Box2D.b2BodyDef();

/**
 * The Material (Box2D.FixtureDef) from this component.
 * {@link http://www.box2dflash.org/docs/2.1a/reference/Box2D/Dynamics/b2FixtureDef.html|b2FixtureDef}
 * @type {Box2D.b2FixtureDef} Fixture definition from Box2D
 */
RigidBody.prototype.materialDef = new Box2D.b2FixtureDef();

/**
 * The physics body used to bind this component to the physics world.
 * It's created by the Physics Manager.
 * @return {Box2D.b2Body} Body from Box2D
 */
RigidBody.prototype.body = null;

/**
 * Sets the density of the material.
 * @param {number} density - Density in kg/m^2
 */
RigidBody.prototype.setDensity = function (density) {
  this.materialDef.set_density(density);
};

/**
 * Sets the friction of the material.
 * @param {number} friction - Usually in the range [0,1]
 */
RigidBody.prototype.setFriction = function (friction) {
  this.materialDef.set_friction(friction);
};

/**
 * Sets the bounciness of the material
 * @param {number} bounciness - Usually in the range [0,1]
 */
RigidBody.prototype.setBounciness = function (bounciness) {
  this.materialDef.set_restitution(bounciness);
};

/**
 * Sets the setPosition of the body, in the physics world, NOT in pixels or game world, a proper scale is required to draw.
 * @param {Number} x Coordinate X
 * @param {Number} y Coordinate Y
 */
RigidBody.prototype.setPosition = function (x, y) {
  this.bodyDef.get_position().set_x(x);
  this.bodyDef.get_position().set_y(y);
};

/**
 * Sets the angle (rotation) of the body.
 * @param {number} angle - Rotation angle in radians
 */
RigidBody.prototype.setRotation = function (angle) {
  this.bodyDef.angle.set_angle(angle);
};

/**
 * Prevents the collision to be resolved by Box2D, but retains collision information.
 * @param {boolean} isSensor
 */
RigidBody.prototype.setSensor = function (isSensor) {
  this.materialDef.set_isSensor(isSensor);
};

/**
 * Prevents the collision to be resolved through other objects.
 * <b>Expensive! Use with care.</b>
 * @param {boolean} preventTunneling
 */
RigidBody.prototype.setPreventTunneling = function (preventTunneling) {
  this.bodyDef.set_bullet(preventTunneling);
};

/**
 * Prevents or allows the rotation on this RigidBody.
 * @param {boolean} allowRotation
 */
RigidBody.prototype.setAllowRotation = function (allowRotation) {
  this.bodyDef.set_fixedRotation(!allowRotation);
};

/**
 * Allows to store a data (in the means of a pointer) of an object to work with the internal memory of the Box2D.
 * It is (kinda) bugged on emscripten port, but can be {@link https://github.com/kripken/box2d.js/issues/35|worked around}.
 * @param {Object} userData
 */
RigidBody.prototype.setUserData = function (userData) {
  this.materialDef.set_userData(userData);
};

/**
 * Returns a new instance of a RigidBody with the same values.
 * @return {module:component/RigidBody} a clone of this RigidBody
 */
RigidBody.prototype.clone = function () {
  return new RigidBody(this.type, this.shape);
};

module.exports = RigidBody;