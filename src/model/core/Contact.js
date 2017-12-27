const Box2D = require('link/Box2D');

class Contact {
    constructor(contact, type, fixtureA, fixtureB) {
        this.contact = Box2D.wrapPointer(contact, Box2D.b2Contact);
        this.type = type;
        this.fixtureA = fixtureA;
        this.fixtureB = fixtureB;
    }
}

module.exports = Contact;