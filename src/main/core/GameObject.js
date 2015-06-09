/**
 * Exports the {@link module:core/GameObject~GameObject|GameObject} class.
 * @module core/GameObject
 */
define(
  [
    'core/Common',
    'core/Timer',
    'core/Message',
    'collection/Map',
    'collection/LinkedList',
    'component/Base',
    'manager/MessageManager',
    'lib/Three'
  ],
  function( Common, Timer, Message, Map, LinkedList, Base, MessageManager, _Three ) {

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

     * @param {String} id Identifier. Not mandatory, but recommended
     * @param {function} update The object logic. Not necessary if using inheritance
     * @param {THREE.Vector3} position Initial position
     * @param {THREE.Vector3} rotation Initial rotation
     * @param {THREE.Vector3} scale Initial scale
     * @class GameObject
     */
    var GameObject = function( id, update, position, rotation, scale ) {

      /**
       * Unique identifier, created automatically.
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @type {string}
       * @name uid
       */
      this.uid = Common.createUniqueId();

      /**
       * The Game Object id, used to recover the GO instance wherever necessary.
       * Recommended to be explicitly set.
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @type {String|string}
       * @name id
       * @default uid
       */
      this.id = id || this.uid;

      /**
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @type {THREE.Vector3}
       * @name position
       * @default THREE.Vector3( 0, 0, 0 )
       */
      this.position = ( position ) ? position : new THREE.Vector3( 0, 0, 0 );

      /**
       * Represents rotation (X, Y, Z) in radians
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @type {THREE.Euler}
       * @name rotation
       * @default THREE.Euler( 0, 0, Math.PI, 'XYZ' )
       */
      this.rotation = ( rotation ) ? rotation : new THREE.Euler( 0, 0, Math.PI, 'XYZ' );

      /**
       * A direction vector, reference used to rotate objects in 2D space
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @type {THREE.Vector3}
       * @name direction
       * @default THREE.Vector3( 0, 1, 0 )
       */
      this.direction = new THREE.Vector3( 0, 1, 0 );

      /**
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @type {THREE.Vector3}
       * @name scale
       * @default THREE.Vector3( 1, 1, 1 )
       */
      this.scale = ( scale ) ? scale : new THREE.Vector3( 1, 1, 1 );

      /**
       * Axis with Y flipped to calculate properly according to the engine orthographic camera.
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @type {THREE.Vector3}
       * @name axis
       * @default THREE.Vector3( 0, -1, 0 );
       */
      this.axis = new THREE.Vector3( 0, -1, 0 );

      /**
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @type {Map}
       * @name components
       */
      this.components = new Map();

      /**
       * An iterator for the components.
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @name componentsIt
       */
      this.componentsIt = this.components.iterator();

      /**
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @type {LinkedList}
       * @name messages
       */
      this.messages = new LinkedList();

      /**
       * List of Game Objects that are children of this.
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @type {Array}
       * @name children
       */
      this.children = [];

      /**
       * Controls if this Game Object will be rendered on canvas.
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @type {boolean}
       * @name isVisible
       */
      this.isVisible = true;

      /**
       * Controls if this Game Object will be updated on engine cycle.
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @type {boolean}
       * @name isActive
       */
      this.isActive = true;

      this.lastUpdate = 0;

      this.update = ( update && typeof ( update ) === 'function' ) ? update : function() {};
    };

    /**
     * Method to be overridden when inheriting from Game Object.
     * It is called on every engine cycle, making it the place to put specific logic.
     * @method
     * @abstract
     * @instance
     * @name update
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.update = function() {
      throw new Error( 'Update method is not implemented in GameObject id: ' + this.id );
    };

    GameObject.prototype.postUpdate = function() {
      if( this.isActive ) {
        this.updateComponents();
      }
      this.lastUpdate = Timer.time;
    };

    GameObject.prototype.sendMessage = function( to, type, message ) {
      MessageManager.register( new Message( this.id, to, type, message ) );
    };

    GameObject.prototype.receiveMessage = function( message ) {
      this.messages.put( message );
    };

    GameObject.prototype.getEulerRotation = function() {
      var angle = this.direction.angleTo( this.axis );
      return ( this.direction.y * this.axis.x > this.direction.x * this.axis.y ) ? angle : -angle;
    };

    GameObject.prototype.lookAt = function( target ) {
      this.direction.x = target.x - this.position.x;
      this.direction.y = target.y - this.position.y;
      this.direction.normalize();
      this.rotation.z = this.getEulerRotation();
    };

    GameObject.prototype.getEulerRotationToTarget = function( target ) {
      var direction = this.direction.clone();

      direction.x = target.x - this.position.x;
      direction.y = target.y - this.position.y;

      direction.normalize();

      var angle = direction.angleTo( this.axis );

      return ( direction.y * this.axis.x > direction.x * this.axis.y ) ? angle : -angle;
    };

    GameObject.prototype.addComponent = function( component ) {
      this.components.put( component.type, component );
    };

    GameObject.prototype.findComponent = function( type ) {
      return this.components.get( type );
    };

    GameObject.prototype.removeComponent = function( type ) {
      this.components.remove( type );
    };

    GameObject.prototype.clearComponents = function() {
      this.components.clear();
    };

    GameObject.prototype.hasComponent = function( type ) {
      return ( this.components.contains( type ) ) ? true : false;
    };

    GameObject.prototype.listRenderableComponents = function() {
      var list = [];
      var c;
      this.componentsIt.first();
      while( this.componentsIt.hasNext() ) {
        c = this.componentsIt.next();
        if( c.isRenderable ) {
          list.push( c );
        }
      }
      return list;
    };

    GameObject.prototype.updateComponents = function() {
      // Updates object position from Box2D to the engine based on physics simulation (if applicable).
      // Only affect X and Y for safety reasons, messing with Z on 2D is probably not expected.
      var rigidBody = this.findComponent( Base.RIGID_BODY );
      if( rigidBody ) {
        this.position.x = rigidBody.body.GetPosition().get_x() * rigidBody.conversionFactor;
        this.position.y = rigidBody.body.GetPosition().get_y() * rigidBody.conversionFactor;
      }

      // For renderable components, updates engine transformations to Three.js
      this.componentsIt.first();
      while( this.componentsIt.hasNext() ) {
        var component = this.componentsIt.next();
        if( component.isRenderable && typeof ( component.getMesh ) === 'function' && component.getMesh() ) {
          component.getMesh().position.set( this.position.x, this.position.y, this.position.z );
          component.getMesh().rotation.set( this.rotation.x, this.rotation.y, this.rotation.z );
          component.getMesh().scale.set( -this.scale.x, this.scale.y, this.scale.z );
          component.visible = this.isVisible;
        }
      }
    };

    // find and return reference to the Game Object with the given id
    GameObject.prototype.find = function( id ) {
      var go;

      if( this.id === id ) {
        return this;
      }

      for( var i = 0, len = this.children.length; i < len; i++ ) {
        go = this.children[ i ].find( id );
        if( go ) {
          return go;
        }
      }

      return null;
    };

    GameObject.prototype.equals = function( go ) {
      return ( go.id === this.id );
    };

    GameObject.prototype.updateAll = function() {
      for( var i = 0, len = this.children.length; i < len; i++ ) {
        this.children[ i ].updateAll();
      }
      this.update();
      this.postUpdate();
    };

    return GameObject;
  }
);