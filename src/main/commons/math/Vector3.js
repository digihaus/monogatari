export class Vector3Class {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export function Vector3(x, y, z) {
    return new Vector3Class(x, y, z);
}