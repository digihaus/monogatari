require(
  [ 'input/Keyboard', 'core/Timer' ], function( Keyboard, Timer ) {
    var t = Timer;
    var kb = new Keyboard();
    assert( kb != null, 'Keyboard created', 'input', kb );

    var event = {};
    event.keyCode = Keyboard.BACKSPACE;
    event.preventDefault = function() {};

    kb.onKeyDown( event, t );
    assert( kb.isDown( Keyboard.BACKSPACE ) != null, 'Keyboard is down', 'input', kb );
    kb.onKeyUp( event );
    assert( kb.isDown( Keyboard.BACKSPACE ) == null, 'Keyboard is not down', 'input', kb );
  }
);

require(
  [ 'input/Mouse', 'core/Timer' ], function( Mouse, Timer ) {
    var t = Timer;
    var mouse = new Mouse();
    assert( mouse != null, 'Mouse created', 'input', mouse );

    var event = {};
    event.button = Mouse.LMB;
    event.preventDefault = function() {};

    mouse.onMouseDown( event, t );
    assert( mouse.isDown( Mouse.LMB ) != null, 'Mouse is down', 'input', mouse );
    mouse.onMouseUp( event );
    assert( mouse.isDown( Mouse.LMB ) == null, 'Mouse is not down', 'input', mouse );
  }
);
