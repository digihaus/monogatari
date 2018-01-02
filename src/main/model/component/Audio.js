import { Howler } from 'link/Howler';

export class Audio {

    static get STATE() {
        return {
            CREATED: 0,
            BUFFERING: 1,
            LOADED: 2,
            RUNNING: 3
        }
    }

    constructor(source, { loop = false } = {}) {
        this.state = Audio.STATE.CREATED;
        this.source = source;
        this.loop = loop;

        this.sound = null;
    }

    get loaded() {
        return this.state >= Audio.STATE.LOADED;
    }

    play() {
        if (this.state > Audio.STATE.BUFFERING) {
            this.state = Audio.STATE.RUNNING;
            this.sound.play();
        }
    }

    stop() {
        if (this.state === Audio.STATE.RUNNING) {
            this.state = Audio.STATE.LOADED;
            this.sound.stop();
        }
    }

    clone() {
        return new Audio(this.source, { loop: this.loop });
    }

}