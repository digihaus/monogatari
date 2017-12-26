const Three = require('link/Three');

class Camera2D {

    constructor(id, left, right, top, bottom, near, far) {
        this.id = id;
        this.cam = new Three.OrthographicCamera(left, right, top, bottom, near, far);
        this.cam.position.set(right, bottom, far);
        this.sceneIds = new Set();
    }

}

module.exports = Camera2D;