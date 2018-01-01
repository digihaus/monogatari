import { Howler } from 'link/Howler';
import { Audio } from 'model/component/Audio';
import { Logger } from 'commons/Logger';

export class AudioService {

    constructor() {
        this._logger = new Logger(AudioService.name);
    }

    update(audio) {
        if (audio.state === Audio.STATE.CREATED) {
            audio.sound = new Howler.Howl({
                src: [audio.source],
                autoplay: false,
                loop: audio.loop,
                onload: function () {
                    audio.state = Audio.STATE.LOADED;
                    this._logger.debug("audio loaded", audio.source);
                }.bind(this)
            });
        }
    }

}