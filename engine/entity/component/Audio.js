define( [ 'core/Monogatari', 'core/Constants', 'engine/entity/component/Component', 'engine/AudioManager' ], function() {
  Monogatari.Audio = Monogatari.Component.extend( {
    init : function( source ) {
      this.source = ( source ) ? source : null;
      this.soundInstance = null;

      if ( !this.source )
        console.log( "No source informed" );

      this.componentState = ( this.source ) ? Monogatari.Constants.COMPONENT_STATE_INITIALIZING : Monogatari.Constants.COMPONENT_STATE_FAILED;
      this.audioState = Monogatari.Constants.AUDIO_STATE_STOPED;

      this.componentType = Monogatari.Constants.COMPONENT_AUDIO_SOURCE;
    },

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