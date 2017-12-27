class Vector2Class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const Vector2 = function(x, y) {
    return new Vector2Class(x, y);
}

module.exports = Vector2;