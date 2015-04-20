define( [ 'lib/Three', 'collection/List', 'demo/Navmap' ], function( _Three, _List, _Navmap ) {
  // http://www.policyalmanac.org/games/aStarTutorial.htm

  var AStarNode = function( position, parent, g ) {
    // vector 2 position
    this.position = position;
    // parent index on closed list
    this.parent = ( parent ) ? parent : null;
    // Cost from start to current node
    this.g = ( g ) ? g : 0;
    // Cost from current node to destination(heuristic), Dijkstra uses heuristic value of 0
    this.h = 0;
    // Cost from start to destination going through the current node (g + h)
    this.f = 0;
  };

  AStarNode.prototype.estimate = function( target ) {
    // estimates distance to target node (heuristic)
    if ( target ) {
      // A*
      this.h = Math.sqrt( ( target.position.x - this.position.x ) * ( target.position.x - this.position.x ) + 
                          ( target.position.y - this.position.y ) * ( target.position.y - this.position.y ) );
    } else {
      // Dijkstra
      this.h = 0;
    }

    this.f = this.g + this.h;
  };

  AStarNode.prototype.equals = function( other ) {
    return other && this.position.x === other.position.x && this.position.y === other.position.y;
  };

  var AStar = function( navmap ) {
    this.navmap = navmap;

    // open nodes
    this.open = new _List();
    // processed nodes
    this.closed = new _List();
    // successor nodes. see buildSucessors()
    this.successors = new _List();
  };

  AStar.prototype.searchDijkstra = function( startX, startY ) {
    var startNode = new AStarNode( new THREE.Vector2( startX, startY ) );
    return this._search( startNode, null );
  };

  AStar.prototype.searchAStar = function( startX, startY, targetX, targetY ) {
    var startNode = new AStarNode( new THREE.Vector2( startY, startX ) );
    var targetNode = new AStarNode( new THREE.Vector2( targetY, targetX ) );
    return this._search( startNode, targetNode );
  };

  AStar.prototype._search = function( nodeA, nodeB ) {
    var best_node;
    // iterators
    var it_open = this.open.iterator();
    var it_successors = this.successors.iterator();

    // test the search to find if is inside the limits of given navigation map
    if ( this._insideBoundaries( nodeA, nodeB ) ) {
      // clear buffers
      this.clearLists();
      // estimate cost from the start to finish
      nodeA.estimate( nodeB );
      // add to open list the start node
      this.open.put( nodeA );
      // while open list has nodes to be processed
      while ( it_open.hasNext() ) {
        // find and remove the best open node. On the beginning will be only the start node.
        best_node = this.getBestOpenNode();
        // put the best node on the closed list
        this.closed.put( best_node );
        // test if the best node is the finish node
        if ( best_node.equals( nodeB ) ) {
          // creates the path
          return this.buildPath( best_node );
        } else {
          var inOpen, inClosed;
          var nodeVisited, successor;
          // clear the successors
          this.successors.clear();
          // Construct the list of successor nodes
          this.buildSuccessors( best_node, 5 );
          // point the iterator to the first successor
          it_successors.first();
          // For each node in successors
          while ( it_successors.hasNext() ) {
            successor = it_successors.next();
            inOpen = false;
            inClosed = false;
            nodeVisited = null;
            // Calculate estimated cost to goal
            successor.estimate( nodeB );
            // Test if successor is in open or closed list
            if ( this.open.contains( successor ) ) {
              inOpen = true;
              nodeVisited = successor;
            }
            if ( this.closed.contains( successor ) ) {
              inClosed = true;
              nodeVisited = successor;
            }
            // if the node is not on open list and not in closed list, or visited node cost from start to current node(G)
            // is greater than the new node, the found node is better than the old and should replace it.
            if ( nodeVisited === null || nodeVisited.f >= successor.f ) {
              // if node exists, remove it from open or closed lists
              if ( inOpen )
                this.open.remove( this.open.indexOf( nodeVisited ) );
              if ( inClosed )
                this.closed.remove( this.closed.indexOf( nodeVisited ) );
              // put the new found node on the open list
              this.open.put( successor );
            }
          } // while
          this.successors.clear();
        } // if (goal)
      } // while
    } // if (boundaries)

    // Returns null with no found path.
    // In case of Dijkstra, the target node does not exist, is creates a quick reference graph for the whole navigation
    // map on the closed list. Once done, just use findPath( rowOnNavMap, colOnNavMap ) to get a list containing the
    // desired path
    return null;
  };

  AStar.prototype.print = function( path ) {
    var line = "";

    for ( var i = 0; i < this.navmap.rows; i++ ) {
      for ( var j = 0; j < this.navmap.cols; j++ ) {
        line += ( this.findNode( path, i, j ) ) ? " * " : ( this.navmap.isWall( i, j ) ) ? " | " : " . ";
      }
      console.log( line );
      line = "";
    }
  };

  AStar.prototype.findNode = function( list, x, y ) {
    var it = list.iterator();
    var node;

    while ( it.hasNext() ) {
      node = it.next();
      if ( node.position.x === x && node.position.y === y )
        return node;
    }

    return null;
  };

  AStar.prototype.getBestOpenNode = function() {
    var it = this.open.iterator();
    var node = it.first();
    var min = Number.MAX_VALUE;
    var best_node = null;

    while ( it.hasNext() ) {
      node = it.next();
      if ( node.f < min ) {
        min = node.f;
        best_node = node;
      }
    }

    console.log( "nodeX: " + best_node.position.x + " nodeY:" + best_node.position.y + " nodeF " + best_node.f );
    this.open.remove( this.open.indexOf( best_node ) );

    return best_node;
  };

  // Dijkstra only
  AStar.prototype.findPath = function( x, y ) {
    var it = this.closed.iterator();
    var node;

    while ( it.hasNext() ) {
      node = it.next();
      if ( node.position.x === x && node.position.y === y ) {
        return this.buildPath( node );
      }
    }

    return new List();
  };

  AStar.prototype.buildPath = function( node ) {
    var path = [];

    path.push( node );
    while ( node.parent ) {
      node = this.closed.get( node.parent );
      path.unshift( node );
    }
    return new _List( path );
  };

  // fills the successors with the N neighbors of a given node.
  // 8 for all neighbors
  AStar.prototype.buildSuccessors = function( node, neighbors ) {
    var newNode;
    var parent = ( node.parent ) ? this.closed[ node.parent ] : null;

    var x = node.position.x;
    var y = node.position.y;
    var px, py;
    var ini = 0;
    var fim = 8;
    var i;
    var pos = [];

    pos = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ], [ 1, -1 ], [ 0, -1 ], [ -1, -1 ], [ -1, 0 ], [ -1, 1 ], 
            [ 0, 1 ], [ 1, 1 ], [ 1, 0 ], [ 1, -1 ], [ 0, -1 ], [ -1, -1 ] ];

    if ( parent && neighbors < 8 ) {
      // find the parent node based on this node
      for ( i = 0; i < 8; i++ )
        if ( pos[ i ][ 0 ] === ( parent.position.x - x ) && pos[ i ][ 1 ] === ( parent.position.y - y ) )
          break;
      if ( neighbors === 5 )
        ini = i + 2;
      else if ( neighbors === 3 )
        ini = i + 3;
      fim = ini + neighbors;
    }

    for ( i = ini; i < fim; i++ ) {
      px = x + pos[ i ][ 0 ];
      py = y + pos[ i ][ 1 ];

      if ( px >= 0 && py >= 0 && px < this.navmap.cols && py < this.navmap.rows ) {
        // avoid walls
        if ( !this.navmap.isWall( px, py ) ) {
          // cost from the start node to this node
          g = node.g + this.navmap.getCost( x, y, px, py );
          // all successors point to parent node, used to rebuild the path
          newNode = new AStarNode( new THREE.Vector2( px, py ), this.closed.indexOf( node ), parseFloat( g ) );
          // console.log("successor of ("+ node.position.getX() + ", " + node.position.getY() +") -> (" + px + ", "+ py + ") cost:" + g );
          this.successors.put( newNode );
        }

      }
    }
    // console.log( "successors: " + this.successors.size() );
  };

  AStar.prototype._insideBoundaries = function( nodeA, nodeB ) {
    if ( nodeA.position.x > this.navmap.cols || nodeA.position.x < 0 || nodeA.position.y > this.navmap.rows || nodeA.position.y < 0 )
      return false;

    if ( nodeB )
      if ( nodeB.position.x > this.navmap.cols || nodeB.position.x < 0 || nodeB.position.y > this.navmap.rows || nodeB.position.y < 0 )
        return false;

    return true;
  };

  AStar.prototype.clearLists = function() {
    this.open.clear();
    this.closed.clear();
    this.successors.clear();
  };

  return AStar;
} );