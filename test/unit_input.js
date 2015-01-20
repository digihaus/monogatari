require( [ 'input/Keyboard', 'core/Timer' ], function( _Keyboard, _Timer ) {
  var t = new _Timer();
  var kb = new _Keyboard( t );

  assert( kb != null, 'Keyboard created', 'input', kb );

  var event = {};
  event.keyCode = kb.BACKSPACE;
  event.preventDefault = {};

  kb.onKeyDown( event );

  assert( kb.isDown( kb.BACKSPACE )  != null, 'Keyboard is down', 'input', kb);

  kb.onKeyUp( event );

  assert( kb.isDown( kb.BACKSPACE )  == null, 'Keyboard is not down', 'input', kb);

} );
