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

        this.renderService = new RenderService(document.createElement('canvas'), width, height, container.offsetWidth, container.offsetHeight);
        this.physicsService = new PhysicsService({ x: 0, y: 10 }, true, PhysicsService.LISTENER.BEGIN_END_CONTACT);
        this.messageService = new MessageService();
        this.audioService = new AudioService();

        this.browserHandler = new BrowserHandler({ onResize: () => this.renderService.resize(container.offsetWidth, container.offsetHeight) });
        this.keyboardHandler = new KeyboardHandler();

        container.appendChild(this.renderService.renderer.domElement);

        //  window.addEventListener('mousemove', (event) => this.inputService.onMouseMove(event, GameState.time), false);
        //  window.addEventListener('mousedown', (event) => this.inputService.onMouseDown(event, GameState.time), false);
        //  window.addEventListener('mouseup', (event) => this.inputService.onMouseUp(event), false);
    }

    run(loaded) {
        if (loaded) {
            var now = Date.now();
            _frameCounter++;
            GameState.time += now - _lastCycleTime;
            _lastCycleTime = now;
            if (_lastFrameCountTime === 0) _lastFrameCountTime = GameState.time;
            if ((GameState.time - _lastFrameCountTime) >= 1000) {
                GameState.fps = _frameCounter;
                _frameCounter = 0;
                _lastFrameCountTime = GameState.time;
            }

            this.physicsService.events.forEach(event => {
                var goA = GameState.world.findChild(event.contact.GetFixtureA().GetUserData());
                var goB = GameState.world.findChild(event.contact.GetFixtureB().GetUserData());
                this.messageService.messages.push(new Message(goA, goB, new Date(), Message.TYPE.PHYSICS, event));
                this.messageService.messages.push(new Message(goB, goA, new Date(), Message.TYPE.PHYSICS, event));
            });

            this.physicsService.simulate(GameState.fps);
            this.update(GameState.world);
            this.renderService.render();

        } else {
            var loadedPercentage = this.load(GameState.world);
            if (loadedPercentage === 1) {
                loaded = true;
            }
            this._logger.info(loadedPercentage * 100);
        }
        requestAnimationFrame(this.run.bind(this, loaded));
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
            } else if (component instanceof Audio) {
                this.audioService.update(component);
            }
        });
    }

    load(go) {
        var resources = 0;
        var loadedResources = 0;
        var totalLoadedPercentage = 0;
        var childrenLoadedPercentage = 0;

        go.components.forEach(component => {
            if (component instanceof Sprite || component instanceof Audio) {
                resources++;
                if (component.loaded) {
                    loadedResources++;
                }
            }
        });

        if (go.children > 0) {
            go.children.forEach(child => {
                childrenLoadedPercentage += this.load(child) / go.children.length;
            }, this);
        } else {
            childrenLoadedPercentage = 1;
        }

        if (resources === 0) totalLoadedPercentage = childrenLoadedPercentage;
        else {
            if (loadedResources === 0) totalLoadedPercentage = 0;
            else totalLoadedPercentage = (resources / loadedResources + childrenLoadedPercentage) / 2;
        }

        return totalLoadedPercentage;
    }
}