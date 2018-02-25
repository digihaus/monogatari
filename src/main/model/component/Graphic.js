export class Graphic {

    static get STATE() {
        return {
            CREATED: 0,
            BUFFERING: 1,
            LOADED: 2,
            REGISTERED: 3,
            FAILED: -1
        }
    }

    constructor(width, height, { sceneId } = {}) {
        this._state = Graphic.STATE.CREATED;
        this.width = width;
        this.height = height;
        this.sceneId = sceneId;
        this.texture = null;
        this.material = null;
        this.geometry = null;
        this.mesh = null;
    }

    get state() {
        return this._state;
    }

    set state(state) {
        return this._state = state;
    }

    get loaded() {
        return this._state >= Graphic.STATE.LOADED;
    }

}