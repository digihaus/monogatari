/**
* This is the base Component all others should extend.
*/
define( function() {

  var Component = function( type ) {
    this.type = ( type ) ? type : Component.BASE;
    this.isRenderable = false;
  };

  // state
  Component.STATE_INITIALIZING = 0;
  Component.STATE_BUFFERING = 1;
  Component.STATE_READY = 2;
  Component.STATE_FAILED = 3;

  // types
  Component.BASE = 0;
  Component.BASE_THREE = 1;
  Component.BASE_FONT = 2;
  Component.NODE = 3;
  Component.RIGID_BODY = 4;
  Component.SPRITE = 5;
  Component.STATIC_TEXT = 6;
  Component.AUDIO_SOURCE = 7;
  Component.PARTICLE_EMITTER = 8;
  //Component.AUDIO_LISTENER = 1;
  //Component.PACKAGE_SENDER = 1;
  //Component.PACKAGE_LISTENER = 1;

  Component.CUSTOM = -1;

  return Component;

} );
