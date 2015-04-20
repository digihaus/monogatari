define( function() {

  var Navmap = function( map, wall ) {
    this.map = ( map ) ? map : [];
    this.wall = ( wall ) ? wall : 9;
    this.rows = this.map.length;
    this.cols = this.map[ 0 ].length;
  };

  Navmap.prototype.isWall = function( x, y ) {
    return ( this.map[ x ][ y ] === this.wall ) ? true : false;
  };

  Navmap.prototype.setValue = function( x, y, value ) {
    this.map[ x ][ y ] = value;
  };

  Navmap.prototype.getCost = function( fromX, fromY, toX, toY ) {
    var cost = Math.abs( ( this.map[ fromX ][ fromY ] - this.map[ toX ][ toY ] ) );

    if ( fromX === toX || fromY === toY )
      // if is a strait line (horizontal or vertical)
      cost += 1.0;
    else
      // diagonal euclidean distance
      cost += 1.41421356237;

    return cost;
  };

  Navmap.prototype.getRow = function( row ) {
    return this.map[ row ];
  };

  Navmap.prototype.getCol = function( col ) {
    var a = new Array();
    for ( var i = 0, len = this.map.length; i < len; i++ )
      a.push( this.map[ i ][ col ] );

    return a;
  };

  Navmap.prototype.getNeighbors = function( x, y ) {
    var a = new Array();
    var pos = new Array();

    pos = [ [ 1, 1 ], [ 1, 0 ], [ 1, -1 ], [ 0, -1 ], [ -1, -1 ], [ -1, 0 ], [ -1, 1 ], [ 0, -1 ] ];

    for ( var i = 0; i < 8; i++ )
      if ( x - pos[ i ][ 0 ] >= 0 && pos[ i ][ 1 ] >= 0 && pos[ i ][ 0 ] < this.cols && pos[ i ][ 1 ] < this.rows )
        a.push( this.map[ x - pos[ i ][ 0 ] ][ y - pos[ i ][ 1 ] ] );

    return a;
  };

  return Navmap;
} );
