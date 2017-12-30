const Box2D = require('link/Box2D');
const Vector2 = require('commons/math/Vector2');

class Body {

    static get TYPE() {
        return {
            STATIC: Box2D.b2_staticBody,
            KINEMATIC: Box2D.b2_kinematicBody,
            DYNAMIC: Box2D.b2_dynamicBody
        }
    }

    static get STATE() {
        return {
            CREATED: 0,
            REGISTERED: 1
        }
    }

    static get FACTOR() {
        return 50;
    }

    constructor(type, shape, options = {}) {
        this._state = Body.STATE.CREATED;

        this.type = type;
        this.options = options;

        this.materialDef = new Box2D.b2FixtureDef();
        this.materialDef.set_shape(shape);
        if (options.density) this.materialDef.set_density(options.density);
        if (options.friction) this.materialDef.set_friction(options.friction);
        if (options.bounciness) this.materialDef.set_restitution(options.bounciness);
        if (options.isSensor) this.materialDef.set_isSensor(options.isSensor);

        this.bodyDef = new Box2D.b2BodyDef();
        this.bodyDef.set_type(type);
        if (options.preventTunneling) this.bodyDef.set_bullet(options.preventTunneling);
        if (options.allowRotation) this.bodyDef.set_fixedRotation(!options.allowRotation);
        if (options.angle) this.bodyDef.angle.set_angle(options.angle);

        this.body = null;
    }

    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;
    }

    get position() {
        return Vector2(
            this.body.GetPosition().get_x() * Body.FACTOR,
            this.body.GetPosition().get_y() * Body.FACTOR
        );
    }

    set position(position) {
        this.bodyDef.get_position().set_x(position.x / Body.FACTOR);
        this.bodyDef.get_position().set_y(position.y / Body.FACTOR);
    }

}

module.exports = Body;