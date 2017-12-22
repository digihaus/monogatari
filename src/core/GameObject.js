var Common = require('core/Common');
var Timer = require('core/Timer');
var Message = require('core/Message');
var Math = require('core/Math');
var Map = require('collection/Map');
var LinkedList = require('collection/LinkedList');
var Base = require('component/Base');
var RigidBody = require('component/RigidBody');
var MessageManager = require('manager/MessageManager');
var PhysicsManager = require('manager/PhysicsManager');
var SceneManager = require('manager/SceneManager');
var THREE = require('link/Three');

/**
 * The main build block of the engine. Create the game classes by inheriting from the Game Object.
 * For quick creation of GOs, it is also possible to use composition.
 *
 * @example
 * // Composition
 * var myGO = new m.GameObject( myGOId, myGOUpdateFunction );
 *
 * // Inheritance
 * var MyGOClass = function( id ) {
 *  m.GameObject.call( this, id );
 * };
 * MyGOClass.prototype = Object.create( m.GameObject.prototype );
 * MyGOClass.prototype.update = function() { ... };
 *
 * @param {String} [id] Identifier. Not mandatory, but recommended
 * @param {function} [update] The object logic. Not necessary if using inheritance
 * @param {THREE.Vector3} [position] Initial position
 * @param {THREE.Vector3} [rotation] Initial rotation
 * @param {THREE.Vector3} [scale] Initial scale
 * @requires core/Common
 * @requires core/Timer
 * @requires core/Message
 * @requires collection/Map
 * @requires collection/LinkedList
 * @requires component/Base
 * @requires manager/MessageManager
 * @requires manager/PhysicsManager
 * @requires manager/SceneManager
 * @requires lib/Three
 * @exports core/GameObject
 */
var GameObject = function (id, update, position, rotation, scale) {

  /**
   * Unique identifier, created automatically.
   * @readOnly
   * @type {String}
   */
  this.uid = Common.createUniqueId();

  /**
   * The Game Object id, used to recover the GO instance wherever necessary.
   * Recommended to be explicitly set.
   * @type {String}
   * @default uid
   */
  this.id = id || this.uid;

  /**
   * @type {THREE.Vector3}
   * @default THREE.Vector3( 0, 0, 0 )
   */
  this.position = (position) ? position : new THREE.Vector3(0, 0, 0);

  /**
   * Represents rotation (X, Y, Z) in radians.
   * @type {THREE.Euler}
   * @default THREE.Euler( 0, 0, Math.PI, 'XYZ' )
   */
  this.rotation = (rotation) ? rotation : new THREE.Euler(0, 0, Math.PI, 'XYZ');

  /**
   * A direction vector, reference used to rotate objects in 2D space.
   * @type {THREE.Vector3}
   * @default THREE.Vector3( 0, 1, 0 )
   */
  this.direction = new THREE.Vector3(0, 1, 0);

  /**
   * @type {THREE.Vector3}
   * @default THREE.Vector3( 1, 1, 1 )
   */
  this.scale = (scale) ? scale : new THREE.Vector3(1, 1, 1);

  /**
   * Axis with Y flipped to calculate properly according to the engine orthographic camera.
   * @type {THREE.Vector3}
   * @default THREE.Vector3( 0, -1, 0 );
   */
  this.axis = new THREE.Vector3(0, -1, 0);

  /**
   * @type {module:collection/Map}
   */
  this.components = new Map();

  /**
   * An iterator for the components.
   */
  this.componentsIt = this.components.iterator();

  /**
   * @type {module:collection/LinkedList}
   */
  this.messages = new LinkedList();

  /**
   * List of Game Objects that are children of this.
   * @type {Array}
   */
  this.children = [];

  /**
   * Controls if this Game Object will be updated on engine cycle.
   * @type {Boolean}
   */
  this.isActive = true;

  /**
   * Last time this Game Object was updated.
   * @type {Number}
   */
  this.lastUpdate = 0;

  this.sceneId = SceneManager.DEFAULT_SCENE_ID;

  if (typeof (update) === 'function') {
    this.update = update;
  }
};

/**
 * Method to be overridden when inheriting from Game Object.
 * It is called on every engine cycle, making it the place to put specific logic.
 * @abstract
 */
GameObject.prototype.update = function () {
  // console.warn( 'Update method is not implemented in GameObject id: ' + this.id );
  // throw new Error( 'Update method is not implemented in GameObject id: ' + this.id );
};

/**
 * Method that updates all the components and stores last update time.
 */
GameObject.prototype.postUpdate = function () {
  if (this.isActive) {
    this.updateComponents();
  }
  this.messages.clear();
  this.lastUpdate = Timer.time;
};

/**
 * Method that sends a message to another GameObject through the Message protocol.
 * @param {String} to - Id of the target GameObject
 * @param {String} type - A String to identify the type of the message
 * @param {Object} message - The message content
 */
GameObject.prototype.sendMessage = function (to, type, message) {
  MessageManager.register(new Message(this.id, to, type, message));
};

/**
 * Method called by the MessageManager to register messages to this GameObject.
 * @param {Message} message - The message object
 */
GameObject.prototype.receiveMessage = function (message) {
  this.messages.put(message);
};

/**
 * Calculates rotation based on the reference of the axis attribute.
 * @return {Number}
 */
GameObject.prototype.getEulerRotation = function () {
  var angle = this.direction.angleTo(this.axis);
  return (this.direction.y * this.axis.x > this.direction.x * this.axis.y) ? angle : -angle;
};

/**
 * Rotates the Game Object around Z to a target coordinate.
 * @param {THREE.Vector3} target - A Vector3 containing the target position to rotate
 */
GameObject.prototype.lookAt = function (target) {
  this.direction.x = target.x - this.position.x;
  this.direction.y = target.y - this.position.y;
  this.direction.normalize();
  this.rotation.z = this.getEulerRotation();
};

/**
 * Rotates the Game Object around Z to a target coordinate.
 * @param {Number} x - X coordinate to look at
 * @param {Number} y - Y coordinate to look at
 */
GameObject.prototype.lookAtXY = function (x, y) {
  this.direction.x = x - this.position.x;
  this.direction.y = y - this.position.y;
  this.direction.normalize();
  this.rotation.z = this.getEulerRotation();
};

/**
 * Calculates rotation around Z based on the reference of the axis attribute and a target Vector3.
 * @param {THREE.Vector3} target - A Vector3 containing the target position to rotate
 * @return {Number}
 */
GameObject.prototype.getEulerRotationToTarget = function (target) {
  var direction = this.direction.clone();

  direction.x = target.x - this.position.x;
  direction.y = target.y - this.position.y;

  direction.normalize();

  var angle = direction.angleTo(this.axis);

  return (direction.y * this.axis.x > direction.x * this.axis.y) ? angle : -angle;
};

/**
 * Put the given component on the Map of components.
 * @param {module:component/Base} component - Any valid component
 */
GameObject.prototype.addComponent = function (component) {

  if (component instanceof RigidBody) {
    component.setUserData(this.uid);
    PhysicsManager.attachToWorld(component);
  }

  this.components.put(component.type, component);
};

/**
 * Returns the component of given type from the map or null if not found.
 * @param {module:component/Base.TYPE} type - Component type
 * @return {module:component/Base} Instance of a component
 */
GameObject.prototype.findComponent = function (type) {
  return this.components.get(type);
};

/**
 * Removes the component of given type from the map.
 * @param {String} type - Component type constant, as listed on the Base component
 */
GameObject.prototype.removeComponent = function (type) {
  this.components.remove(type);
};

/**
 * Clears the component map.
 */
GameObject.prototype.clearComponents = function () {
  this.components.clear();
};

/**
 * Checks for a component type on the Map of components.
 * @param {String} type - Component type constant, as listed on the Base component
 * @return {Boolean}
 */
GameObject.prototype.hasComponent = function (type) {
  return (this.components.contains(type)) ? true : false;
};

/**
 * Find and return the components that requires rendering.
 * @return {Array}
 */
GameObject.prototype.listRenderableComponents = function () {
  var list = [];
  var c;
  this.componentsIt.first();
  while (this.componentsIt.hasNext()) {
    c = this.componentsIt.next();
    if (c.type === Base.TYPE.SPRITE) {
      list.push(c);
    }
  }
  return list;
};

/**
 * Rotate an object around an arbitrary axis ({@link http://stackoverflow.com/questions/11060734/how-to-rotate-a-3d-object-on-axis-three-js|reference}).
 *
 * @example
 * // rotation of 90 degrees on the x-axis
 * var xAxis = new THREE.Vector3(1,0,0);
 * rotateAroundWorldAxis( xAxis, Math.PI / 180);
 *
 * @param {THREE.Vector3} [axis] - The reference axis for rotation
 * @param {Number} [radians] - Radian degrees to rotate
 */
GameObject.prototype.rotateAroundAxis = function (axis, radians) {
  this.rotation = Math.rotateAroundAxis(this.rotation, axis, radians);
};

/**
 * Rotate an object around a pivot position
 *
 * @param {THREE.Vector3} [pivot] - The reference pivot for rotation
 * @param {Number} [radians] - Radian degrees to rotate
 */
GameObject.prototype.rotateAroundPivot = function (pivot, radians) {
  this.position = Math.rotateAroundPivot(this.position, pivot, radians);
};

/**
 * Iterate and update all components. Automatically called from the postUpdate method.
 */
GameObject.prototype.updateComponents = function () {
  this.componentsIt.first();
  while (this.componentsIt.hasNext()) {
    var component = this.componentsIt.next();

    if (component instanceof RigidBody) {
      // Updates object position from Box2D to the engine based on physics simulation (if applicable).
      // Only affect X and Y for safety reasons, messing with Z on 2D is probably not expected.
      var position = component.getPosition();
      this.position.x = position.x;
      this.position.y = position.y;
      
    } else {
      // For renderable components, updates engine transformations to Three.js
      if (component.type === Base.TYPE.SPRITE || component.type === Base.TYPE.CANVAS) {

        if (component.state === Base.STATE.REGISTERED) {
          component.mesh.position.set(this.position.x, this.position.y, this.position.z);
          component.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
          component.mesh.scale.set(-this.scale.x, this.scale.y, this.scale.z);

        } else if (component.state === Base.STATE.READY) {
          SceneManager.attachToScene(component, this.sceneId);
          component.state = Base.STATE.REGISTERED;

        } else if (component.state === Base.STATE.LOADED) {
          component.buildMesh();
        }
      }
    }
    // For components that require an update
    if (typeof (component.update) === 'function') {
      component.update();
    }
  }
};

/**
 * Iterate, find (recursively) and return reference to the Game Object with the given id in the children Array.
 * null if not found.
 * @param {String} id - Game Object id
 * @return {module:core/GameObject}
 */
GameObject.prototype.find = function (id) {
  var go;

  if (this.id === id) {
    return this;
  }

  for (var i = 0, len = this.children.length; i < len; i++) {
    go = this.children[i].find(id);
    if (go) {
      return go;
    }
  }

  return null;
};

/**
 * Iterate, find (recursively) and return reference to the Game Object with the given uid in the children Array.
 * null if not found.
 * @param {Number} uid - Game Object numeric unique id
 * @return {GameObject}
 */
GameObject.prototype.findByUid = function (uid) {
  var go;

  if (this.uid === uid) {
    return this;
  }

  for (var i = 0, len = this.children.length; i < len; i++) {
    go = this.children[i].findByUid(uid);
    if (go) {
      return go;
    }
  }

  return null;
};

/**
 * Checks for equality with the given Game Object.
 * @param {GameObject} go - Other Game Object reference
 * @return {Boolean}
 */
GameObject.prototype.equals = function (go) {
  return (go.uid === this.uid);
};

/**
 * Iterate (recursively) on the children Array, calling update and postUpdate methods for every child and for itself.
 * Automatically called from the main game loop.
 */
GameObject.prototype.updateAll = function () {
  for (var i = 0, len = this.children.length; i < len; i++) {
    MessageManager.sendMessagesTo(this.children[i]);
    this.children[i].updateAll();
  }
  this.update();
  this.postUpdate();
};

/**
 * Iterate (recursively) on the children Array, destroying every component, child and itself.
 */
GameObject.prototype.destroy = function () {
  // iterate through children destroying them
  for (var i = 0, len = this.children.length; i < len; i++) {
    this.children[i].destroy();
  }
  // iterate components and handle component specific cleanup
  this.componentsIt.first();
  while (this.componentsIt.hasNext()) {
    var component = this.componentsIt.next();

    // Box2D - RigidBody
    if (component.type === Base.TYPE.RIGID_BODY) {
      PhysicsManager.destroyBody(component);
    }

    // Three.js
    if (component.type === Base.TYPE.SPRITE) {
      SceneManager.detachFromScene(component, this.sceneId);
    }

    // Sound.js
    if (component.type === Base.TYPE.AUDIO) {
      component.destroy();
    }
  }
};

GameObject.prototype.load = function () {
  var resources = 0;
  var loaded = 0;
  var childPercentage = 0;

  if (this.children.length > 0) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      childPercentage += this.children[i].load();
    }
    childPercentage = childPercentage / this.children.length;
  } else {
    childPercentage = 1;
  }

  this.componentsIt.first();
  while (this.componentsIt.hasNext()) {
    var component = this.componentsIt.next();
    if (component.type === Base.TYPE.SPRITE || component.type === Base.TYPE.AUDIO) {
      resources++;
      if (component.state === Base.STATE.LOADED) {
        loaded++;
      }
    }
  }

  var loadPercentage = 0;

  if (resources == 0) {
    loadPercentage = childPercentage;
  } else {
    if (loaded == 0) {
      loadPercentage = 0;
    } else {
      loadPercentage = (resources / loaded + childPercentage) / 2;
    }
  }

  return loadPercentage;
};

module.exports = GameObject;