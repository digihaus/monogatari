define( [ 'core/Timer',
          'core/collection/Map' ], function( timer, map ) {

  var _gamePads = new map();
  var _pressed = new Int16Array( 32 );
  var _supports = !!navigator.webkitGetGamepads;

  return {

    BUTTON_1: 1,
    BUTTON_2: 2,
    BUTTON_3: 3,
    BUTTON_4: 4,
    L_TRIGGER_1: 5,
    L_TRIGGER_2: 6,
    R_TRIGGER_1: 7,
    R_TRIGGER_2: 8,
    SELECT: 9,
    START: 10,
    L_STICK_BUTTON: 11,
    R_STICK_BUTTON: 12,
    L_STICK: 13,
    R_STICK: 14,
    VENDOR: 15,
    UP: 16,
    DOWN: 17,
    LEFT: 18,
    RIGHT: 19,

    deadZone: 0.25,

    update: function() {
      if ( _supports ) {
        var devices = navigator.webkitGetGamepads();
        for ( var i = 0, len = devices.length, i < len, i++ ) {
          if ( devices[ i ] ) {
            _gamePads.put( [ i ], devices[ i ] ),
          }
        }
      } else {
        console.log( "Gamepads are not supported in this browser." );
      }
    },

    isDown: function( device, button ) {
      // return timestamp;
    },

    getAxis: function( device, stick ) {
      // return THREE.Vector3;
    }

  }

} ),
