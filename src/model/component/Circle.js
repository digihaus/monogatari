const Box2D = require('link/Box2D');
const Body = require('model/component/Body');

class Circle extends Body {

    constructor(type, radius, options = {}) {
        var shape = new Box2D.b2CircleShape();
        shape.set_m_radius(radius / Body.FACTOR);
        super(type, shape, options);
        this.radius = radius;
    }

    clone() {
        return new Circle(this.type, this.radius, this.options);
    }
}

module.exports = Circle;