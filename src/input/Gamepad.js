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

    GamePad.prototype.BUTTON_1 = 1;
    GamePad.prototype.BUTTON_2 = 2;
    GamePad.prototype.BUTTON_3 = 3;
    GamePad.prototype.BUTTON_4 = 4;
    GamePad.prototype.L_TRIGGER_1 = 5;
    GamePad.prototype.L_TRIGGER_2 = 6;
    GamePad.prototype.R_TRIGGER_1 = 7;
    GamePad.prototype.R_TRIGGER_2 = 8;
    GamePad.prototype.SELECT = 9;
    GamePad.prototype.START = 10;
    GamePad.prototype.L_STICK_BUTTON = 11;
    GamePad.prototype.R_STICK_BUTTON = 12;
    GamePad.prototype.L_STICK = 13;
    GamePad.prototype.R_STICK = 14;
    GamePad.prototype.VENDOR = 15;
    GamePad.prototype.UP = 16;
    GamePad.prototype.DOWN = 17;
    GamePad.prototype.LEFT = 18;
    GamePad.prototype.RIGHT = 19;

    GamePad.prototype.isDown = function( device, button ) {
      // return timestamp;
    };

    GamePad.prototype.getAxis = function( device, stick ) {
      // return THREE.Vector3;
    };

    return GamePad;
  }
);
