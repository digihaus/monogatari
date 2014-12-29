define( [ 'component/Base', 'util/AudioLoader' ], function( _Base, _AudioLoader ) {

  var Audio = function( source ) {
    _Base.call( this, _Base.AUDIO_SOURCE );

    if ( !this.source ) {
      console.log( 'No audio source informed.' );
    }

    this.source = ( source ) ? source : null;
    this.soundInstance = null;
    this.componentState = ( this.source ) ? _Base.STATE_INITIALIZING : _Base.STATE_FAILED;
    this.audioState = Audio.STATE_STOPED;
  };

  Audio.STATE_STOPED = 0;
  Audio.STATE_PLAYING = 1;
  Audio.STATE_PAUSED = 2;
  Audio.STATE_FINISHED = 3;


  Monogatari.Audio = Monogatari.Component.extend( {

    update : function() {
      if ( this.componentState === Monogatari.Constants.COMPONENT_STATE_INITIALIZING ) {
        Monogatari.AudioManager.load( this.source );
        this.componentState = Monogatari.Constants.COMPONENT_STATE_BUFFERING;
      }

      if ( this.componentState === Monogatari.Constants.COMPONENT_STATE_BUFFERING && Monogatari.AudioManager.isLoaded( this.source ) ) {
        this.soundInstance = Monogatari.AudioManager.get( this.source );
        this.componentState = Monogatari.Constants.COMPONENT_STATE_READY;
      }

      if ( this.soundInstance && this.soundInstance.playState === createjs.Sound.PLAY_FINISHED ) {
        this.audioState = Monogatari.Constants.AUDIO_STATE_FINISHED;
      }
    },

    isLoaded : function() {
      return ( this.componentState === Monogatari.Constants.COMPONENT_STATE_READY ) ? true : false;
    },

    play : function( options ) {
      if ( this.soundInstance && this.isLoaded() && this.audioState != Monogatari.Constants.AUDIO_STATE_PLAYING ) {
        this.soundInstance.play( options );
        this.audioState = Monogatari.Constants.AUDIO_STATE_PLAYING;
      }
    },

    pause : function() {
      if ( this.soundInstance && this.isLoaded() && this.audioState != Monogatari.Constants.AUDIO_STATE_PAUSED ) {
        this.soundInstance.pause();
        this.audioState = Monogatari.Constants.AUDIO_STATE_PAUSED;
      }
    },

    resume : function() {
      if ( this.soundInstance && this.isLoaded() && this.audioState != Monogatari.Constants.AUDIO_STATE_PLAYING ) {
        this.soundInstance.resume();
        this.audioState = Monogatari.Constants.AUDIO_STATE_PLAYING;
      }
    },

    stop : function() {
      if ( this.soundInstance && this.isLoaded() && this.audioState != Monogatari.Constants.AUDIO_STATE_STOPED ) {
        this.soundInstance.stop();
        this.audioState = Monogatari.Constants.AUDIO_STATE_STOPED;
      }
    }
  } );
} );
