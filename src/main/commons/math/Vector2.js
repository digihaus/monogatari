export class Vector2Class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export function Vector2(x, y) {
    return new Vector2Class(x, y);
}