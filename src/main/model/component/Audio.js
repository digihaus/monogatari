import { Howler } from 'link/Howler';

export class Audio {

    static get STATE() {
        return {
            CREATED: 0,
            LOADED: 1,
            RUNNING: 2
        }
    }

    constructor(source, { loop = false } = {}) {
        this.state = Audio.STATE.CREATED;
        this.source = source;
        this.loop = loop;

        this.sound = null;
    };

    play() {
        if (this.state > Audio.STATE.CREATED) {
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