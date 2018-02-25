import { GameState } from 'GameState';
import { GameObject } from 'model/core/GameObject';
import { Message } from 'model/core/Message';
import { Graphic } from 'model/component/Graphic';
import { Sprite } from 'model/component/Sprite';
import { Canvas } from 'model/component/Canvas';
import { Body } from 'model/component/Body';
import { Audio } from 'model/component/Audio';
import { RenderService } from 'service/RenderService';
import { PhysicsService } from 'service/PhysicsService';
import { MessageService } from 'service/MessageService';
import { AudioService } from 'service/AudioService';
import { BrowserHandler } from 'handler/BrowserHandler';
import { KeyboardHandler } from 'handler/KeyboardHandler';
import { MouseHandler } from 'handler/MouseHandler';
import { Logger } from 'commons/Logger';

var _frameCounter = 0;
var _lastCycleTime = 0;
var _lastFrameCountTime = 0;

export class GameEngine {

    constructor(container, width, height) {
        this._logger = new Logger(GameEngine.name);

        this._renderService = new RenderService(width, height, container.offsetWidth, container.offsetHeight);
        this._physicsService = new PhysicsService({ x: 0, y: 10 }, true, PhysicsService.LISTENER.BEGIN_END_CONTACT);
        this._messageService = new MessageService();
        this._audioService = new AudioService();

        container.appendChild(this._renderService.domElement);

        this.browserHandler = new BrowserHandler(container);
        this.keyboardHandler = new KeyboardHandler();
        this.mouseHandler = new MouseHandler(this._renderService.domElement);
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

        this._update(GameState.world);

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
            if (resources > 0) {
                var loadedResources = this._countLoadedResources(GameState.world);
                var percentage = loadedResources ? (loadedResources / resources) : 0;
                this._logger.info("loading: " + Math.round(percentage * 100) + "% (" + loadedResources + "/" + resources + ")");
                GameState.loaded = percentage >= 1;
            } else {
                GameState.loaded = true;
            }
        }

        requestAnimationFrame(this.run.bind(this));
    }

    _update(go) {
        go.children.forEach(child => this._update(child));
        go.components.forEach(component => {
            if (component instanceof Graphic) {
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

}