define( [ 'core/Common', 'core/Timer', 'collection/Map', 'component/Base', 'component/Node'  ], function( _Common, _Timer, _Map, _Base, _Node ) {

  var GameObject = function( id, update ) {
    this.uid = _Common.createUniqueId();
    this.id = id || this.uid;

    this.components = new _Map();
    // by default, every Game Object has a Node component (position, rotation, scale)
    this.components.put( _Base.NODE, new _Node() );
    
    this.componentsIter = this.components.iterator();

    this.isVisible = true;
    this.isActive = true;

    this.lastUpdate = 0;

    this.update = ( update && typeof ( update ) === 'function' ) ? update : function() {};
  };

  GameObject.prototype.postUpdate = function() {
    this.lastUpdate = _Timer.getTime();
    if( this.isActive ) {
      this.updateComponents();
    }
  };

  GameObject.prototype.addComponent = function( component ) {
    this.checkComponent( component );
    return this.components.put( component.componentType, component );
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
    componentsIter.first();
    while ( componentsIter.hasNext() ) {
      c = componentsIter.next();
      if ( c.isRenderable ) {
        list.push( c );
      }
    }
    return list;
  };

  GameObject.prototype.updateComponents = function() {
    var node = this.findComponent( _Base.NODE );
    var rigidBody = this.findComponent( _Base.RIGID_BODY );

    // update object position from Box2D to Monogatari based on physics simulation (if applicable)
    // only affect X and Y for safety reasons, messing with Z on 2D is probably not expected
    if( rigidBody ) {
      node.position.x = rigidBody.body.GetPosition().x * rigidBody.conversionFactor;
      node.position.y = rigidBody.body.GetPosition().y * rigidBody.conversionFactor;
    }

    var component;

    this.componentIter.first();
    while ( this.componentsIter.hasNext() ) {
      component = this.componentsIter.next();
      // if is a component to be rendered, need to update engine transformations to Three.js transformations
      if ( component.isRenderable && typeof ( component.getMesh ) === 'function' ) {
        component.getMesh().position = node.position;
        component.getMesh().rotation.z = node.getEulerRotation();
        component.getMesh().scale = node.scale;
      }
    }
  };

  GameObject.prototype.equals = function( go ) {
    return ( go.id === this.id ) ? true : false;
  };

  GameObject.prototype.setPosition = function( x, y, z ) {
    this.findComponent( _Base.NODE ).position.set( x, y, z );
  };

  GameObject.prototype.setRotation = function( x, y, z ) {
    this.findComponent( _Base.NODE ).rotation.set( x, y, z );
  };

  GameObject.prototype.setScale = function( x, y, z ) {
    this.findComponent( _Base.NODE ).scale.set( x, y, z );
  };

  return GameObject;

} );
