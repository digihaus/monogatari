//Árvore permite que cada nó possua apenas um pai, porém N filhos.
//Cada nó conhece seu pai (para navegar de baixo pra cima), e seus filhos (caso se aplique, para navegar de cima pra baixo).
//Para criar a hierarquia liga-se um nó a outro com um método connect(), Ex. tree.connect(pai, filho)
define( [ 'core/Monogatari', 'core/collection/Map' ], function() {
  Monogatari.Tree = Monogatari.Map.extend( {
    init : function() {
      this._depth = 1;
      this._super();

      // add trunk node
      this._keys.push( 'trunk' );
      this._values[ 'trunk' ] = new Monogatari.TreeNode( null, 'root', 1 );
    },

    put : function( key, value ) {
      var k = key || this.size();

      if ( !this.contains( k ) )
        this._keys.push( k );

      this._values[ k ] = new Monogatari.TreeNode( value, 'trunk', this._depth );

      return this._values[ k ];
    },

    isEmpty : function() {
      return ( this.size() === 0 );
    },

    getDepth : function() {
      return this._depth;
    },

    remove : function( id ) {
      if ( id != 'trunk' && this.contains( id ) ) {
        var node = this.get( id ), parent = this.get( node.parent );

        if ( parent.id != 'trunk' )
          this.disconnect( id );

        if ( typeof node.value.reset === "function" )
          node.value.reset();

        // remove the key
        for ( var i = 0, len = this._keys.length; i < len; i++ )
          if ( this._keys[ i ] === id )
            this._keys.splice( i, 1 );
      }
    },

    removeFromCache : function( id ) {
      if ( id != 'trunk' && this.contains( id ) ) {
        var node = this.get( id ), parent = this.get( node.parent );

        if ( parent.id != 'trunk' )
          this.disconnect( id );

        // set null to avoid circle references
        this._values[ id ] = null;

        // remove the item
        delete this._values[ id ];

        // remove the key
        for ( var i = 0, len = this._keys.length; i < len; i++ )
          if ( this._keys[ i ] === id )
            this._keys.splice( i, 1 );
      }
    },

    clear : function() {
      this._values.length = 0;
      this._values = {};
      this._keys.length = 0;
      this._depth = 1;
    },

    connect : function( parentId, childId ) {
      if ( this.contains( parentId ) && this.contains( childId ) ) {
        var p = this.get( parentId ), c = this.get( childId );

        c.parent = parentId;
        c.order = p.order + 1;
        p.children.push( childId );

        if ( this._depth < c.order )
          this._depth = c.order;
      }
    },

    disconnect : function( nodeId ) {
      var node = this.get( nodeId ), parent = this.get( node.parent ), index = ( parent.children.length > 0 ) ? Monogatari.Array.inArray(
          parent.children, nodeId ) : -1;

      if ( index > -1 )
        Monogatari.Array.remove( parent.children, index );

      node.parent = 'trunk';
      node.order = 1;
    },

    listAncestors : function( id, maxDepth ) {
      var result = new Array(), node = this.get( id ), d = maxDepth || this._depth;

      for ( var i = 0; i < d; i++ ) {
        if ( node.parent ) {
          result.push( node.parent );
          node = this.get( node.parent );
        }
      }

      result.reverse();
      return result;
    },

    listSuccessors : function( id ) {
      var result = new Array(), node = this.get( id ), child = null;

      if ( node ) {
        for ( var i = 0, len = node.children.length; i < len; i++ ) {
          child = this.get( node.children[ i ] );

          if ( child ) {
            if ( child.children.length > 0 )
              result.concat( this.getSuccessors( node.children[ i ] ) );

            result.push( node.children[ i ] );
          }

        }
      }

      return result;
    },

    hasChildren : function( id ) {
      var node = this.get( id );
      return ( node && node.children.length > 0 ) ? true : false;
    },

    isChildOf : function( id, parentId ) {
      var node = this.get( id );

      for ( var i = 0; i < this._depth; i++ ) {
        if ( node.parent ) {
          if ( node.parent == parentId )
            return true;

          node = this.get( node.parent );
        }
      }
      return false;
    },

    listChildrenOf : function( id ) {
      var result = new Array(), node = this.get( id ), child = null;

      if ( node ) {
        for ( var i = 0, len = node.children.length; i < len; i++ ) {
          child = this.get( node.children[ i ] );

          if ( child )
            result.push( child );
        }
      }

      return result;
    },

    listChildrenValuesOf : function( id ) {
      var result = new Array(), node = this.get( id ), child = null;

      if ( node ) {
        for ( var i = 0, len = node.children.length; i < len; i++ ) {
          child = this.get( node.children[ i ] );

          if ( child )
            result.push( child.value );
        }
      }

      return result;
    },

    // expensive function, use carefully depending on your tree!
    isParentOf : function( id, childId ) {
      var result = false, node = this.get( id );

      if ( node ) {
        for ( var i = 0, len = node.children.length; i < len; i++ ) {
          if ( childId == node.children[ i ] )
            return true;

          // recovers children recursively
          result = this.isParentOf( node.children[ i ], childId );
        }
      }

      return result;
    },

    getParentOf : function( id ) {
      var node = this.get( id );
      return ( node && this.get( node.parent ) ) ? node.parent : null;
    },

    iterator : function() {
      return new Monogatari.TreeIterator( this._keys, this._values );
    },

    nodeIterator : function() {
      return new Monogatari.MapIterator( this._keys, this._values );
    }
  } );

  Monogatari.TreeNode = function( value, parent, order ) {
    this.value = ( value ) ? value : null;
    this.parent = ( parent ) ? parent : 'trunk';
    this.children = new Array();
    this.order = ( order ) ? order : 1;
  };

} );