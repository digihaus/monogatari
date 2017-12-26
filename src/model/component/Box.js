const Box2D = require('link/Box2D');
const Body = require('model/component/Body');

class Box extends Body {

    constructor(type, width, height, options = {}) {
        var shape = new Box2D.b2PolygonShape();
        shape.SetAsBox(width / Body.FACTOR, height / Body.FACTOR);
        super(type, shape, options);
        this.width = width;
        this.height = height;
    }

    clone() {
        return new Box(this.type, this.width, this.height, this.options);
    }

}

module.exports = Box;