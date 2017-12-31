import { Vector3 } from 'commons/math/Vector3';

export class GameObject {

    constructor(name, {
        update = () => { },
        position = Vector3(0, 0, 0),
        rotation = Vector3(0, 0, Math.PI),
        scale = Vector3(1, 1, 1) } = {}) {

        this.uid = -1;

        this.name = name;
        this.update = update;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;

        this._children = new Array();
        this._components = new Array();
        this._inbox = new Array();
    }

    get children() {
        return this._children;
    }

    get components() {
        return this._components;
    }

    get messages() {
        return this._inbox.splice(0);
    }

    findChild(uid) {
        var child = this._children.find(go => go.uid === uid);
        if (child) return child;
        else return this._children.forEach(go => go.findChild(uid));
    }

    findComponent(type) {
        return this._components.find(component => component instanceof type);
    }

    attach(go) {
        this._children.push(go);
        return this;
    }

    include(component) {
        this._components.push(component);
        return this;
    }

    receive(message) {
        this._inbox.push(message);
    }

    clone(name = this.name + '_copy') {
        var clone = new GameObject(name, { update: this.update, position: this.position, rotation: this.rotation, scale: this.scale });
        this._children.forEach(child => clone._children.push(child.clone()));
        this._components.forEach(component => clone._components.push(component.clone()));
        return clone;
    }
}