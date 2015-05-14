require( [ 'core/Timer' ], function( Timer ) {
  var t = Timer;
  assert( t != null, 'Timer created', 'core', t );

  var frames = 0;

  var run = function() {
    if ( frames < 100 ) {
      frames++;
      t.tick();
      requestAnimationFrame( run );
    } else {
      assert( t.fps != null, 'Timer FPS', 'core', t );
    }
  }

  run();
} );

require( [ 'core/GameObject' ], function( _GameObject ) {

  var go1 = new _GameObject( 'oromio', function() {
    console.log( 'oromio' );
  } );

  assert( go1 != null, 'GameObject created', 'core/GameObject', go1 );

  var go2 = new _GameObject( 'bolovo', function() {
    console.log( 'bolovo' );
  } );

  go1.children.push( go2 );

  assert( go1.children.length > 0, 'GameObject hierarchy created', 'core/GameObject', go2 );

  var frames = 0;

  var run = function() {
    if ( frames < 100 ) {
      frames++;
      go1.update();
      requestAnimationFrame( run );
    }
  }

  run();
} );
