import { GameState } from 'GameState';
import { GameObject } from 'model/core/GameObject';
import { Message } from 'model/core/Message';
import { Sprite } from 'model/component/Sprite';
import { Body } from 'model/component/Body';
import { Audio } from 'model/component/Audio';
import { RenderService } from 'service/RenderService';
import { PhysicsService } from 'service/PhysicsService';
import { MessageService } from 'service/MessageService';
import { AudioService } from 'service/AudioService';
import { BrowserHandler } from 'handler/BrowserHandler';
import { KeyboardHandler } from 'handler/KeyboardHandler';
import { Logger } from 'commons/Logger';

var _frameCounter = 0;
var _lastCycleTime = 0;
var _lastFrameCountTime = 0;

export class GameEngine {

    constructor(container, width, height) {
        this._logger = new Logger(GameEngine.name);

        this._renderService = new RenderService(document.createElement('canvas'), width, height, container.offsetWidth, container.offsetHeight);
        this._physicsService = new PhysicsService({ x: 0, y: 10 }, true, PhysicsService.LISTENER.BEGIN_END_CONTACT);
        this._messageService = new MessageService();
        this._audioService = new AudioService();

        this.browserHandler = new BrowserHandler(() => this._renderService.resize(container.offsetWidth, container.offsetHeight));
        this.keyboardHandler = new KeyboardHandler();

        container.appendChild(this._renderService.renderer.domElement);

        //  window.addEventListener('mousemove', (event) => this.inputService.onMouseMove(event, GameState.time), false);
        //  window.addEventListener('mousedown', (event) => this.inputService.onMouseDown(event, GameState.time), false);
        //  window.addEventListener('mouseup', (event) => this.inputService.onMouseUp(event), false);
    }

    run() {
        var now = Date.now();

        _frameCounter++;

        GameState.time += now - _lastCycleTime;
        _lastCycleTime = now;

        if (_lastFrameCountTime === 0) {
            _lastFrameCountTime = GameState.time;
        }
        if ((GameState.time - _lastFrameCountTime) >= 1000) {
            GameState.fps = _frameCounter;
            _frameCounter = 0;
            _lastFrameCountTime = GameState.time;
        }

        if (GameState.loaded) {
            this._physicsService.events.forEach(event => {
                var goA = GameState.world.findChild(event.contact.GetFixtureA().GetUserData());
                var goB = GameState.world.findChild(event.contact.GetFixtureB().GetUserData());
                this._messageService.messages.push(new Message(goA, goB, new Date(), Message.TYPE.PHYSICS, event));
                this._messageService.messages.push(new Message(goB, goA, new Date(), Message.TYPE.PHYSICS, event));
            });
            this._physicsService.simulate(GameState.fps);
            this._renderService.render();

        } else {
            var resources = this._countResources(GameState.world);
            var loadedResources = this._countLoadedResources(GameState.world);
            var percentage = loadedResources ? (loadedResources / resources) : 0;
            GameState.loaded = percentage >= 1;
            this._logger.info("loading: " + loadedResources + "/" + resources);
        }

        this._update(GameState.world);

        requestAnimationFrame(this.run.bind(this));
    }

    _countResources(go) {
        return go.components.reduce((acc, comp) => {
            return (comp instanceof Sprite || comp instanceof Audio) ? acc + 1 : acc;
        }, go.children.reduce((acc, child) => { return acc + this._countResources(child) }, 0));
    }

    _countLoadedResources(go) {
        return go.components.reduce((acc, comp) => {
            return (comp.loaded) ? acc + 1 : acc;
        }, go.children.reduce((acc, child) => { return acc + this._countLoadedResources(child) }, 0));
    }

    _update(go) {
        go.children.forEach(child => this._update(child));
        go.components.forEach(component => {
            if (component instanceof Sprite) {
                this._renderService.update(component, go.position, go.rotation, go.scale);
            } else if (component instanceof Body) {
                this._physicsService.update(component, go);
            } else if (component instanceof Audio) {
                this._audioService.update(component);
            }
        });
        if (GameState.loaded) {
            this._messageService.update(go);
            go.update();
        }
    }

}