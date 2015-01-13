define( [ 'core/Common' ], function( _Common ) {

  var TreeNode = function( data, parent ) {
    this.data = data;
    this.parent = parent;
    this.children = [];
  };

  var Tree = function() {
    this.root = new TreeNode( 'root' );
  };

  Tree.prototype.find = function ( data, startNode ) {
    var sNode = startNode ? startNode : this.root;
    return this.findAux( data, sNode );
  };

  Tree.prototype.findAux = function( data, currentNode ) {
    if( _Common.equals( data, currentNode.data ) ) {
      return currentNode;
    } else {
      for( var i = 0; i < currentNode.children.length; i++ ) {
        var result = this.findAux( data, currentNode.children[i] );
        if( result ) {
          return result;
        }
      }
      return null;
    }
  };

  Tree.prototype.put = function( data, parent ) {
    var pNode;
    if( parent ) {
      pNode = this.find( parent );
    }
    pNode = pNode ? pNode : this.root;
    pNode.children.push( new TreeNode( data, pNode ) );
  };

  Tree.prototype.remove = function( data ) {
    var node = this.find( data );
    if( node ) {
      // remove reference from parent children
      var children = node.parent.children;
      var index;
      for( var i = 0; i < children.length; i++ ) {
        if( _Common.equals( children.length[i], data ) ) {
          index = i;
        }
      }
      node.parent.children = children.splice( index, 1 );
      // remove own references
      node.parent = null;
      node.children.length = 0;
    }
  };

  Tree.prototype.clear = function() {
    this.root.children.length = 0;
  };

  Tree.prototype.move = function( data, parent ) {
    remove( data );
    put( data, parent );
  };

  Tree.prototype.listChildren = function( data ) {
    var node = this.find( data );
    if( node ) {
      return node.children;
    } else {
      return null;
    }
  };

  Tree.prototype.listDescendants = function( data ) {
    var node = this.find( data );
    if( node ) {
      return this.listDescendantsAux( node, [] );
    } else {
      return null;
    }
  }

  Tree.prototype.listDescendantsAux = function( node, result ) {
    result.push( node );
    for( var i = 0; i < node.children.length; i++ ) {
      result = this.listDescendantsAux( node.children[i], result );
    }
    return result;
  }


  return Tree;

} );
