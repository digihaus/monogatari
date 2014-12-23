/**
* This is the base Component all others should extend.
*/
define( function() {

  var Component = function() {};

  // state
  Component.STATE_INITIALIZING = 0;
  Component.STATE_BUFFERING = 1;
  Component.STATE_READY = 2;
  Component.STATE_FAILED = 3;

  // types
  Component.BASE = 0;
  Component.NODE = 1;
  Component.THREE_OBJECT = 2;
  Component.RIGID_BODY = 3;
  Component.SPRITE = 4;
  Component.STATIC_TEXT = 5;
  Component.AUDIO_SOURCE = 6;
  Component.PARTICLE_EMITTER = 7;
  //Component.AUDIO_LISTENER = 1;
  //Component.PACKAGE_SENDER = 1;
  //Component.PACKAGE_LISTENER = 1;

  Component.CUSTOM = -1;

  Component.prototype.componentType = Component.BASE;

  return Component;

} );
