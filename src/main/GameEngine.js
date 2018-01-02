import { GameObject } from 'model/core/GameObject';
import { Message } from 'model/core/Message';
import { Sprite } from 'model/component/Sprite';
import { Body } from 'model/component/Body';
import { Audio } from 'model/component/Audio';
import { RenderService } from 'service/RenderService';
import { PhysicsService } from 'service/PhysicsService';
import { MessageService } from 'service/MessageService';
import { AudioService } from 'service/AudioService';
import { Logger } from 'commons/Logger';

export class GameEngine {

    constructor(target, width, height) {
        this._logger = new Logger(GameEngine.name);
        this._world = new GameObject('world');
        this._sequence = 0;
        this._frameCounter = 0;
        this._lastCycleTime = 0;
        this._lastFrameCountTime = 0;
        this._time = 0;
        this._fps = 60;

        this.renderService = new RenderService(document.createElement('canvas'), width, height, target.offsetWidth, target.offsetHeight);
        this.physicsService = new PhysicsService({ x: 0, y: 10 }, true, PhysicsService.LISTENER.BEGIN_END_CONTACT);
        this.messageService = new MessageService();
        this.audioService = new AudioService();

        target.appendChild(this.renderService.renderer.domElement);

        window.addEventListener('resize', function () {
            this.renderService.resize(target.offsetWidth, target.offsetHeight);
        }.bind(this), true);
    }

    get time() {
        return this._time;
    }

    get fps() {
        return this._fps;
    }

    add(go) {
        go.uid = this._sequence++;
        this._world.attach(go);
    }

    run(loaded) {
        if (loaded) {
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
                this.messageService.messages.push(new Message(goB, goA, new Date(), Message.TYPE.PHYSICS, event));
            });

            this.physicsService.simulate(this._fps);
            this.update(this._world);
            this.renderService.render();

        } else {
            var loadedPercentage = this.load(this._world);
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