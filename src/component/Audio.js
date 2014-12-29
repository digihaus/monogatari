define( [ 'component/Base', 'lib/SoundJS' ], function( _Base, _Sound ) {

  var Audio = function( id, source ) {
    _Base.call( this, _Base.AUDIO_SOURCE );

    if ( id && source ) {
      this.id = id;
      this.source = source;
      this.instance = null;
      this.state = Audio.STATE_STOPED;

      createjs.Sound.alternateExtensions = [ 'mp3' ];
      createjs.Sound.registerSound( this.source, this.id );
      createjs.Sound.on( 'fileload', function( event ) {
        this.instance = createjs.Sound.createInstance( this.id );
      }, this );

    } else {
      console.log( 'Audio component fail.' );
    }
  };

  Audio.STATE_STOPED = 0;
  Audio.STATE_PLAYING = 1;
  Audio.STATE_PAUSED = 2;
  Audio.STATE_FINISHED = 3;

  Audio.prototype.isLoaded = function() {
    return createjs.Sound.loadComplete( this.source );
  };

  Audio.prototype.start = function( options ) {
    if ( this.instance && this.isLoaded() && this.state != Audio.STATE_PLAYING ) {
      this.instance.play( options );
      this.state = Audio.STATE_PLAYING;

      this.instance.on( 'complete', function( event ) {
          this.state = Audio.STATE_FINISHED;
      } );
    }
  };

  Audio.prototype.pause = function() {
    if ( this.instance && this.isLoaded() && this.state != Audio.STATE_PAUSED ) {
      this.instance.pause();
      this.state = Audio.STATE_PAUSED;
    }
  };

  Audio.prototype.resume = function() {
    if ( this.instance && this.isLoaded() && this.state != Audio.STATE_PLAYING ) {
      this.instance.resume();
      this.state = Audio.STATE_PLAYING;
    }
  };

  Audio.prototype.stop = function() {
    if ( this.instance && this.isLoaded() && this.state != Audio.STATE_STOPED ) {
      this.instance.stop();
      this.state = Audio.STATE_STOPED;
    }
  };

  return Audio;

} );
