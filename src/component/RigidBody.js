var Base = require('component/Base');
var Box2D = require('link/Box2D');

/**
 * Component used for interaction with the {@link https://github.com/kripken/box2d.js/|box2d.js Emscripten port}.
 * Box2D has been tuned to work well with moving objects between 0.1 and 10 meters. 
 * This means objects between soup cans and buses in size should work well. 
 * Static objects may be up to 50 meters big without too much trouble.
 * Considered units are meters, kilograms and seconds.
 *
 * @extends component/Base
 * @exports component/RigidBody
 */
class RigidBody extends Base {

  /**
   * Enumeration of rigid body types.
   * @enum {number}
   * @property {number} STATIC A body which isn’t affected by world forces, it does not react to collisions. It can’t be moved.
   * @property {number} KINEMATIC An hybrid body which is not affected by forces and collisions like a static body but can be moved with a linear velocity like a dynamic body.
   * @property {number} DYNAMIC A body which is affected by world forces and reacts to collisions.
   */
  static get TYPE() {
    return {
      STATIC: Box2D.b2_staticBody,
      KINEMATIC: Box2D.b2_kinematicBody,
      DYNAMIC: Box2D.b2_dynamicBody
    }
  }

  /**
   * Conversion factor between physics world and game world
   * @constant {number}
   */
  static get FACTOR() {
    return 50;
  }

  /**
   * Creates a RigidBody.
   * @param {RigidBody.TYPE} type - Type of the body: static, kinematic or dynamic
   * @param {b2Shape} shape - Geometrical shape of the body
   * @param {Object} [options]
   * @param {number} [options.density] - Material density in kg/m^2
   * @param {number} [options.friction] - Material friction, usually in the range [0,1]
   * @param {number} [options.bounciness] - Material bounciness, usually in the range [0,1]
   * @param {number} [options.angle] - Body rotation angle in radians
   * @param {boolean} [options.isSensor] - Prevents the collision to be resolved by Box2D, but retains collision information
   * @param {boolean} [options.preventTunneling] - Prevents the collision to be resolved through other objects. <b>Expensive! Use with care.</b>
   * @param {boolean} [options.allowRotation] - Prevents or allows the rotation on the body
   */
  constructor(type, shape, options = {}) {
    super(Base.TYPE.RIGID_BODY);

    if (!Object.values(RigidBody.TYPE).includes(type)) throw new Error('Illegal argument "type".');
    if (shape === undefined) throw new Error('Illegal argument "shape".');

    /**
     * The physics body definition (Box2D.BodyDef) from this component.
     * {@link http://www.box2dflash.org/docs/2.1a/reference/Box2D/Dynamics/b2BodyDef.html|b2BodyDef}
     * @type {Box2D.b2BodyDef}
     */
    this.bodyDef = new Box2D.b2BodyDef();

    /**
     * The Material (Box2D.FixtureDef) from this component.
     * {@link http://www.box2dflash.org/docs/2.1a/reference/Box2D/Dynamics/b2FixtureDef.html|b2FixtureDef}
     * @type {Box2D.b2FixtureDef}
     */
    this.materialDef = new Box2D.b2FixtureDef();

    /**
     * The physics body used to bind this component to the physics world.
     * It's created by the Physics Manager.
     * @return {Box2D.b2Body} Body from Box2D
     */
    this.body = null;

    this.bodyDef.set_type(type);
    if (options.preventTunneling) this.bodyDef.set_bullet(options.preventTunneling);
    if (options.allowRotation) this.bodyDef.set_fixedRotation(!options.allowRotation);
    if (options.angle) this.bodyDef.angle.set_angle(options.angle);

    this.materialDef.set_shape(shape);
    if (options.density) this.materialDef.set_density(options.density);
    if (options.friction) this.materialDef.set_friction(options.friction);
    if (options.bounciness) this.materialDef.set_restitution(options.bounciness);
    if (options.isSensor) this.materialDef.set_isSensor(options.isSensor);
  }

  getPosition() {
    return {
      x: this.body.GetPosition().get_x() * RigidBody.FACTOR,
      y: this.body.GetPosition().get_y() * RigidBody.FACTOR
    }
  }

  /**
   * Sets the setPosition of the body, in the physics world, NOT in pixels or game world, a proper scale is required to draw.
   * @param {Number} x Coordinate X
   * @param {Number} y Coordinate Y
   */
  setPosition(x, y) {
    this.bodyDef.get_position().set_x(x / RigidBody.FACTOR);
    this.bodyDef.get_position().set_y(y / RigidBody.FACTOR);
  }

  /**
   * Allows to store a data (in the means of a pointer) of an object to work with the internal memory of the Box2D.
   * It is (kinda) bugged on emscripten port, but can be {@link https://github.com/kripken/box2d.js/issues/35|worked around}.
   * @param {Object} userData
   */
  setUserData(userData) {
    this.materialDef.set_userData(userData);
  }

  /**
   * Returns a new instance of a RigidBody with the same values.
   * @return {module:component/RigidBody} a clone of this RigidBody
   */
  clone() {
    return new RigidBody(this.type, this.shape);
  }
}

module.exports = RigidBody;