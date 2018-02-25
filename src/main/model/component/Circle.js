import { Box2D } from 'link/Box2D';
import { Body } from 'model/component/Body';

export class Circle extends Body {

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