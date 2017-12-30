QUnit.test(
  'collection/List', function( assert ) {
    var list = new m.List();
    list.put( 'A' );
    list.put( 'B' );
    list.put( 'C' );
    list.put( 'D' );
    list.put( 'E' );
    assert.ok( list.size() === 5, 'List size after insert' );
    assert.ok( list.get( 2 ) === 'C', 'List put/get' );
    var iter = list.iterator();
    assert.ok( iter.last() === 'E', 'List iterator.last' );
    list.clear();
    assert.ok( list.isEmpty(), 'List clear/isEmpty' );
  }
);

QUnit.test(
  'collection/Map', function( assert ) {
    var map = new m.Map();
    map.put( 'bolovo', 'oromio' );
    assert.ok( map.get( 'bolovo' ) == 'oromio', 'Map put/get' );
    assert.ok( map.get( 'test' ) == undefined, 'Map get undefined' );
  }
);

QUnit.test(
  'collection/Tree', function( assert ) {
    var tree = new m.Tree();
    var elem0_1 = 'elem0_1';
    var elem0_2 = 'elem0_2';
    var elem1_1 = 'elem1_1';
    tree.put( elem0_1 );
    tree.put( elem0_2 );
    tree.put( elem1_1, elem0_1 );
    assert.ok( tree, 'Tree creation' );
    var descendants = tree.listDescendants( elem0_1 );
    assert.ok( descendants.length == 1, 'Tree descendants listing' );
    tree.remove( elem1_1 );
    descendants = tree.listDescendants( elem0_1 );
    assert.ok( descendants.length == 0, 'Tree remove element' );
  }
);
