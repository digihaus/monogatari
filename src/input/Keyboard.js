define( function() {

  var Keyboard = function( timer ) {
    this.timer = timer;
    this.pressed = new Int16Array( 256 );

    for ( var i = 0, len = this.pressed.length; i < len; i++ ) {
      this.pressed[ i ] = -1;
    }
  };

  Keyboard.BACKSPACE = 8;
  Keyboard.TAB = 9;
  Keyboard.ENTER = 13;
  Keyboard.SHIFT = 16;
  Keyboard.CTRL = 17;
  Keyboard.ALT = 18;
  Keyboard.PAUSE_BREAK = 19;
  Keyboard.CAPS_LOCK = 20;
  Keyboard.ESCAPE = 27;
  Keyboard.SPACE = 32;
  Keyboard.PAGE_UP = 33;
  Keyboard.PAGE_DOWN = 34;
  Keyboard.END = 35;
  Keyboard.HOME = 36;
  Keyboard.LEFT_ARROW = 37;
  Keyboard.UP_ARROW = 38;
  Keyboard.RIGHT_ARROW = 39;
  Keyboard.DOWN_ARROW = 40;
  Keyboard.INSERT = 45;
  Keyboard.DELETE = 46;
  Keyboard.NUM_0 = 48;
  Keyboard.NUM_1 = 49;
  Keyboard.NUM_2 = 50;
  Keyboard.NUM_3 = 51;
  Keyboard.NUM_4 = 52;
  Keyboard.NUM_5 = 53;
  Keyboard.NUM_6 = 54;
  Keyboard.NUM_7 = 55;
  Keyboard.NUM_8 = 56;
  Keyboard.NUM_9 = 57;
  Keyboard.A = 65;
  Keyboard.B = 66;
  Keyboard.C = 67;
  Keyboard.D = 68;
  Keyboard.E = 69;
  Keyboard.F = 70;
  Keyboard.G = 71;
  Keyboard.H = 72;
  Keyboard.I = 73;
  Keyboard.J = 74;
  Keyboard.K = 75;
  Keyboard.L = 76;
  Keyboard.M = 77;
  Keyboard.N = 78;
  Keyboard.O = 79;
  Keyboard.P = 80;
  Keyboard.Q = 81;
  Keyboard.R = 82;
  Keyboard.S = 83;
  Keyboard.T = 84;
  Keyboard.U = 85;
  Keyboard.V = 86;
  Keyboard.W = 87;
  Keyboard.X = 88;
  Keyboard.Y = 89;
  Keyboard.Z = 90;
  Keyboard.LEFT_WINDOW = 91;
  Keyboard.RIGHT_WINDOW = 92;
  Keyboard.SELECT_KEY = 93;
  Keyboard.NUMPAD_0 = 96;
  Keyboard.NUMPAD_1 = 97;
  Keyboard.NUMPAD_2 = 98;
  Keyboard.NUMPAD_3 = 99;
  Keyboard.NUMPAD_4 = 100;
  Keyboard.NUMPAD_5 = 101;
  Keyboard.NUMPAD_6 = 102;
  Keyboard.NUMPAD_7 = 103;
  Keyboard.NUMPAD_8 = 104;
  Keyboard.NUMPAD_9 = 105;
  Keyboard.MULTIPLY = 106;
  Keyboard.ADD = 107;
  Keyboard.SUBTRACT = 109;
  Keyboard.DECIMAL_POINT = 110;
  Keyboard.DIVIDE = 111;
  Keyboard.F1 = 112;
  Keyboard.F2 = 113;
  Keyboard.F3 = 114;
  Keyboard.F4 = 115;
  Keyboard.F5 = 116;
  Keyboard.F6 = 117;
  Keyboard.F7 = 118;
  Keyboard.F8 = 119;
  Keyboard.F9 = 120;
  Keyboard.F10 = 121;
  Keyboard.F11 = 122;
  Keyboard.F12 = 123;
  Keyboard.NUM_LOCK = 144;
  Keyboard.SCROLL_LOCK = 145;
  Keyboard.SEMICOLON = 186;
  Keyboard.EQUAL_SIGN = 187;
  Keyboard.COMMA = 188;
  Keyboard.DASH = 189;
  Keyboard.PERIOD = 190;
  Keyboard.FORWARD_SLASH = 191;
  Keyboard.GRAVE_ACCENT = 192;
  Keyboard.OPEN_BRACKET = 219;
  Keyboard.BACK_SLASH = 220;
  Keyboard.CLOSE_BRAKET = 221;
  Keyboard.SINGLE_QUOTE = 222;

  Keyboard.prototype.isDown = function( keyCode ) {
    return ( this.pressed[ keyCode ] == -1 ) ? null : this.pressed[ keyCode ];
  };

  Keyboard.prototype.onKeyDown = function( event ) {

    if ( event.keyCode == Keyboard.BACKSPACE ||
          event.keyCode == Keyboard.UP_ARROW ||
          event.keyCode == Keyboard.DOWN_ARROW ||
          event.keyCode == Keyboard.LEFT_ARROW ||
          event.keyCode == Keyboard.RIGHT_ARROW ||
          event.keyCode == Keyboard.PAGE_UP ||
          event.keyCode == Keyboard.PAGE_DOWN ||
          event.keyCode == Keyboard.SPACE ) {

        event.preventDefault();
    }

    this.pressed[ event.keyCode ] = this.timer.time;
  };

  Keyboard.prototype.onKeyUp = function( event ) {
    this.pressed[ event.keyCode ] = -1;
  };

  return Keyboard;

} );
