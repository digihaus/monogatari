const GameObject = require('model/core/GameObject');

class GameState {
    constructor() {
        this.world = new GameObject('world');
        this.time = 0;
        this.fps = 60;
    }
}

module.exports = new GameState();