import { Box2D } from 'link/Box2D';

export class PhysicsEvent {

    constructor(type, contact, { manifold, impulse } = {}) {
        this.type = type;
        this.contact = Box2D.wrapPointer(contact, Box2D.b2Contact);
        this.manifold = manifold ? Box2D.wrapPointer(manifold, Box2D.b2Manifold) : undefined;
        this.impulse = impulse ? Box2D.wrapPointer(impulse, Box2D.b2ContactImpulse) : undefined;
    }

}