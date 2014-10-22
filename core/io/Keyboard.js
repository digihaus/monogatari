define( [ 'core/Monogatari', 'core/Timer', 'core/Array' ], function() {
  Monogatari.Keyboard = new MonogatariKeyboard();

  function MonogatariKeyboard() {

    // Constructor -----------------------
    window.addEventListener( 'keyup', function( event ) {
      Monogatari.Keyboard.onKeyUp( event );
    }, false );
    window.addEventListener( 'keydown', function( event ) {
      Monogatari.Keyboard.onKeyDown( event );
    }, false );
    // -----------------------------------

    // cache for pressed keys
    this._pressed = new Int16Array( 256 );

    this.KEY_BACKSPACE = 8;
    this.KEY_TAB = 9;
    this.KEY_ENTER = 13;
    this.KEY_SHIFT = 16;
    this.KEY_CTRL = 17;
    this.KEY_ALT = 18;
    this.KEY_PAUSE_BREAK = 19;
    this.KEY_CAPS_LOCK = 20;
    this.KEY_ESCAPE = 27;
    this.KEY_SPACE = 32;
    this.KEY_PAGE_UP = 33;
    this.KEY_PAGE_DOWN = 34;
    this.KEY_END = 35;
    this.KEY_HOME = 36;
    this.KEY_LEFT_ARROW = 37;
    this.KEY_UP_ARROW = 38;
    this.KEY_RIGHT_ARROW = 39;
    this.KEY_DOWN_ARROW = 40;
    this.KEY_INSERT = 45;
    this.KEY_DELETE = 46;
    this.KEY_0 = 48;
    this.KEY_1 = 49;
    this.KEY_2 = 50;
    this.KEY_3 = 51;
    this.KEY_4 = 52;
    this.KEY_5 = 53;
    this.KEY_6 = 54;
    this.KEY_7 = 55;
    this.KEY_8 = 56;
    this.KEY_9 = 57;
    this.KEY_A = 65;
    this.KEY_B = 66;
    this.KEY_C = 67;
    this.KEY_D = 68;
    this.KEY_E = 69;
    this.KEY_F = 70;
    this.KEY_G = 71;
    this.KEY_H = 72;
    this.KEY_I = 73;
    this.KEY_J = 74;
    this.KEY_K = 75;
    this.KEY_L = 76;
    this.KEY_M = 77;
    this.KEY_N = 78;
    this.KEY_O = 79;
    this.KEY_P = 80;
    this.KEY_Q = 81;
    this.KEY_R = 82;
    this.KEY_S = 83;
    this.KEY_T = 84;
    this.KEY_U = 85;
    this.KEY_V = 86;
    this.KEY_W = 87;
    this.KEY_X = 88;
    this.KEY_Y = 89;
    this.KEY_Z = 90;
    this.KEY_LEFT_WINDOW = 91;
    this.KEY_RIGHT_WINDOW = 92;
    this.KEY_SELECT_KEY = 93;
    this.KEY_NUMPAD_0 = 96;
    this.KEY_NUMPAD_1 = 97;
    this.KEY_NUMPAD_2 = 98;
    this.KEY_NUMPAD_3 = 99;
    this.KEY_NUMPAD_4 = 100;
    this.KEY_NUMPAD_5 = 101;
    this.KEY_NUMPAD_6 = 102;
    this.KEY_NUMPAD_7 = 103;
    this.KEY_NUMPAD_8 = 104;
    this.KEY_NUMPAD_9 = 105;
    this.KEY_MULTIPLY = 106;
    this.KEY_ADD = 107;
    this.KEY_SUBTRACT = 109;
    this.KEY_DECIMAL_POINT = 110;
    this.KEY_DIVIDE = 111;
    this.KEY_F1 = 112;
    this.KEY_F2 = 113;
    this.KEY_F3 = 114;
    this.KEY_F4 = 115;
    this.KEY_F5 = 116;
    this.KEY_F6 = 117;
    this.KEY_F7 = 118;
    this.KEY_F8 = 119;
    this.KEY_F9 = 120;
    this.KEY_F10 = 121;
    this.KEY_F11 = 122;
    this.KEY_F12 = 123;
    this.KEY_NUM_LOCK = 144;
    this.KEY_SCROLL_LOCK = 145;
    this.KEY_SEMICOLON = 186;
    this.KEY_EQUAL_SIGN = 187;
    this.KEY_COMMA = 188;
    this.KEY_DASH = 189;
    this.KEY_PERIOD = 190;
    this.KEY_FORWARD_SLASH = 191;
    this.KEY_GRAVE_ACCENT = 192;
    this.KEY_OPEN_BRACKET = 219;
    this.KEY_BACK_SLASH = 220;
    this.KEY_CLOSE_BRAKET = 221;
    this.KEY_SINGLE_QUOTE = 222;

    // fill the pressed keys array for caching
    for ( var i = 0, len = this._pressed.length; i < len; i++ )
      this._pressed[ i ] = -1;

  };

  MonogatariKeyboard.prototype.isDown = function( keyCode ) {
    return ( this._pressed[ keyCode ] === -1 ) ? null : this._pressed[ keyCode ];
  };

  MonogatariKeyboard.prototype.onKeyDown = function( event ) {
    if ( event.keyCode == this.KEY_BACKSPACE || event.keyCode == this.KEY_UP_ARROW || event.keyCode == this.KEY_DOWN_ARROW
        || event.keyCode == this.KEY_LEFT_ARROW || event.keyCode == this.KEY_RIGHT_ARROW || event.keyCode == this.KEY_PAGE_UP
        || event.keyCode == this.KEY_PAGE_DOWN || event.keyCode == this.KEY_SPACE )
      event.preventDefault();

    this._pressed[ event.keyCode ] = Monogatari.Time.time;
  };

  MonogatariKeyboard.prototype.onKeyUp = function( event ) {
    this._pressed[ event.keyCode ] = -1;
  };
} );