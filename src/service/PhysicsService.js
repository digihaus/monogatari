const GameState = require('model/core/GameState');
const Body = require('model/component/Body');
const Vector2 = require('commons/math/Vector2');
const Box2D = require('link/Box2D');

var physicsWorld = null;

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
        physicsWorld = new Box2D.b2World(new Box2D.b2Vec2(gravity.x, gravity.y), allowSleep);
    }

    destroy(body) {
        // TODO: Verificar fluxo para remoção do body 
        return physicsWorld.DestroyBody(body.bodyDef);
    }

    update(body, go) {
        if (body.state === Body.STATE.REGISTERED) {
            go.position.x = body.position.x;
            go.position.y = body.position.y;

        } else if (body.state === Body.STATE.CREATED) {
            body.materialDef.set_userData(go.id);
            body.position = Vector2(go.position.x, go.position.y);
            body.body = physicsWorld.CreateBody(body.bodyDef);
            body.body.CreateFixture(body.materialDef);
            body.state = Body.STATE.REGISTERED;
        }
    }

    simulate() {
        physicsWorld.Step(1 / GameState.fps, this.velocityIterations, this.positionIterations);
        if (this.clearForcesOnUpdate) {
            physicsWorld.ClearForces();
        }
    }
}

module.exports = PhysicsService;