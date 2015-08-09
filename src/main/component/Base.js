/**
 * This is the base Component all others shall extend.
 */
define(
  function() {

    var Component = function( type ) {
      this.type = ( type ) ? type : Component.BASE;
      this.isRenderable = false;
    };

    // State
    Component.STATE_INITIALIZING = 0;
    Component.STATE_BUFFERING = 1;
    Component.STATE_READY = 2;
    Component.STATE_FAILED = 3;

    // Types
    Component.BASE = 0;
    Component.BASE_THREE = 1;
    Component.BASE_FONT = 2;
    Component.RIGID_BODY = 3;
    Component.SPRITE = 4;
    Component.TEXT = 5;
    Component.AUDIO_SOURCE = 6;
    Component.PARTICLE_EMITTER = 7;
    Component.TILEMAP = 8;

    Component.CUSTOM = -1;

    return Component;
  }
);
