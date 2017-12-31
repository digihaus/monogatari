import { Box2D } from 'link/Box2D';
import { Body } from 'model/component/Body';

export class Box extends Body {

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