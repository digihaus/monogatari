define(
  [ 'Timer', 'collection/Map' ], function( timer, Map ) {

    var GamePad = function() {
      this.gamePads = new Map();
      this.pressed = new Int16Array( 32 );
      this.deadZone = 0.25;

      if( !!navigator.webkitGetGamepads ) {
        var devices = navigator.webkitGetGamepads();
        for( var i = 0, len = devices.length; i < len; i++ ) {
          if( devices[ i ] ) {
            this.gamePads.put( [ i ], devices[ i ] );
          }
        }
      } else {
        console.log( "Gamepads are not supported in this browser." );
      }
    };

    GamePad.BUTTON_1 = 1;
    GamePad.BUTTON_2 = 2;
    GamePad.BUTTON_3 = 3;
    GamePad.BUTTON_4 = 4;
    GamePad.L_TRIGGER_1 = 5;
    GamePad.L_TRIGGER_2 = 6;
    GamePad.R_TRIGGER_1 = 7;
    GamePad.R_TRIGGER_2 = 8;
    GamePad.SELECT = 9;
    GamePad.START = 10;
    GamePad.L_STICK_BUTTON = 11;
    GamePad.R_STICK_BUTTON = 12;
    GamePad.L_STICK = 13;
    GamePad.R_STICK = 14;
    GamePad.VENDOR = 15;
    GamePad.UP = 16;
    GamePad.DOWN = 17;
    GamePad.LEFT = 18;
    GamePad.RIGHT = 19;

    GamePad.prototype.isDown = function( device, button ) {
      // return timestamp;
    };

    GamePad.prototype.getAxis = function( device, stick ) {
      // return THREE.Vector3;
    };

    return GamePad;
  }
);
