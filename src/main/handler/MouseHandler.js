import { Vector3 } from 'commons/Math/Vector3';
import { GameState } from 'GameState';

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

    constructor() {
        this._buttons = new Map();
        this._position = Vector3(0, 0, 0);

        window.addEventListener('mousemove', (event) => {
            this._position = Vector3(event.clientX, event.clientY, 0);
        }, false);

        window.addEventListener('mousedown', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this._buttons.set(event.button, GameState.time);
        }, false);

        window.addEventListener('mouseup', (event) => {
            event.stopPropagation();
            this._buttons.delete(event.button);
        }, false);
    }

    get position() {
        return this._position;
    }

    getPositionOnElement(element) {
        var rect = element.getBoundingClientRect();
        return Vector3(this._position.x - rect.left, this._position.y - rect.top, 0);
    }

}