define( [ 'core/Monogatari', 'core/Timer', 'core/Array' ], function() {
  Monogatari.Gamepad = new MonogatariGamepad();

  function MonogatariGamepad() {
    this.supports = !!navigator.webkitGetGamepads;
    this.gamePads = new Monogatari.Map();
    this._pressed = new Int16Array( 32 );

    this.deadZone = 0.25;

    this.GAMEPAD_BUTTON_1 = 1;
    this.GAMEPAD_BUTTON_2 = 2;
    this.GAMEPAD_BUTTON_3 = 3;
    this.GAMEPAD_BUTTON_4 = 4;

    this.GAMEPAD_L_TRIGGER_1 = 5;
    this.GAMEPAD_L_TRIGGER_2 = 6;
    this.GAMEPAD_R_TRIGGER_1 = 7;
    this.GAMEPAD_R_TRIGGER_2 = 8;

    this.GAMEPAD_SELECT = 9;
    this.GAMEPAD_START = 10;

    this.GAMEPAD_L_STICK_BUTTON = 11;
    this.GAMEPAD_R_STICK_BUTTON = 12;
    this.GAMEPAD_L_STICK = 13;
    this.GAMEPAD_R_STICK = 14;

    this.GAMEPAD_VENDOR = 15;

    this.GAMEPAD_UP = 16;
    this.GAMEPAD_DOWN = 17;
    this.GAMEPAD_LEFT = 18;
    this.GAMEPAD_RIGHT = 19;

    this.update = function() {
      if ( this.supports ) {
        var devices = navigator.webkitGetGamepads();

        for ( var i = 0, len = devices.length; i < len; i++ )
          if ( devices[ i ] )
            this.gamePads.put( [ i ], devices[ i ] );
      } else {
        console.log( "Gamepads not supported in this browser!" );
      }
    }
  }

  MonogatariGamepad.prototype.isDown = function( device, button ) {
  // return timestamp;
  };

  MonogatariGamepad.prototype.getAxis = function( device, stick ) {
  // return THREE.Vector3;
  };
} );
