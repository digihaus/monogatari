class Vector3Class {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    normalize() {
        return this.divideScalar(this.length() || 1);
    }

    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }

    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    angleTo(vector) {
        var theta = this.dot(vector) / (Math.sqrt(this.lengthSq() * vector.lengthSq()));
        return Math.acos(Math.max(-1, Math.min(1, theta)));
    }

    clone() {
        return new Vector3Class(this.x, this.y, this.z);
    }

}

export function Vector3(x, y, z) {
    return new Vector3Class(x, y, z);
}