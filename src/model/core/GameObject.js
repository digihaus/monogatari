const Vector3 = require('model/math/Vector3');

class GameObject {

    constructor(id, {
        update = () => { },
        position = Vector3(0, 0, 0),
        rotation = Vector3(0, 0, Math.PI),
        scale = Vector3(1, 1, 1) } = {}) {

        this.id = id;
        this.update = update;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;

        this.children = new Array();
        this.components = new Array();
        this.messages = new Array();
    }

    include(component) {
        this.components.push(component);
        return this;
    }

    find(type) {
        return this.components.find(x => x instanceof type);
    }

    clone(id = this.id + '_copy') {
        var clone = new GameObject(id, { update: this.update, position: this.position, rotation: this.rotation, scale: this.scale });
        this.children.forEach(child => clone.children.push(child.clone()));
        this.components.forEach(component => clone.components.push(component.clone()));
        return clone;
    }
}

module.exports = GameObject;