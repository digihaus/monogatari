define( [ 'core/Common', 
          'core/Math', 
          'core/Timer', 
          'collection/Map', 
          'component/Base' ], function( _Common, _Math, _Timer, _Map, _Base ) {

  var GameObject = function( id, update, position, rotation, scale ) {
    this.uid = _Common.createUniqueId();
    this.id = id || this.uid;

    this.position = ( position ) ? position : new THREE.Vector3( 0, 0, 0 );
    this.rotation = ( rotation ) ? rotation : new THREE.Vector3( 0, 1, 0 ); // new THREE.Euler()
    this.scale = ( scale ) ? scale : new THREE.Vector3( 1, 1, 1 );

    this.components = new _Map();
    this.componentsIt = this.components.iterator();

    this.children = [];

    this.isVisible = true;
    this.isActive = true;

    this.lastUpdate = 0;

    this.update = ( update && typeof ( update ) === 'function' ) ? update : function() {};
  };

  GameObject.prototype.postUpdate = function() {
    //this.lastUpdate = _Timer.getTime();
    if( this.isActive ) {
      this.updateComponents();
    }
  };

  GameObject.prototype.getEulerRotation = function( axis ) {
    var a = ( axis ) ? axis : _Math.getYAlignedVector();
    var angle = this.rotation.angleTo( a );
    return ( this.rotation.y * a.x > this.rotation.x * a.y ) ? -angle : angle;
  },

  GameObject.prototype.getEulerRotationToTarget = function( target, axis ) {
    var position = this.position.clone();
    var rotation = this.rotation.clone();

    position.y = - position.y;
    rotation = target.sub( position );
    rotation.normalize();

    var a = ( axis ) ? axis : _Math.getYAlignedVector();
    var angle = rotation.angleTo( a );

    return ( rotation.y * a.x > rotation.x * a.y ) ? -angle : angle;
  };

  GameObject.prototype.addComponent = function( component ) {
    this.components.put( component.componentType, component );
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
    while ( this.componentsIt.hasNext() ) {
      c = this.componentsIt.next();
      if ( c.isRenderable ) {
        list.push( c );
      }
    }
    return list;
  };

  GameObject.prototype.lookAt = function( target ) {
    this.rotation.z  = this.getEulerRotationToTarget( target );
  };

  GameObject.prototype.updateComponents = function() {
    var rigidBody = this.findComponent( _Base.RIGID_BODY );

    // update object position from Box2D to Monogatari based on physics simulation (if applicable)
    // only affect X and Y for safety reasons, messing with Z on 2D is probably not expected
    if( rigidBody ) {
      this.position.x = rigidBody.body.GetPosition().x * rigidBody.conversionFactor;
      this.position.y = rigidBody.body.GetPosition().y * rigidBody.conversionFactor;
    }

    var component;

    this.componentsIt.first();
    while ( this.componentsIt.hasNext() ) {
      component = this.componentsIt.next();
      // if is a component to be rendered, need to update engine transformations to Three.js transformations
      if ( component.isRenderable && typeof ( component.getMesh ) === 'function' ) {
        component.getMesh().position.set( this.position.x, this.position.y, this.position.z);
        component.getMesh().rotation.z = this.rotation.z;
        component.getMesh().scale.set( this.scale.x, this.scale.y, this.scale.z);
      }
    }
  };

  GameObject.prototype.equals = function( go ) {
    return ( go.id === this.id ) ? true : false;
  };

  GameObject.prototype.updateAll = function() {

    for( var i = 0, len = this.children.length; i < len; i++){
      this.children[i].updateAll();
    }

    this.update();
    this.postUpdate();
  };

  return GameObject;

} );
