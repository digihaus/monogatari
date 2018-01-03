import { Keyboard } from 'model/input/Keyboard'

export class InputService {

    constructor() {
        this._keys = new Map();
    }

    isKeyDown(key) {
        return this._keys.get(key);
    }

    onKeyDown(event, time) {
        event.stopPropagation();
        if (event.keyCode === Keyboard.KEY.BACKSPACE ||
            event.keyCode === Keyboard.KEY.UP_ARROW ||
            event.keyCode === Keyboard.KEY.DOWN_ARROW ||
            event.keyCode === Keyboard.KEY.LEFT_ARROW ||
            event.keyCode === Keyboard.KEY.RIGHT_ARROW ||
            event.keyCode === Keyboard.KEY.PAGE_UP ||
            event.keyCode === Keyboard.KEY.PAGE_DOWN ||
            event.keyCode === Keyboard.KEY.SPACE) {
            event.preventDefault();
        }
        this._keys.set(event.keyCode, time);
    }

    onKeyUp(event) {
        event.stopPropagation();
        this._keys.delete(event.keyCode);
    }
}