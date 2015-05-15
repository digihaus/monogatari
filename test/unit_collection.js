require(
  [ 'collection/List' ], function( List ) {
    var list = new List();
    list.put( 'A' );
    list.put( 'B' );
    list.put( 'C' );
    list.put( 'D' );
    list.put( 'E' );
    assert( list.size() === 5, 'List size', 'collection', list );
    assert( list.get( 2 ) === 'C', 'List put/get', 'collection' );
    var iter = list.iterator();
    assert( iter.last() === 'E', 'List iterator.last', 'collection' );
    list.clear();
    assert( list.isEmpty(), 'List clear/isEmpty', 'collection' );
  }
);

require(
  [ 'collection/Map' ], function( Map ) {
    var m = new Map();
    m.put( 'bolovo', 'oromio' );
    assert( m.get( 'bolovo' ) == 'oromio', 'Map put/get', 'collection', m );
    assert( m.get( 'test' ) == undefined, 'Map get undefined', 'collection' );
  }
);

require(
  [ 'collection/Tree' ], function( Tree ) {
    var tree = new Tree();
    var elem0_1 = 'elem0_1';
    var elem0_2 = 'elem0_2';
    var elem1_1 = 'elem1_1';
    tree.put( elem0_1 );
    tree.put( elem0_2 );
    tree.put( elem1_1, elem0_1 );
    assert( tree, 'Tree created', 'collection/Tree', tree );
    var descendants = tree.listDescendants( elem0_1 );
    assert( descendants.length == 1, 'Tree descendants', 'collection/Tree', descendants );
    tree.remove( elem1_1 );
    descendants = tree.listDescendants( elem0_1 );
    assert( descendants.length == 0, 'Tree remove', 'collection/Tree', descendants );
  }
);
