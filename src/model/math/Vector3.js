class Vector3Class {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

const Vector3 = function (x, y, z) {
    return new Vector3Class(x, y, z);
}

module.exports = Vector3;