define(
  function() {

    var Keyboard = function() {
      this.pressed = new Int32Array( 256 );

      for( var i = 0, len = this.pressed.length; i < len; i++ ) {
        this.pressed[ i ] = -1;
      }
    };

    Keyboard.prototype.BACKSPACE = 8;
    Keyboard.prototype.TAB = 9;
    Keyboard.prototype.ENTER = 13;
    Keyboard.prototype.SHIFT = 16;
    Keyboard.prototype.CTRL = 17;
    Keyboard.prototype.ALT = 18;
    Keyboard.prototype.PAUSE_BREAK = 19;
    Keyboard.prototype.CAPS_LOCK = 20;
    Keyboard.prototype.ESCAPE = 27;
    Keyboard.prototype.SPACE = 32;
    Keyboard.prototype.PAGE_UP = 33;
    Keyboard.prototype.PAGE_DOWN = 34;
    Keyboard.prototype.END = 35;
    Keyboard.prototype.HOME = 36;
    Keyboard.prototype.LEFT_ARROW = 37;
    Keyboard.prototype.UP_ARROW = 38;
    Keyboard.prototype.RIGHT_ARROW = 39;
    Keyboard.prototype.DOWN_ARROW = 40;
    Keyboard.prototype.INSERT = 45;
    Keyboard.prototype.DELETE = 46;
    Keyboard.prototype.NUM_0 = 48;
    Keyboard.prototype.NUM_1 = 49;
    Keyboard.prototype.NUM_2 = 50;
    Keyboard.prototype.NUM_3 = 51;
    Keyboard.prototype.NUM_4 = 52;
    Keyboard.prototype.NUM_5 = 53;
    Keyboard.prototype.NUM_6 = 54;
    Keyboard.prototype.NUM_7 = 55;
    Keyboard.prototype.NUM_8 = 56;
    Keyboard.prototype.NUM_9 = 57;
    Keyboard.prototype.A = 65;
    Keyboard.prototype.B = 66;
    Keyboard.prototype.C = 67;
    Keyboard.prototype.D = 68;
    Keyboard.prototype.E = 69;
    Keyboard.prototype.F = 70;
    Keyboard.prototype.G = 71;
    Keyboard.prototype.H = 72;
    Keyboard.prototype.I = 73;
    Keyboard.prototype.J = 74;
    Keyboard.prototype.K = 75;
    Keyboard.prototype.L = 76;
    Keyboard.prototype.M = 77;
    Keyboard.prototype.N = 78;
    Keyboard.prototype.O = 79;
    Keyboard.prototype.P = 80;
    Keyboard.prototype.Q = 81;
    Keyboard.prototype.R = 82;
    Keyboard.prototype.S = 83;
    Keyboard.prototype.T = 84;
    Keyboard.prototype.U = 85;
    Keyboard.prototype.V = 86;
    Keyboard.prototype.W = 87;
    Keyboard.prototype.X = 88;
    Keyboard.prototype.Y = 89;
    Keyboard.prototype.Z = 90;
    Keyboard.prototype.LEFT_WINDOW = 91;
    Keyboard.prototype.RIGHT_WINDOW = 92;
    Keyboard.prototype.SELECT_KEY = 93;
    Keyboard.prototype.NUMPAD_0 = 96;
    Keyboard.prototype.NUMPAD_1 = 97;
    Keyboard.prototype.NUMPAD_2 = 98;
    Keyboard.prototype.NUMPAD_3 = 99;
    Keyboard.prototype.NUMPAD_4 = 100;
    Keyboard.prototype.NUMPAD_5 = 101;
    Keyboard.prototype.NUMPAD_6 = 102;
    Keyboard.prototype.NUMPAD_7 = 103;
    Keyboard.prototype.NUMPAD_8 = 104;
    Keyboard.prototype.NUMPAD_9 = 105;
    Keyboard.prototype.MULTIPLY = 106;
    Keyboard.prototype.ADD = 107;
    Keyboard.prototype.SUBTRACT = 109;
    Keyboard.prototype.DECIMAL_POINT = 110;
    Keyboard.prototype.DIVIDE = 111;
    Keyboard.prototype.F1 = 112;
    Keyboard.prototype.F2 = 113;
    Keyboard.prototype.F3 = 114;
    Keyboard.prototype.F4 = 115;
    Keyboard.prototype.F5 = 116;
    Keyboard.prototype.F6 = 117;
    Keyboard.prototype.F7 = 118;
    Keyboard.prototype.F8 = 119;
    Keyboard.prototype.F9 = 120;
    Keyboard.prototype.F10 = 121;
    Keyboard.prototype.F11 = 122;
    Keyboard.prototype.F12 = 123;
    Keyboard.prototype.NUM_LOCK = 144;
    Keyboard.prototype.SCROLL_LOCK = 145;
    Keyboard.prototype.SEMICOLON = 186;
    Keyboard.prototype.EQUAL_SIGN = 187;
    Keyboard.prototype.COMMA = 188;
    Keyboard.prototype.DASH = 189;
    Keyboard.prototype.PERIOD = 190;
    Keyboard.prototype.FORWARD_SLASH = 191;
    Keyboard.prototype.GRAVE_ACCENT = 192;
    Keyboard.prototype.OPEN_BRACKET = 219;
    Keyboard.prototype.BACK_SLASH = 220;
    Keyboard.prototype.CLOSE_BRAKET = 221;
    Keyboard.prototype.SINGLE_QUOTE = 222;

    Keyboard.prototype.isDown = function( keyCode ) {
      return ( this.pressed[ keyCode ] == -1 ) ? null : this.pressed[ keyCode ];
    };

    Keyboard.prototype.onKeyDown = function( event, timer ) {
      if( event.keyCode == Keyboard.prototype.BACKSPACE ||
        event.keyCode == Keyboard.prototype.UP_ARROW ||
        event.keyCode == Keyboard.prototype.DOWN_ARROW ||
        event.keyCode == Keyboard.prototype.LEFT_ARROW ||
        event.keyCode == Keyboard.prototype.RIGHT_ARROW ||
        event.keyCode == Keyboard.prototype.PAGE_UP ||
        event.keyCode == Keyboard.prototype.PAGE_DOWN ||
        event.keyCode == Keyboard.prototype.SPACE ) {

        event.preventDefault();
      }

      this.pressed[ event.keyCode ] = timer.time;
    };

    Keyboard.prototype.onKeyUp = function( event ) {
      this.pressed[ event.keyCode ] = -1;
    };

    return Keyboard;
  }
);
