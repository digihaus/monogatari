import { Graphic } from 'model/component/Graphic'

export class Sprite extends Graphic {

    constructor(source, width, height, { rows = 1, cols = 1, sceneId } = {}) {
        super(width, height, sceneId);
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
    }

    setFrame(frame = 1) {
        if (this.state === Graphic.STATE.REGISTERED) {
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
        if (this.state === Graphic.STATE.REGISTERED) {
            this.mesh.material.visible = true;
        }
    }

    hide() {
        if (this.state === Graphic.STATE.REGISTERED) {
            this.mesh.material.visible = false;
        }
    }

    clone() {
        return new Sprite(this.source, this.w, this.h, { rows: this.rows, cols: this.cols, sceneId: this.sceneId });
    }

}