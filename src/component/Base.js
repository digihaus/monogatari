/**
* This is the base Component all others should extend.
*/
define( function() {

  var Component = function( type ) {
    this.type = ( type ) ? type : Component.BASE;
    this.isRenderable = false;

    // state
    this.STATE_INITIALIZING = 0;
    this.STATE_BUFFERING = 1;
    this.STATE_READY = 2;
    this.STATE_FAILED = 3;

    // types
    this.BASE = 0;
    this.BASE_THREE = 1;
    this.BASE_FONT = 2;
    this.RIGID_BODY = 3;
    this.SPRITE = 4;
    this.STATIC_TEXT = 5;
    this.AUDIO_SOURCE = 6;
    this.PARTICLE_EMITTER = 7;
    //Component.AUDIO_LISTENER = 1;
    //Component.PACKAGE_SENDER = 1;
    //Component.PACKAGE_LISTENER = 1;

    this.CUSTOM = -1;
  };

  return Component;

} );
