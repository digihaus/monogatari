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
    'manager/PhysicsManager',
    'manager/SceneManager',
    'lib/Three'
  ],
  function( Common, Timer, Message, Map, LinkedList, Base, MessageManager, PhysicsManager, SceneManager, _Three ) {

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
     * @class GameObject
     */
    var GameObject = function( id, update, position, rotation, scale ) {

      /**
       * Unique identifier, created automatically.
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @type {String}
       * @name uid
       */
      this.uid = Common.createUniqueId();

      /**
       * The Game Object id, used to recover the GO instance wherever necessary.
       * Recommended to be explicitly set.
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @type {String}
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

      /**
       * Last time this Game Object was updated
       * @memberOf module:core/GameObject~GameObject
       * @instance
       * @type {Number}
       * @name lastUpdate
       */
      this.lastUpdate = 0;

      this.sceneId = SceneManager.DEFAULT_SCENE_ID;

      if( typeof( update ) === 'function' ) {
        this.update = update;
      }
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
      // console.warn( 'Update method is not implemented in GameObject id: ' + this.id );
      // throw new Error( 'Update method is not implemented in GameObject id: ' + this.id );
    };

    /**
     * Method that updates all the components and stores last update time.
     * @method
     * @instance
     * @name postUpdate
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.postUpdate = function() {
      if( this.isActive ) {
        this.updateComponents();
      }
      this.messages.clear();
      this.lastUpdate = Timer.time;
    };

    /**
     * Method that sends a message to another GameObject through the Message protocol
     * @method
     * @instance
     * @name sendMessage
     * @param {String} to Id of the target GameObject
     * @param {String} type A String to identify the type of the message
     * @param {Object} message The message content
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.sendMessage = function( to, type, message ) {
      MessageManager.register( new Message( this.id, to, type, message ) );
    };

    /**
     * Method called by the MessageManager to register messages to this GameObject
     * @method
     * @instance
     * @name receiveMessage
     * @param {Message} message The message object
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.receiveMessage = function( message ) {
      this.messages.put( message );
    };

    /**
     * Calculates rotation based on the reference of the axis attribute
     * @method
     * @instance
     * @name getEulerRotation
     * @return Number
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.getEulerRotation = function() {
      var angle = this.direction.angleTo( this.axis );
      return ( this.direction.y * this.axis.x > this.direction.x * this.axis.y ) ? angle : -angle;
    };

    /**
     * Rotates the Game Object around Z to a target coordinate
     * @method
     * @instance
     * @name lookAt
     * @param {THREE.Vector3} target A Vector3 containing the target position to rotate
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.lookAt = function( target ) {
      this.direction.x = target.x - this.position.x;
      this.direction.y = target.y - this.position.y;
      this.direction.normalize();
      this.rotation.z = this.getEulerRotation();
    };

    /**
     * Rotates the Game Object around Z to a target coordinate
     * @method
     * @instance
     * @name lookAtXY
     * @param {Number} x X coordinate to look at
     * @param {Number} y Y coordinate to look at
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.lookAtXY = function( x, y ) {
      this.direction.x = x - this.position.x;
      this.direction.y = y - this.position.y;
      this.direction.normalize();
      this.rotation.z = this.getEulerRotation();
    };

    /**
     * Calculates rotation around Z based on the reference of the axis attribute and a target Vector3
     * @method
     * @instance
     * @name getEulerRotationToTarget
     * @param {THREE.Vector3} target A Vector3 containing the target position to rotate
     * @return Number
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.getEulerRotationToTarget = function( target ) {
      var direction = this.direction.clone();

      direction.x = target.x - this.position.x;
      direction.y = target.y - this.position.y;

      direction.normalize();

      var angle = direction.angleTo( this.axis );

      return ( direction.y * this.axis.x > direction.x * this.axis.y ) ? angle : -angle;
    };

    /**
     * Put the given component on the Map of components
     * @method
     * @instance
     * @name addComponent
     * @param {Component} component Any valid component
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.addComponent = function( component ) {

      if( component.type === Base.RIGID_BODY ) {
        PhysicsManager.attachToWorld( component );
      }

      this.components.put( component.type, component );
    };

    /**
     * Returns the component of given type from the Map or null if not found
     * @method
     * @instance
     * @name findComponent
     * @param {Number} type Component type constant, as listed on the Base component
     * @return {Component}
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.findComponent = function( type ) {
      return this.components.get( type );
    };

    /**
     * Removes the component of given type from the Map
     * @method
     * @instance
     * @name removeComponent
     * @param {String} type Component type constant, as listed on the Base component
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.removeComponent = function( type ) {
      this.components.remove( type );
    };

    /**
     * Clears the component Map
     * @method
     * @instance
     * @name clearComponents
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.clearComponents = function() {
      this.components.clear();
    };

    /**
     * Checks for a component type on the Map of components
     * @method
     * @instance
     * @name hasComponent Component type constant, as listed on the Base component
     * @param {String} type Component type constant, as listed on the Base component
     * @return boolean
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.hasComponent = function( type ) {
      return ( this.components.contains( type ) ) ? true : false;
    };

    /**
     * Find and return the components that requires rendering
     * @method
     * @instance
     * @name listRenderableComponents
     * @return Array
     * @memberOf module:core/GameObject~GameObject
     */
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

    /**
     * Iterate and update all components. Automatically called from the postUpdate method
     * @method
     * @instance
     * @name updateComponents
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.updateComponents = function() {
      // Updates object position from Box2D to the engine based on physics simulation (if applicable).
      // Only affect X and Y for safety reasons, messing with Z on 2D is probably not expected.
      var rigidBody = this.findComponent( Base.RIGID_BODY );
      if( rigidBody ) {
        this.position.x = rigidBody.body.GetPosition().get_x() * rigidBody.conversionFactor;
        this.position.y = rigidBody.body.GetPosition().get_y() * rigidBody.conversionFactor;
      }

      this.componentsIt.first();
      while( this.componentsIt.hasNext() ) {
        var component = this.componentsIt.next();

        // For renderable components, updates engine transformations to Three.js
        if( component.isRenderable ) {
          if( component.state === Base.STATE_READY ) {
            SceneManager.attachToScene( component, this.sceneId );
            component.setState( Base.STATE_REGISTERED );
          }

          if( component.state === Base.STATE_REGISTERED &&
            typeof ( component.getMesh ) === 'function' &&
            component.getMesh() ) {

            component.getMesh().position.set( this.position.x, this.position.y, this.position.z );
            component.getMesh().rotation.set( this.rotation.x, this.rotation.y, this.rotation.z );
            component.getMesh().scale.set( -this.scale.x, this.scale.y, this.scale.z );
            component.visible = this.isVisible;
          }
        }
        // For components that require an update
        if( typeof( component.update ) === 'function' ) {
          component.update();
        }
      }
    };

    /**
     * Iterate, find (recursively) and return reference to the Game Object with the given id in the children Array.
     * null if not found
     * @method
     * @instance
     * @name find
     * @param {String} id Game Object id
     * @return {GameObject}
     * @memberOf module:core/GameObject~GameObject
     */
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

    GameObject.prototype.findById = function( id ) {
      return this.find( id );
    };

    /**
     * Iterate, find (recursively) and return reference to the Game Object with the given uid in the children Array.
     * null if not found
     * @method
     * @instance
     * @name find
     * @param {Number} uid Game Object numeric unique id
     * @return {GameObject}
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.findByUid = function( uid ) {
      var go;

      if( this.uid === uid ) {
        return this;
      }

      for( var i = 0, len = this.children.length; i < len; i++ ) {
        go = this.children[ i ].findByUid( uid );
        if( go ) {
          return go;
        }
      }

      return null;
    };

    /**
     * Checks for equality with the informed Game Object
     * @method
     * @instance
     * @name equals
     * @param {GameObject} go Other Game Object reference
     * @return boolean
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.equals = function( go ) {
      return ( go.uid === this.uid );
    };

    /**
     * Iterate (recursively) on the children Array, calling update and postUpdate methods for every child and for itself.
     * Automatically called from the main game loop
     * @method
     * @instance
     * @name updateAll
     * @return boolean
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.updateAll = function() {
      for( var i = 0, len = this.children.length; i < len; i++ ) {
        MessageManager.sendMessagesTo( this.children[ i ] );
        this.children[ i ].updateAll();
      }
      this.update();
      this.postUpdate();
    };

    /**
     * Iterate (recursively) on the children Array, destroying every component, child and itself.
     * @method
     * @instance
     * @name destroy
     * @memberOf module:core/GameObject~GameObject
     */
    GameObject.prototype.destroy = function() {
      // iterate through children destroying them
      for( var i = 0, len = this.children.length; i < len; i++ ) {
        this.children[ i ].destroy();
      }
      // iterate components and handle component specific cleanup
      this.componentsIt.first();
      while( this.componentsIt.hasNext() ) {
        var component = this.componentsIt.next();

        // Box2D - RigidBody
        if( component.type === Base.RIGID_BODY ) {
          PhysicsManager.destroyBody( component );
        }

        // Three.js
        if( component.isRenderable && typeof ( component.getMesh ) === 'function' && component.getMesh() ) {
          SceneManager.detachFromScene( component, this.sceneId );
        }

        // Sound.js
        if( component.type === Base.AUDIO_SOURCE ) {
          component.destroy();
        }
      }
    };

    return GameObject;
  }
);