define( function() {

  var Keyboard = function() {
    this.pressed = new Int32Array( 256 );

    for ( var i = 0, len = this.pressed.length; i < len; i++ ) {
      this.pressed[ i ] = -1;
    }

    this.BACKSPACE = 8;
    this.TAB = 9;
    this.ENTER = 13;
    this.SHIFT = 16;
    this.CTRL = 17;
    this.ALT = 18;
    this.PAUSE_BREAK = 19;
    this.CAPS_LOCK = 20;
    this.ESCAPE = 27;
    this.SPACE = 32;
    this.PAGE_UP = 33;
    this.PAGE_DOWN = 34;
    this.END = 35;
    this.HOME = 36;
    this.LEFT_ARROW = 37;
    this.UP_ARROW = 38;
    this.RIGHT_ARROW = 39;
    this.DOWN_ARROW = 40;
    this.INSERT = 45;
    this.DELETE = 46;
    this.NUM_0 = 48;
    this.NUM_1 = 49;
    this.NUM_2 = 50;
    this.NUM_3 = 51;
    this.NUM_4 = 52;
    this.NUM_5 = 53;
    this.NUM_6 = 54;
    this.NUM_7 = 55;
    this.NUM_8 = 56;
    this.NUM_9 = 57;
    this.A = 65;
    this.B = 66;
    this.C = 67;
    this.D = 68;
    this.E = 69;
    this.F = 70;
    this.G = 71;
    this.H = 72;
    this.I = 73;
    this.J = 74;
    this.K = 75;
    this.L = 76;
    this.M = 77;
    this.N = 78;
    this.O = 79;
    this.P = 80;
    this.Q = 81;
    this.R = 82;
    this.S = 83;
    this.T = 84;
    this.U = 85;
    this.V = 86;
    this.W = 87;
    this.X = 88;
    this.Y = 89;
    this.Z = 90;
    this.LEFT_WINDOW = 91;
    this.RIGHT_WINDOW = 92;
    this.SELECT_KEY = 93;
    this.NUMPAD_0 = 96;
    this.NUMPAD_1 = 97;
    this.NUMPAD_2 = 98;
    this.NUMPAD_3 = 99;
    this.NUMPAD_4 = 100;
    this.NUMPAD_5 = 101;
    this.NUMPAD_6 = 102;
    this.NUMPAD_7 = 103;
    this.NUMPAD_8 = 104;
    this.NUMPAD_9 = 105;
    this.MULTIPLY = 106;
    this.ADD = 107;
    this.SUBTRACT = 109;
    this.DECIMAL_POINT = 110;
    this.DIVIDE = 111;
    this.F1 = 112;
    this.F2 = 113;
    this.F3 = 114;
    this.F4 = 115;
    this.F5 = 116;
    this.F6 = 117;
    this.F7 = 118;
    this.F8 = 119;
    this.F9 = 120;
    this.F10 = 121;
    this.F11 = 122;
    this.F12 = 123;
    this.NUM_LOCK = 144;
    this.SCROLL_LOCK = 145;
    this.SEMICOLON = 186;
    this.EQUAL_SIGN = 187;
    this.COMMA = 188;
    this.DASH = 189;
    this.PERIOD = 190;
    this.FORWARD_SLASH = 191;
    this.GRAVE_ACCENT = 192;
    this.OPEN_BRACKET = 219;
    this.BACK_SLASH = 220;
    this.CLOSE_BRAKET = 221;
    this.SINGLE_QUOTE = 222;
  };

  Keyboard.prototype.isDown = function( keyCode ) {
    return ( this.pressed[ keyCode ] == -1 ) ? null : this.pressed[ keyCode ];
  };

  Keyboard.prototype.onKeyDown = function( event, timer ) {

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

    this.pressed[ event.keyCode ] = timer.time;
  };

  Keyboard.prototype.onKeyUp = function( event ) {
    this.pressed[ event.keyCode ] = -1;
  };

  return Keyboard;

} );
