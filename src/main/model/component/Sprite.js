export class Sprite {

    static get STATE() {
        return {
            CREATED: 0,
            BUFFERING: 1,
            LOADED: 2,
            REGISTERED: 3,
            FAILED: -1
        }
    }

    constructor(source, width, height, { rows = 1, cols = 1, sceneId } = {}) {
        this.state = Sprite.STATE.CREATED;
        this.source = source;
        this.w = width;
        this.h = height;
        this.rows = rows;
        this.cols = cols;
        this.sceneId = sceneId;
        this.numberOfFrames = rows * cols;
        this.row = 0;
        this.col = 0;
        this.frame = 1;
        this.lastUpdateTime = 0;
        this.texture = null;
        this.material = null;
        this.geometry = null;
        this.mesh = null;
    }

    setFrame(frame = 1) {
        if (this.state === Sprite.STATE.REGISTERED) {
            this.frame = frame;
            this.col = (Math.ceil(this.frame / this.cols)) - 1;
            this.row = (this.frame - 1) % this.cols;
            this.texture.offset.x = this.row / this.cols;
            this.texture.offset.y = this.col / this.rows;
        }
    }

    nextFrame() {
        this.setFrame((this.frame % this.numberOfFrames) + 1);
    }

    show() {
        if (this.state === Sprite.STATE.REGISTERED) {
            this.mesh.material.visible = true;
        }
    }

    hide() {
        if (this.state === Sprite.STATE.REGISTERED) {
            this.mesh.material.visible = false;
        }
    }

    clone() {
        return new Sprite(this.source, this.w, this.h, { rows: this.rows, cols: this.cols, sceneId: this.sceneId });
    }

}