define(['core/Monogatari', 'core/Constants', 'core/Timer', 'core/Util', 'lib/Three', 'engine/SceneManager'], function() {

  Monogatari.GameObject = Class.extend( {
    init : function( id, update ) {
    this._components = new Monogatari.Map();
    this._componentIterator = this._components.iterator();

    this.isVisible = true;
    this.isActive = true;

    this._isRenderable = false;
    this._hasPhysics = false;

    this.uid = Monogatari.Util.createUniqueId();
    this.id = id || this.uid;

    this.lastUpdate = 0;

    this.update = ( update && typeof ( update ) === "function" ) ? update : function() {};
    },

    postUpdate : function() {
    this.lastUpdate = Monogatari.Time.getTime();
    this.updateComponents();
    },

    addComponent : function( component ) {
    this.checkComponent( component );
    return this._components.put( component.componentType, component );
    },

    checkComponent : function( component ) {
    if ( component.componentType && component.componentType === Monogatari.Constants.COMPONENT_RIGID_BODY )
      this._hasPhysics = true;

    if ( component.componentType === Monogatari.Constants.COMPONENT_THREE_OBJECT 
      || component.componentType === Monogatari.Constants.COMPONENT_SPRITE
      || component.componentType === Monogatari.Constants.COMPONENT_PARTICLE_EMITTER
      || component.componentType === Monogatari.Constants.COMPONENT_STATIC_TEXT )
      this._isRenderable = true;
    },

    findComponent : function( type ) {
    return this._components.get( type );
    },

    removeComponent : function( id ) {
    this._components.remove( id );
    },

    clearComponents : function() {
    this._isRenderable = false;
    this._hasPhysics = false;
    this._components.clear();
    },

    // deprecated
    findComponentByType : function( type ) {
    var comp;

    this._componentIterator.first();

    while ( this._componentIterator.hasNext() ) {
      comp = this._componentIterator.next();
      if ( comp.componentType === type )
      return comp;
    }
    return null;
    },

    hasComponent : function( type ) {
    return ( this._components.contains( type ) ) ? true : false;
    },

    listComponentsToRender : function() {
    var list = new Array(), comp;

    this._componentIterator.first();

    while ( this._componentIterator.hasNext() ) {
      comp = this._componentIterator.next();
      if ( comp.componentType === Monogatari.Constants.COMPONENT_THREE_OBJECT 
        || comp.componentType === Monogatari.Constants.COMPONENT_SPRITE
        || comp.componentType === Monogatari.Constants.COMPONENT_STATIC_TEXT )
      list[ list.length ] = comp;
    }
    return list;
    },

    updateComponents : function() {
    var comp,
        node = this.findComponent( Monogatari.Constants.COMPONENT_NODE );

    // update object position from Box2D to Monogatari based on physics simulation (if applicable)
    // only affect X and Y for safety reasons, messing with Z on 2D is probably not expected
    if ( this._hasPhysics ) {
      var rigidBody = this.findComponentByType( Monogatari.Constants.COMPONENT_RIGID_BODY );
      node.position.x = rigidBody.body.GetPosition().x * rigidBody.conversionFactor;
      node.position.y = rigidBody.body.GetPosition().y * rigidBody.conversionFactor;
    }

    this._componentIterator.first();

    while ( this._componentIterator.hasNext() ) {
      comp = this._componentIterator.next();

      // if is a component to be rendered, need to update engine transformations to Three.js transformations
      if ( this._isRenderable ) {
      if ( typeof ( comp.getMesh ) === 'function' && comp.getMesh() ) {
        comp.getMesh().position = node.position;
        comp.getMesh().rotation.z = node.getEulerRotation();
        comp.getMesh().scale = node.scale;
      }
      }

      if ( typeof ( comp.update ) === 'function' )
      comp.update();
    }
    },

    equals : function( go ) {
    return ( go.id === this.id ) ? true : false;
    },

    setPosition : function( x, y, z ) {
    this.findComponent( Monogatari.Constants.COMPONENT_NODE ).position.set( x, y, z );
    },

    setRotation : function( x, y, z ) {
    this.findComponent( Monogatari.Constants.COMPONENT_NODE ).rotation.set( x, y, z );
    },

    setScale : function( x, y, z ) {
    this.findComponent( Monogatari.Constants.COMPONENT_NODE ).scale.set( x, y, z );
    },

    toJSON : function() {}
  } );
});
