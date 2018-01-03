import { GameEngine } from 'GameEngine';
import { GameObject } from 'model/core/GameObject';
import { Message } from 'model/core/Message';
import { Sprite } from 'model/component/Sprite';
import { Box } from 'model/component/Box';
import { Circle } from 'model/component/Circle';
import { Audio } from 'model/component/Audio';
import { Vector3 } from 'commons/math/Vector3';
import { Logger } from 'commons/Logger';

export class Monogatari {

    static get LOG_LEVEL() {
        return Logger.LEVEL;
    }

    constructor({
        target = document.getElementsByTagName('body')[0],
        width = window.innerWidth,
        height = window.innerHeight,
        logLevel = Logger.LEVEL.ERROR } = {}) {

        Logger.level = logLevel;
        this._logger = new Logger(Monogatari.name);

        this.GameObject = GameObject;
        this.Message = Message;
        this.Sprite = Sprite;
        this.Box = Box;
        this.Circle = Circle;
        this.Audio = Audio;
        this.Vector3 = Vector3;
        this.engine = new GameEngine(target, width, height);

        this._logger.debug("engine ready");
    }

}

module.exports = Monogatari;