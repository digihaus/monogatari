require( [ 'component/Audio' ], function( _Audio ) {
  var audio = new _Audio( 'myid', 'assets/invaders.wav' );

  assert( audio != null, 'Audio created', 'component', audio );

  var frames = 0;

  var run = function() {
    if( frames == 100 ) {

      assert( audio.isLoaded(), 'Audio is loaded', 'component' );

      if( audio.isLoaded() ) {
        audio.start();
      }
    }

    if( frames > 100 ) {

      assert( audio.state == _Audio.STATE_PLAYING, 'Audio state playing', 'component', audio );

      audio.stop();

      assert( audio.state == _Audio.STATE_STOPPED, 'Audio state stopped', 'component', audio );

    } else {
      frames++;
      requestAnimationFrame( run );
    }
  }

  run();
} );

require( [ 'component/Sprite' ], function( _Sprite ) {
  var sprite = new _Sprite( 'assets/zombies.png', 64, 64, 1, 3 );

  assert( sprite != null, 'Sprite created', 'component', sprite );
} );

require( [ 'component/StaticText' ], function ( _StaticText ) {
  var text = new _StaticText( 'OROMIO', 12, "Caesar Dressing" );

  assert( text != null, 'StaticText created', 'component', text );

  text.load();
} );

require( [ 'component/RigidBody' ], function ( _RigidBody ) {
  var body = new _RigidBody();

  assert( body != null, 'RigidBody created', 'component', body );
} );
