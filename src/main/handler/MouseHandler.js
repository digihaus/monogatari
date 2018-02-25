import { Vector3 } from 'commons/math/Vector3';
import { GameState } from 'GameState';
import { Logger } from 'commons/Logger';

export class MouseHandler {

    static get BUTTONS() {
        return {
            LMB: 0,
            MID: 1,
            RMB: 2,
            B3: 3,
            B4: 4,
            B5: 5,
            B6: 6,
            B7: 7
        }
    }

    constructor(domElement) {
        this._logger = new Logger(MouseHandler.name);
        this._buttons = new Map();
        this._position = Vector3(0, 0, 0);

        domElement.addEventListener('mousemove', (event) => {
            var rect = domElement.getBoundingClientRect()
            this._position = Vector3(event.clientX - rect.left, event.clientY - rect.top, 0);
        }, false);

        domElement.addEventListener('mousedown', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this._buttons.set(event.button, GameState.time);
            this._logger.debug("down on position " + this._position.x + ", " + this.position.y);
        }, false);

        domElement.addEventListener('mouseup', (event) => {
            event.stopPropagation();
            this._buttons.delete(event.button);
        }, false);
    }

    get position() {
        return Vector3(this._position.x / GameState.ratio, this._position.y / GameState.ratio, this._position.z);
    }

}