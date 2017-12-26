const GameEngine = require('GameEngine');
const GameObject = require('model/core/GameObject');
const Sprite = require('model/component/Sprite');
const Box = require('model/component/Box');
const Circle = require('model/component/Circle');
const Vector3 = require('model/math/Vector3');

class Monogatari {
    constructor({ target = document.getElementsByTagName('body')[0], width = window.innerWidth, height = window.innerHeight } = {}) {
        this.GameObject = GameObject;
        this.Sprite = Sprite;
        this.Box = Box;
        this.Circle = Circle;
        this.Vector3 = Vector3;
        this.engine = new GameEngine(target, width, height);
    }
}

module.exports = Monogatari;