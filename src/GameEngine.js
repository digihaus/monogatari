const GameObject = require('model/core/GameObject');
const Message = require('model/core/Message');
const Sprite = require('model/component/Sprite');
const Body = require('model/component/Body');
const RenderService = require('service/RenderService');
const PhysicsService = require('service/PhysicsService');
const MessageService = require('service/MessageService');

class GameEngine {

    constructor(target, width, height) {
        this.renderService = new RenderService(document.createElement('canvas'), width, height, target.offsetWidth, target.offsetHeight);
        this.physicsService = new PhysicsService({ x: 0, y: 10 }, true, PhysicsService.LISTENER.BEGIN_END_CONTACT);
        this.messageService = new MessageService();

        target.appendChild(this.renderService.renderer.domElement);

        window.addEventListener('resize', function () {
            this.renderService.resize(target.offsetWidth, target.offsetHeight);
        }.bind(this), true);

        this._world = new GameObject('world');
        this._sequence = 0;
        this._frameCounter = 0;
        this._lastCycleTime = 0;
        this._lastFrameCountTime = 0;
        this._time = 0;
        this._fps = 60;
    }

    get time() {
        return this._time;
    }

    get fps() {
        return this._fps;
    }

    run() {
        var now = Date.now();

        this._frameCounter++;

        this._time += now - this._lastCycleTime;
        this._lastCycleTime = now;

        if (this._lastFrameCountTime === 0) this._lastFrameCountTime = this._time;

        if ((this._time - this._lastFrameCountTime) >= 1000) {
            this._fps = this._frameCounter;
            this._frameCounter = 0;
            this._lastFrameCountTime = this._time;
        }

        this.physicsService.events.forEach(event => {
            var goA = this._world.findChild(event.contact.GetFixtureA().GetUserData());
            var goB = this._world.findChild(event.contact.GetFixtureB().GetUserData());
            this.messageService.messages.push(new Message(goA, goB, new Date(), Message.TYPE.PHYSICS, event));
        });

        this.physicsService.simulate(this._fps);
        this.update(this._world);
        this.renderService.render();

        requestAnimationFrame(this.run.bind(this));
    }

    update(go) {
        go.children.forEach(child => this.update(child));
        this.messageService.update(go);
        go.update();
        go.components.forEach(component => {
            if (component instanceof Sprite) {
                this.renderService.update(component, go.position, go.rotation, go.scale);
            } else if (component instanceof Body) {
                this.physicsService.update(component, go);
            }
        });
    }

    add(go) {
        go.uid = this._sequence++;
        this._world.attach(go);
    }
}

module.exports = GameEngine;