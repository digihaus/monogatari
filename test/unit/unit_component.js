QUnit.test(
  'component/Audio', function( assert ) {
    var audio = new m.Audio( '../assets/invaders.wav' );
    assert.ok( audio != null, 'Audio creation' );
    var frames = 0;

    var run = function() {
      if( frames == 100 ) {
        assert.ok( audio.state == m.Base.STATE_READY, 'Audio load' );
        if( audio.state == m.Base.STATE_READY ) {
          audio.play();
        }
      }

      if( frames > 100 ) {
        assert.ok( audio.state == m.Base.STATE_RUNNING, 'Audio state "playing"' );
        audio.stop();
        assert.ok( audio.state == m.Base.STATE_READY, 'Audio state "stopped"' );
      } else {
        frames++;
        requestAnimationFrame( run );
      }
    };

    run();
  }
);