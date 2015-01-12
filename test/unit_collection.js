require( [ 'collection/BaseCollection' ], function( _Collection ) {
  var c = new _Collection( new Array( 'A', 'B', 'C', 'D', 'E' ) );
  
  assert( c.values.length === 5, 'BaseCollection length', 'collection', c );
  assert( !c.isEmpty(), 'BaseCollection is not Empty', 'collection', c );
} );

require( [ 'collection/ArrayList' ], function( _ArrayList ) {
  var a = new _ArrayList();
  a.put('A');
  a.put('B');
  a.put('C');
  a.put('D');
  a.put('E');

  assert( a.size() === 5, 'ArrayList size', 'collection', a);
  assert( a.get( 2 ) === 'C', 'ArrayList put/get', 'collection' );

  var iter = a.iterator();

  assert( iter.last() === 'E', 'ArrayList iterator.last', 'collection' );

  a.clear();

  assert( a.isEmpty(), 'ArrayList clear/isEmpty', 'collection' );
} );

require( [ 'collection/Map' ], function( _Map ) {
  var m = new _Map();

  m.put( 'bolovo', 'oromio' );

  assert( m.get('bolovo') == 'oromio', 'Map put/get', 'collection', m );
  assert( m.get('test') == undefined, 'Map get undefined', 'collection' );
} );
