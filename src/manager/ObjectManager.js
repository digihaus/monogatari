define( [ 'core/GameObject', 'collection/Tree', 'collection/Map', 'component/Base', 'component/Node' ], function( _GameObject, _Tree, _Map, _Base, _Node ) {

  var ObjectManager = function() {
    this.tree = new _Tree();
    this.map = new _Map();
    this.mapIterator = this.map.iterator();
  };

  ObjectManager.prototype.isGameObject = function( object ) {
    return ( object && object.id && object.equals instanceof Function && object.update instanceof Function ) ? true : false;
  }

  ObjectManager.prototype.put = function( object, parent ) {
    if ( this.isGameObject( object ) ) {
      this.tree.put( object, parent );
      return this.map.put( object.id, object );
    }
    return null;
  }

  ObjectManager.prototype.get = function( id ) {
    return this.map.get( id );
  };

  ObjectManager.prototype.size = function() {
    return this.map.size();
  };

  ObjectManager.prototype.remove = function( id ) {
    var data = this.map.get( id );

    if ( data ) {
      this.map.remove( id );
      this.tree.remove( data );
    }
  };

  ObjectManager.prototype.clear = function() {
    this.map.claer();
    this.tree.clear();
  }

  ObjectManager.prototype.update = function() {
    var obj;

    this.mapIterator.first();

    while ( this.mapIterator.hasNext() ) {
      obj = this.mapIterator.next();
      if ( obj && obj.isActive ) {
        obj.update();
      }
      obj.postUpdate();
    }
  }

  ObjectManager.prototype.getGlobalPosition = function() {};
  ObjectManager.prototype.getGlobalRotation = function() {};
  ObjectManager.prototype.getGlobalScale = function() {};
  ObjectManager.prototype.getGlobalNode = function() {};

} );
