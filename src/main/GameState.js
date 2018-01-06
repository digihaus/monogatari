import { GameObject } from 'model/core/GameObject';

var _sequence = 0;
var _time = 0;
var _fps = 60;
var _loaded = false;

var _world = new GameObject('world');
_world.uid = _sequence++;

export class GameState {

    static get world() { return _world; }
    static get sequence() { return _sequence; }
    static get time() { return _time; }
    static get fps() { return _fps; }
    static get loaded() { return _loaded; }

    static set sequence(sequence) { _sequence = sequence; }
    static set time(time) { _time = time; }
    static set fps(fps) { _fps = fps; }
    static set loaded(loaded) { _loaded = loaded; }

    static attach(go) {
        go.uid = _sequence++;
        _world.attach(go);
    }

}