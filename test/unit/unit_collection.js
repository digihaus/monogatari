require(
  [ 'collection/List' ], function( List ) {
    QUnit.test(
      'collection/List', function( assert ) {
        var list = new List();
        list.put( 'A' );
        list.put( 'B' );
        list.put( 'C' );
        list.put( 'D' );
        list.put( 'E' );
        assert.ok( list.size() === 5, 'List size after insert passed.' );
        assert.ok( list.get( 2 ) === 'C', 'List put/get passed.' );
        var iter = list.iterator();
        assert.ok( iter.last() === 'E', 'List iterator.last passed.' );
        list.clear();
        assert.ok( list.isEmpty(), 'List clear/isEmpty passed.' );
      }
    );
  }
);

require(
  [ 'collection/Map' ], function( Map ) {
    QUnit.test(
      'collection/Map', function( assert ) {
        var m = new Map();
        m.put( 'bolovo', 'oromio' );
        assert.ok( m.get( 'bolovo' ) == 'oromio', 'Map put/get passed.' );
        assert.ok( m.get( 'test' ) == undefined, 'Map get undefined passed.' );
      }
    );
  }
);

require(
  [ 'collection/Tree' ], function( Tree ) {
    QUnit.test(
      'collection/Tree', function( assert ) {
        var tree = new Tree();
        var elem0_1 = 'elem0_1';
        var elem0_2 = 'elem0_2';
        var elem1_1 = 'elem1_1';
        tree.put( elem0_1 );
        tree.put( elem0_2 );
        tree.put( elem1_1, elem0_1 );
        assert.ok( tree, 'Tree creation passed.' );
        var descendants = tree.listDescendants( elem0_1 );
        assert.ok( descendants.length == 1, 'Tree descendants listing passed.' );
        tree.remove( elem1_1 );
        descendants = tree.listDescendants( elem0_1 );
        assert.ok( descendants.length == 0, 'Tree remove element passed.' );
      }
    );
  }
);
