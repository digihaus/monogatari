const GameState = require('model/core/GameState');
const Sprite = require('model/component/Sprite');
const Body = require('model/component/Body');
const RenderService = require('service/RenderService');
const PhysicsService = require('service/PhysicsService');

var frameCounter = 0;
var lastCycleTime = 0;
var lastFrameCountTime = 0;

class GameEngine {

    constructor(target, width, height) {
        this.renderService = new RenderService(document.createElement('canvas'), width, height, target.offsetWidth, target.offsetHeight);
        this.physicsService = new PhysicsService({ x: 0, y: 10 }, true, PhysicsService.LISTENER.BEGIN_END_CONTACT);

        target.appendChild(this.renderService.renderer.domElement);

        window.addEventListener('resize', function () {
            this.renderService.resize(target.offsetWidth, target.offsetHeight);
        }.bind(this), true);
    }

    get time() {
        return GameState.time;
    }

    get fps() {
        return GameState.fps;
    }

    run() {        
        var now = Date.now();
        
        frameCounter++;
        
        GameState.time += now - lastCycleTime;
        lastCycleTime = now;

        if(lastFrameCountTime === 0) lastFrameCountTime = GameState.time;

        if ((GameState.time - lastFrameCountTime) >= 1000) {
            GameState.fps = frameCounter;
            frameCounter = 0;
            lastFrameCountTime = GameState.time;
        }

        this.physicsService.simulate();
        this.update(GameState.world);
        this.renderService.render();

        requestAnimationFrame(this.run.bind(this));
    }

    update(go) {
        go.children.forEach(child => this.update(child));
        go.update();
        go.components.forEach(component => {
            if (component instanceof Sprite) {
                this.renderService.update(component, go.position, go.rotation, go.scale);
            } else if(component instanceof Body) {
                this.physicsService.update(component, go);
            }
        });
    }

    add(gameObject) {
        GameState.world.children.push(gameObject);
    }

}

module.exports = GameEngine;