define( [ 'core/Monogatari', 'core/collection/Tree', 'entity/GameObject', 'entity/component/Node' ], function() {

  function MonogatariObjectManager() {
    this._objects = new Monogatari.Tree();
    this._iterator = this._objects.iterator();
  }

  MonogatariObjectManager.prototype.add = function( object ) {
    return this._objects.put( object.id, object ).value;
  };

  MonogatariObjectManager.prototype.create = function( id, update ) {
    var object = new Monogatari.GameObject( id, update );
    // by default, every Game Object has a Node component (position, rotation, scale)
    object.addComponent( new Monogatari.Node() );
    return this._objects.put( id, object ).value;
  };

  MonogatariObjectManager.prototype.get = function( id ) {
    if ( this._objects.contains( id ) ) {
      return this._objects.get( id ).value;
    } else {
      return null;
    }
  };

  MonogatariObjectManager.prototype.getObjectIterator = function() {
    return this._objects.iterator();
  };

  MonogatariObjectManager.prototype.size = function() {
    return this._objects.size();
  };

  MonogatariObjectManager.prototype.remove = function( id ) {
    return this._objects.remove( id ).value;
  };

  MonogatariObjectManager.prototype.hasChildren = function( id ) {
    return this._objects.hasChildren( id );
  };

  MonogatariObjectManager.prototype.isChildOf = function( id, parentId ) {
    return this._objects.isChildOf( id, parentId );
  };

  MonogatariObjectManager.prototype.listChildrenOf = function( id ) {
    return this._objects.listChildrenOf( id );
  };

  MonogatariObjectManager.prototype.listChildrenValuesOf = function( id ) {
    return this._objects.listChildrenValuesOf( id );
  };

  MonogatariObjectManager.prototype.isParentOf = function( id, childId ) {
    return this._objects.isParentOf( id, childId );
  };

  MonogatariObjectManager.prototype.connect = function( parentId, childId ) {
    this._objects.connect( parentId, childId );
  };

  MonogatariObjectManager.prototype.disconnect = function( id ) {
    this._objects.disconnect( id );
  };

  MonogatariObjectManager.prototype.listAncestors = function( id ) {
    return this._objects.listAncestors( id );
  };

  MonogatariObjectManager.prototype.listSuccessors = function( id ) {
    return this._objects.listSuccessors( id );
  };

  // array containing all game objects ids
  MonogatariObjectManager.prototype.listIds = function() {
    return this._objects.getKeys();
  };

  MonogatariObjectManager.prototype.toJSON = function() {};

  // array containing all game objects ids with components of given type
  MonogatariObjectManager.prototype.listIdsByComponentType = function( type ) {
    var list = [], obj;

    this._iterator.first();

    while ( this._iterator.hasNext() ) {
      obj = this._iterator.next();

      if ( obj && obj.hasComponent( type ) ) {
        list.push( obj.id );
      }
    }

    return list;
  };

  MonogatariObjectManager.prototype.update = function() {
    var obj;

    this._iterator.first();

    while ( this._iterator.hasNext() ) {
      obj = this._iterator.next();
      if ( obj && obj.isActive ) {
        obj.update();
        obj.postUpdate();
      }
    }
  };

  // leaks?
  MonogatariObjectManager.prototype.getGlobalPosition = function( id ) {
    if ( this._objects.contains( id ) ) {
      if ( this._objects.get( id ).parent === 'trunk' ) {
        return this._objects.get( id ).value.findComponent( Monogatari.Constants.COMPONENT_NODE ).position;
      } else {
        var parentPosition = Monogatari.ObjectManager.getGlobalPosition( this._objects.get( id ).parent );
        var position = this._objects.get( id ).value.findComponent( Monogatari.Constants.COMPONENT_NODE ).position.clone();

        position.add( parentPosition.getX(), parentPosition.getY(), parentPosition.getZ() );

        return position;
      }
    }
    return null;
  };

  // leaks?
  MonogatariObjectManager.prototype.getGlobalRotation = function( id ) {
    if ( this._objects.contains( id ) ) {
      if ( this._objects.get( id ).parent === 'trunk' ) {
        return this._objects.get( id ).value.findComponent( Monogatari.Constants.COMPONENT_NODE ).rotation;
      } else {
        var parentRotation = Monogatari.ObjectManager.getGlobalRotation( this._objects.get( id ).parent );
        var rotation = this._objects.get( id ).value.findComponent( Monogatari.Constants.COMPONENT_NODE ).rotation.clone();

        rotation.add( parentRotation.getX(), parentRotation.getY(), parentRotation.getZ() );

        return rotation;
      }
    }
    return null;
  };

  // leaks?
  MonogatariObjectManager.prototype.getGlobalScale = function( id ) {
    if ( this._objects.contains( id ) ) {
      if ( this._objects.get( id ).parent === 'trunk' ) {
        return this._objects.get( id ).value.findComponent( Monogatari.Constants.COMPONENT_NODE ).scale;
      } else {
        var parentScale = Monogatari.ObjectManager.getGlobalScale( this._objects.get( id ).parent );
        var scale = this._objects.get( id ).value.findComponent( Monogatari.Constants.COMPONENT_NODE ).scale.clone();

        scale.add( parentScale.getX(), parentScale.getY(), parentScale.getZ() );

        return scale;
      }
    }
    return null;
  };

  // leaks?
  MonogatariObjectManager.prototype.getGlobalNode = function( id ) {
    if ( this._objects.contains( id ) ) {
      if ( this._objects.get( id ).parent === 'trunk' ) {
        return this._objects.get( id ).value.findComponent( Monogatari.Constants.COMPONENT_NODE ).scale;
      } else {
        var parentNode = Monogatari.ObjectManager.getGlobalNode( this._objects.get( id ).parent ),
            node = new Monogatari.Node( this._objects.get( id ).value.findComponent( Monogatari.Constants.COMPONENT_NODE ).position.clone(),
                                        this._objects.get( id ).value.findComponent( Monogatari.Constants.COMPONENT_NODE ).rotation.clone(),
                                        this._objects.get( id ).value.findComponent( Monogatari.Constants.COMPONENT_NODE ).scale.clone() );

        node.position.add( parentNode.position.getX(), parentNode.position.getY(), parentNode.position.getZ() );
        node.rotation.add( parentNode.rotation.getX(), parentNode.rotation.getY(), parentNode.rotation.getZ() );
        node.scale.add( parentNode.scale.getX(), parentNode.scale.getY(), parentNode.scale.getZ() );

        return node;
      }
    }
    return null;
  };

  Monogatari.ObjectManager = new MonogatariObjectManager();

} );
