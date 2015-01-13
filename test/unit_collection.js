require( [ 'collection/List' ], function( _List ) {
  var a = new _List();
  a.put('A');
  a.put('B');
  a.put('C');
  a.put('D');
  a.put('E');

  assert( a.size() === 5, 'List size', 'collection', a);
  assert( a.get( 2 ) === 'C', 'List put/get', 'collection' );

  var iter = a.iterator();

  assert( iter.last() === 'E', 'List iterator.last', 'collection' );

  a.clear();

  assert( a.isEmpty(), 'List clear/isEmpty', 'collection' );
} );

require( [ 'collection/Map' ], function( _Map ) {
  var m = new _Map();

  m.put( 'bolovo', 'oromio' );

  assert( m.get('bolovo') == 'oromio', 'Map put/get', 'collection', m );
  assert( m.get('test') == undefined, 'Map get undefined', 'collection' );
} );

require( [ 'collection/Tree' ], function( _Tree ) {
  var tree = new _Tree();

  var elem0_1 = 'elem0_1';
  var elem0_2 = 'elem0_2';

  tree.put( elem0_1 );
  tree.put( elem0_2 );

  var elem1_1 = 'elem1_1';

  tree.put( elem1_1, elem0_1 );

  assert( tree, 'Tree created', 'collection/Tree', tree );

  var descendants = tree.listDescendants( elem0_1 );

  assert( descendants.length == 2, 'Tree descendants', 'collection/Tree', descendants );

  tree.remove( elem1_1 );

  descendants = tree.listDescendants( elem0_1 );

  assert( descendants.length ==1, 'Tree remove', 'collection/Tree', descendants );

} );
