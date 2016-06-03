QUnit.test(
  'component/Audio', function( assert ) {
    var audio = new m.Audio( '../assets/invaders.wav' );
    assert.ok( audio != null, 'Audio creation' );
    var frames = 0;

    console.log(m.Base.STATE.READY);

    var run = function() {
      if( frames == 100 ) {
        assert.ok( audio.state == m.Base.STATE.LOADED, 'Audio load' );
        if( audio.state == m.Base.STATE.LOADED ) {
          audio.play();
        }
      }

      if( frames > 100 ) {
        assert.ok( audio.state == m.Base.STATE.RUNNING, 'Audio state "playing"' );
        audio.stop();
        assert.ok( audio.state == m.Base.STATE.LOADED, 'Audio state "stopped"' );
      } else {
        frames++;
        requestAnimationFrame( run );
      }
    };

    run();
  }
);