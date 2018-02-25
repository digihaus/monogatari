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
        
        this._axis = Vector3(0, 1, 0);
        this._direction = Vector3(0, 1, 0);
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

    lookAt(position) {
        this._direction.x = position.x - this.position.x;
        this._direction.y = position.y - this.position.y;
        this._direction.normalize();
        this.rotation.z = this.getEulerRotation();
    }

    getEulerRotation() {
        var angle = this._direction.angleTo(this._axis);
        return (this._direction.y * this._axis.x > this._direction.x * this._axis.y) ? angle : -angle;
    }

    rotateAroundPivot(pivot, radians) {
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        var result = this.position.clone();
      
        var oldX = result.x - pivot.x;
        var oldy = result.y - pivot.y;
      
        var newX = oldX * c - oldy * s;
        var newY = oldX * s + oldy * c;
      
        result.x = newX + pivot.x;
        result.y = newY + pivot.y;
      
        this.position = result;
    }

    clone(name = this.name + '_copy') {
        var clone = new GameObject(name, { update: this.update, position: this.position.clone(), rotation: this.rotation.clone(), scale: this.scale.clone() });
        this._children.forEach(child => clone._children.push(child.clone()));
        this._components.forEach(component => clone._components.push(component.clone()));
        return clone;
    }
}