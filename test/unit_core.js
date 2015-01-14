require( [ 'core/Timer' ], function( _Timer ) {
  var t = new _Timer();
  assert( t != null, 'Timer created', 'core', t );

  var frames = 0;

  var run = function() {
    if( frames < 100 ){
      frames++;
      t.tick();
      t.getFps();
      requestAnimationFrame( run );
    } else {
      assert( t.getFps() != null, 'Timer getFPS', 'core', t );
    }
  }

  run();
} );

require( [ 'core/GameObject' ], function( _GameObject ) {

  var go = new _GameObject( 'bolovo', function() {
    console.log( 'oromio' );
  } );

  assert( go != null, 'GameObject created', 'core/GameObject', go );

  var frames = 0;

  var run = function() {
    if( frames < 100 ){
      frames++;
      go.update();
      requestAnimationFrame( run );
    }
  }

  run();
} );
