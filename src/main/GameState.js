import { GameObject } from 'model/core/GameObject';

var _sequence = 0;
var _time = 0;
var _fps = 60;
var _loaded = false;
var _width = 0;
var _height = 0;
var _ratio = 1;

var _world = new GameObject('world');
_world.uid = _sequence++;

export class GameState {

    static get world() { return _world; }
    static get sequence() { return _sequence; }
    static get time() { return _time; }
    static get fps() { return _fps; }
    static get loaded() { return _loaded; }
    static get canvas() { return _canvas; }
    static get width() { return _width; }
    static get height() { return _height; }
    static get ratio() { return _ratio; }

    static set sequence(sequence) { _sequence = sequence; }
    static set time(time) { _time = time; }
    static set fps(fps) { _fps = fps; }
    static set loaded(loaded) { _loaded = loaded; }
    static set canvas(canvas) { _canvas = canvas; }
    static set width(width) { _width = width; }
    static set height(height) { _height = height; }
    static set ratio(ratio) { _ratio = ratio; }

    static attach(go) {
        // TODO: Verificar UID de todos os filhos também, desde que já não estejam no world
        go.uid = _sequence++;
        _world.attach(go);
    }

}