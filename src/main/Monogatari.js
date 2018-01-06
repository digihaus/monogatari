import { GameEngine } from 'GameEngine';
import { GameState } from 'GameState';
import { KeyboardHandler } from 'handler/KeyboardHandler';
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
        this._engine = new GameEngine(target, width, height);

        this.GameObject = GameObject;
        this.Message = Message;
        this.Sprite = Sprite;
        this.Box = Box;
        this.Circle = Circle;
        this.Audio = Audio;
        this.Vector3 = Vector3;

        this._logger.debug("engine ready");
    }

    get KEY() {
        return KeyboardHandler.KEY;
    }

    get keyboard() {
        return this._engine.keyboardHandler;
    }

    get engine() {
        return this._engine;
    }

    get time() {
        return GameState.time
    }

    get fps() {
        return GameState.fps;
    }

    attach(go) {
        GameState.attach(go);
    }
}

module.exports = Monogatari;