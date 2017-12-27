const GameState = require('model/core/GameState');
const Body = require('model/component/Body');
const PhysicsEvent = require('model/core/PhysicsEvent');
const Vector2 = require('commons/math/Vector2');
const Box2D = require('link/Box2D');

var world = null;
var events = new Array();

class PhysicsService {

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
        this.velocityIterations = 10;
        this.positionIterations = 10;
        this.clearForcesOnUpdate = false;
        this.listeners = listeners;

        world = new Box2D.b2World(new Box2D.b2Vec2(gravity.x, gravity.y), allowSleep);

        var listener = new Box2D.JSContactListener();

        listener.BeginContact = (this.listeners & PhysicsService.LISTENER.BEGIN_CONTACT) ?
            (contact) => events.push(new PhysicsEvent("BeginContact", contact)) : () => { };
        listener.EndContact = (this.listeners & PhysicsService.LISTENER.END_CONTACT) ?
            (contact) => events.push(new PhysicsEvent("EndContact", contact)) : () => { };
        listener.PreSolve = (this.listeners & PhysicsService.LISTENER.PRE_SOLVE) ?
            (contact, manifold) => events.push(new PhysicsEvent("PreSolve", contact, { manifold: manifold })) : () => { };
        listener.PostSolve = (this.listeners & PhysicsService.LISTENER.POST_SOLVE) ?
            (contact, impulse) => events.push(new PhysicsEvent("PostSolve", contact, { impulse: impulse })) : () => { };

        world.SetContactListener(listener);
    }

    get events() {
        var evts = events.slice();
        events = new Array();
        return evts;
    }

    destroy(body) {
        // TODO: Verificar fluxo para remoção do body 
        return world.DestroyBody(body.bodyDef);
    }

    update(body, go) {
        if (body.state === Body.STATE.REGISTERED) {
            go.position.x = body.position.x;
            go.position.y = body.position.y;

        } else if (body.state === Body.STATE.CREATED) {
            body.materialDef.set_userData(go.id);
            body.position = Vector2(go.position.x, go.position.y);
            body.body = world.CreateBody(body.bodyDef);
            body.body.CreateFixture(body.materialDef);
            body.state = Body.STATE.REGISTERED;
        }
    }

    simulate() {
        world.Step(1 / GameState.fps, this.velocityIterations, this.positionIterations);
        if (this.clearForcesOnUpdate) {
            world.ClearForces();
        }
    }
}

module.exports = PhysicsService;