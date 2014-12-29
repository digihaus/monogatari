define( [ 'component/Base', 'util/AudioLoader' ], function( _Base, _AudioLoader ) {

  var Audio = function( source ) {
    _Base.call( this, _Base.AUDIO_SOURCE );

    if ( source ) {
      this.loader = new _AudioLoader();
      this.source = source ;
      this.soundInstance = null;
      this.componentState = _Base.STATE_INITIALIZING;
      this.audioState = Audio.STATE_STOPED;
    } else {
      console.log( 'No audio source informed.' );
      this.componentState = _Base.STATE_FAILED;
    }

  };

  Audio.STATE_STOPED = 0;
  Audio.STATE_PLAYING = 1;
  Audio.STATE_PAUSED = 2;
  Audio.STATE_FINISHED = 3;

  Audio.prototype.update = function() {
      if ( this.componentState === _Base.STATE_INITIALIZING ) {
        this.loader.load( this.source );
        this.componentState = _Base.STATE_BUFFERING;
      }

      if ( this.componentState === _Base.STATE_BUFFERING && this.loader.isLoaded( this.source ) ) {
        this.soundInstance = this.loader.get( this.source );
        this.componentState = _Base.STATE_READY;
      }

      if ( this.soundInstance && this.soundInstance.playState === createjs.Sound.PLAY_FINISHED ) {
        this.audioState = Audio.STATE_FINISHED;
      }
  };

  Audio.prototype.isLoaded = function() {
    return ( this.componentState === _Base.STATE_READY ) ? true : false;
  };

  Audio.prototype.play = function( options ) {
    if ( this.soundInstance && this.isLoaded() && this.audioState != Audio.STATE_PLAYING ) {
      this.soundInstance.play( options );
      this.audioState = Audio.STATE_PLAYING;
    }
  };

  Audio.prototype.pause = function() {
    if ( this.soundInstance && this.isLoaded() && this.audioState != Audio.STATE_PAUSED ) {
      this.soundInstance.pause();
      this.audioState = Audio.STATE_PAUSED;
    }
  };

  Audio.prototype.resume = function() {
    if ( this.soundInstance && this.isLoaded() && this.audioState != Audio.STATE_PLAYING ) {
      this.soundInstance.resume();
      this.audioState = Audio.STATE_PLAYING;
    }
  };

  Audio.prototype.stop = function() {
    if ( this.soundInstance && this.isLoaded() && this.audioState != Audio.STATE_STOPED ) {
      this.soundInstance.stop();
      this.audioState = Audio.STATE_STOPED;
    }
  };

  return Audio;

} );
