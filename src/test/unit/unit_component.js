QUnit.test(
  'component/Audio', function( assert ) {
    var audio = new m.Audio( 'myid', '../resources/assets/invaders.wav' );
    assert.ok( audio != null, 'Audio creation' );
    var frames = 0;

    var run = function() {
      if( frames == 100 ) {
        assert.ok( audio.isLoaded(), 'Audio load' );
        if( audio.isLoaded() ) {
          audio.start();
        }
      }

      if( frames > 100 ) {
        assert.ok( audio.state == m.Audio.STATE_PLAYING, 'Audio state "playing"' );
        audio.stop();
        assert.ok( audio.state == m.Audio.STATE_STOPPED, 'Audio state "stopped"' );
      } else {
        frames++;
        requestAnimationFrame( run );
      }
    };

    run();
  }
);

/**
 require(
 [ 'component/Sprite' ], function( Sprite ) {
    var sprite = new Sprite( 'assets/zombies.png', 64, 64, 1, 3 );
    assert( sprite != null, 'Sprite created', 'component', sprite );
  }
 );

 require(
 [ 'component/StaticText' ], function( StaticText ) {
    var text = new StaticText( 'OROMIO', 12, "Caesar Dressing" );
    assert( text != null, 'StaticText created', 'component', text );
    text.load();
  }
 );

 require(
 [ 'component/RigidBody' ], function( RigidBody ) {
    var body = new RigidBody();
    assert( body != null, 'RigidBody created', 'component', body );
  }
 );
 */