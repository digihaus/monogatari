import { Body } from 'model/component/Body';
import { PhysicsEvent } from 'model/core/PhysicsEvent';
import { Vector2 } from 'commons/math/Vector2';
import { Box2D } from 'link/Box2D';
import { Logger } from 'commons/Logger';

export class PhysicsService {

    static get LISTENER() {
        return {
            BEGIN_CONTACT: 1, // 0001
            END_CONTACT: 2, // 0010
            BEGIN_END_CONTACT: 3, // 0011
            PRE_SOLVE: 4, // 0100
            POST_SOLVE: 8, // 1000
            ALL_LISTENERS: 15 //1111
        }
    }

    constructor(gravity, allowSleep, listeners) {
        this.logger = new Logger(PhysicsService.name);

        this.velocityIterations = 2;
        this.positionIterations = 2;
        this.clearForcesOnUpdate = false;
        this.listeners = listeners;

        this._events = new Array();
        this._world = new Box2D.b2World(new Box2D.b2Vec2(gravity.x, gravity.y), allowSleep);

        var listener = new Box2D.JSContactListener();

        listener.BeginContact = (this.listeners & PhysicsService.LISTENER.BEGIN_CONTACT) ?
            (contact) => this._events.push(new PhysicsEvent("BeginContact", contact)) : () => { };
        listener.EndContact = (this.listeners & PhysicsService.LISTENER.END_CONTACT) ?
            (contact) => this._events.push(new PhysicsEvent("EndContact", contact)) : () => { };
        listener.PreSolve = (this.listeners & PhysicsService.LISTENER.PRE_SOLVE) ?
            (contact, manifold) => this._events.push(new PhysicsEvent("PreSolve", contact, { manifold: manifold })) : () => { };
        listener.PostSolve = (this.listeners & PhysicsService.LISTENER.POST_SOLVE) ?
            (contact, impulse) => this._events.push(new PhysicsEvent("PostSolve", contact, { impulse: impulse })) : () => { };

        this._world.SetContactListener(listener);

        this.logger.debug("physics world ready with listeners", listener);
    }

    get events() {
        return this._events.splice(0);
    }

    destroy(body) {
        return this._world.DestroyBody(body.bodyDef);
    }

    update(body, go) {
        if (body.state === Body.STATE.REGISTERED) {
            go.position.x = body.position.x;
            go.position.y = body.position.y;

        } else if (body.state === Body.STATE.CREATED) {
            body.materialDef.set_userData(go.uid);
            body.position = Vector2(go.position.x, go.position.y);
            body.body = this._world.CreateBody(body.bodyDef);
            body.body.CreateFixture(body.materialDef);
            body.state = Body.STATE.REGISTERED;
        }
    }

    simulate(fps) {
        this._world.Step(1 / fps, this.velocityIterations, this.positionIterations);
        if (this.clearForcesOnUpdate) {
            this._world.ClearForces();
        }
    }

}